import React from 'react';
import './assets/css/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const App = () => {
  
  return (
    <div className="app">
      <Header />
        <main>
          <Home />
        </main>
      <Footer />
    </div>
  );
}

export default App;