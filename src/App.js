import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import { CartProvider } from './components/Cart/CartContext';

function App() {

  return (
    <div className='App'>
      <Navbar />
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </CartProvider>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
