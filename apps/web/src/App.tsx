import { Link, Route, Routes } from 'react-router-dom';
import { useCart } from './cart/CartContext';
import { Catalog } from './pages/Catalog';
import { ProductPage } from './pages/Product';
import { CartPage } from './pages/Cart';

export function App() {
  const { count } = useCart();
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          Shopfront
        </Link>
        <Link to="/cart" className="cart-link">
          Cart ({count})
        </Link>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}
