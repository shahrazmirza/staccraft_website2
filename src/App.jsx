import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import Contact from './pages/Contact';
import { Toaster } from './components/ui/toaster';
import { products } from './mock/mock';

const titles = {
  '/': 'StacCraft — Bespoke commerce technology, built in Australia',
  '/products': 'Products — StacCraft',
  '/cases': 'Case Studies — StacCraft',
  '/about': 'About — StacCraft',
  '/contact': 'Contact — StacCraft',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const product = pathname.match(/^\/products\/(.+)/)?.[1];
    const name = product && products.find(p => p.id === product)?.title;
    document.title = name ? `${name} — StacCraft` : (titles[pathname] || 'StacCraft');
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App grain relative">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main className="relative z-[2]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cases" element={<CaseStudies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
