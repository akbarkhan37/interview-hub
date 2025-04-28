import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Category from './pages/Category';
import QuestionDetail from './pages/QuestionDetail';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';





function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at the top */}
        <NavBar />

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
