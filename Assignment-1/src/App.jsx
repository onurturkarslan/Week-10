import { useState } from 'react'
import './App.css'

function App() {
  const [money, setMoney] = useState(100000000000);
  const [receipt, setReceipt]  = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const totalPayment = receipt.reduce((total, item) => total + item.price*item.count, 0);
  const [products, setProducts] = useState([
    {id:1, name: 'Big Mac', price: 3, img: '/images/big-mac.jpg', count: 0 },
    {id:2, name: 'Book', price: 15, img: '/images/book.jpg', count: 0 },
    {id:3, name: 'Drone', price: 350, img: '/images/drone.jpg', count: 0 },
    {id:4, name: 'Amazon Echo', price: 99, img: '/images/amazon-echo.jpg', count: 0 },
    {id:5, name: 'Apache Helicopter', price: 31000000, img: '/images/apache-helicopter.jpg', count: 0 },
    {id:6, name: 'Boeing 747', price: 148000000, img: '/images/boeing-747.jpg', count: 0 },
    {id:7, name: 'Cruise Ship', price: 930000000, img: '/images/cruise-ship.jpg', count: 0 },
    {id:8, name: 'Ferrari', price: 250000, img: '/images/ferrari.jpg', count: 0 },
    {id:9, name: 'Formula 1 Car', price: 15000000, img:'/images/formula-1-car.jpg', count: 0 },
    {id:10, name: 'Gaming Console', price: 299, img: '/images/gaming-console.jpg', count: 0 },
    {id:11, name: 'Gold Bar', price: 700000, img: '/images/gold-bar.jpg', count: 0 },
    {id:12, name: 'Jet Ski', price: 12000, img: '/images/jet-ski.jpg', count: 0 },
    {id:13, name: 'M1 Abrams', price: 8000000, img: '/images/m1-abrams.jpg', count: 0 },
    {id:14, name: 'Make a Movie', price: 100000000, img: '/images/make-a-movie.jpg', count: 0 },
    {id:15, name: 'NBA Team', price: 2120000000, img: '/images/nba-team.jpg', count: 0 },
    {id:16, name: 'Superbowl Ad', price: 5250000, img: '/images/superbowl-ad.jpg', count: 0 },
    {id:17, name: 'Single Family Home', price: 300000, img: '/images/single-family-home.jpg', count: 0 },
    {id:18, name: 'Video Game', price: 60, img: '/images/video-game.jpg', count: 0 },
    {id:19, name: 'Yacht', price: 7500000, img: '/images/yacht.jpg', count: 0 },
    {id:20, name: 'Tesla', price: 75000, img: '/images/tesla.jpg', count: 0 },
    {id:21, name: 'Monster Truck', price: 150000, img: '/images/monster-truck.jpg', count: 0 },
    {id:22, name: 'Mona Lisa', price: 780000000, img: '/images/mona-lisa.jpg', count: 0 },
    {id:23, name: 'Skyscraper', price: 850000000, img: '/images/skyscraper.jpg', count: 0 },
    {id:24, name: 'Mcdonalds Franchise', price: 1500000, img: '/images/mcdonalds-franchise.jpg', count: 0 },
    {id:25, name: 'Mansion', price: 45000000, img: '/images/mansion.jpg', count: 0 },
    {id:26, name: 'Movie Ticket', price: 12, img: '/images/movie-ticket.jpg', count: 0 },
    {id:27, name: 'Rolex', price: 15000, img: '/images/rolex.jpg', count: 0 },
  ]);

  const handleBuy = (index) => {
    const updatedProducts = [...products];
    const productPrice = updatedProducts[index].price;

    if (money >= productPrice) {
      let remainingAmount = productPrice;
      const interval = setInterval(() => {
        setMoney(prev => {
          if (remainingAmount > 0) {
            remainingAmount -= 1;
            return prev - 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, (100/productPrice));
      updatedProducts[index].count += 1;
      setProducts(updatedProducts);
      setReceipt(prev => {
        const existingProduct = prev.find(item => item.id === products[index].id);
        
        if (existingProduct) {
          return prev.map(item =>
            item.id === products[index].id
              ? { ...item, count: item.count + 1 }
              : item
          );
        } else {
          return [
            ...prev,
            { id: products[index].id, name: products[index].name, price: products[index].price, count: products[index].count }
          ];
        }
      });
      setShowReceipt(true);

    }
  }

  const handleSell = (index) => {
    const updatedProducts = [...products];
    
    if (updatedProducts[index].count > 0) {

      const productPrice = updatedProducts[index].price;
      let remainingAmount = productPrice;
  
      const interval = setInterval(() => {
        setMoney(prev => {
          if (remainingAmount > 0) {
            remainingAmount -= 1;
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, (100/productPrice));
  
      updatedProducts[index].count -= 1;
      setProducts(updatedProducts);
      setReceipt(prev => {
        const existingProduct = prev.find(item => item.id === products[index].id);
        
        if (existingProduct) {
          if (existingProduct.count > 1) {
            return prev.map(item =>
              item.id === products[index].id
                ? { ...item, count: item.count - 1 }
                : item
            );
          } else {
            return prev.filter(item => item.id !== products[index].id);
          }
        }
        return prev;
      });

    } else if (updatedProducts[index].count === 0) {
      setShowReceipt(false);
    }
  };
  
  return (
    <>
    <div className='container'>
      <div className='bill-gates-container'>
      <img className='bill-gates' src="/images/billgates.jpg" alt="" />
      <h1>Spend Bill Gates' Money</h1>
      </div>
      <h1 className='money'>${money.toLocaleString()}</h1>
      <div className='products'>
        {products.map((product,index) => (
          <div key={index} className='product'>
            <img src={product.img} alt="product.name"/>
            <h2 className='product-name'>{product.name}</h2>
            <h3 className='price'>${product.price.toLocaleString()}</h3>
            <div className='product-controls'>
              <button disabled={product.count === 0} onClick={() => handleSell(index)} style={{backgroundColor: product.count > 0 ? 'red': 'lightgray',color: product.count > 0 ? 'white': 'black'}}> Sell </button>
              <input type='text' value={product.count} readOnly/>
              <button onClick={() => handleBuy(index)} className='buy'>Buy</button>
            </div>
          </div>
        ))}
      </div>
      {showReceipt && 
      <div className='receipt'>
        <div className='receipt-container'>
          <h2>Your Receipt</h2>
          <div>
            <ul >
            {receipt.map((item) => (
              <li key={item.id}>
                <div className='receipt-items'>
                <span className='receipt-name'>{item.name}</span>
                <span className='receipt-count'>x{item.count}</span>
                <span className='receipt-price'>${(item.price * item.count).toLocaleString()}</span>
                </div>
              </li>
            ))}
            </ul>
            <hr />
            <div className='payment'>
              <span>Total</span>
              <span className='total-payment'>${totalPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
          }
    </div>
    </>
  )
}

export default App