import { useState, useEffect } from 'react';
import './App.css';
import type { Book, BasketResponse, BooksResponse } from './types';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [basket, setBasket] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch available books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Calculate price whenever basket changes
  useEffect(() => {
    calculateTotalPrice();
  }, [basket]);

  const fetchBooks = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/books');
      const data: BooksResponse = await response.json();
      setBooks(data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const calculateTotalPrice = async (): Promise<void> => {
    if (basket.length === 0) {
      setTotalPrice(0);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/store/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ basket })
      });
      
      const data: BasketResponse = await response.json();
      setTotalPrice(data.totalPrice);
    } catch (error) {
      console.error('Error calculating price:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToBasket = (bookId: number): void => {
    setBasket(prev => [...prev, bookId]);
  };

  const removeFromBasket = (bookId: number): void => {
    setBasket(prev => {
      const index = prev.indexOf(bookId);
      if (index > -1) {
        const newBasket = [...prev];
        newBasket.splice(index, 1);
        return newBasket;
      }
      return prev;
    });
  };

  const getBookCount = (bookId: number): number => {
    return basket.filter(id => id === bookId).length;
  };

  const clearBasket = (): void => {
    setBasket([]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Book Store</h1>
        <p>Add books to your basket and see the discount magic!</p>
      </header>

      <div className="container">
        {/* Available Books Section */}
        <section className="books-section">
          <h2>Available Books</h2>
          <div className="books-grid">
            {books.map(book => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p>Price: €{book.price.toFixed(2)}</p>
                <div className="book-actions">
                  <button 
                    onClick={() => removeFromBasket(book.id)} 
                    disabled={getBookCount(book.id) === 0}
                  >
                    -
                  </button>
                  <span className="count">{getBookCount(book.id)}</span>
                  <button onClick={() => addToBasket(book.id)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Basket Summary Section */}
        <section className="basket-section">
          <div className="basket-card">
            <h2>🛒 Your Basket</h2>
            
            <div className="basket-items">
              {books.map(book => {
                const count = getBookCount(book.id);
                return count > 0 ? (
                  <div key={book.id} className="basket-item">
                    <span>{book.title}</span>
                    <span className="quantity">x{count}</span>
                  </div>
                ) : null;
              })}
              
              {basket.length === 0 && (
                <p className="empty-basket">Your basket is empty</p>
              )}
            </div>

            <div className="basket-total">
              <h3>
                Total: {loading ? 'Calculating...' : `€${totalPrice.toFixed(2)}`}
              </h3>
            </div>

            {basket.length > 0 && (
              <button className="clear-btn" onClick={clearBasket}>
                Clear Basket
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;