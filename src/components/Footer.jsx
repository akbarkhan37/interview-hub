import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Interview Hub. All rights reserved.</p>
        <div>
        <a href="/" className="mx-2 text-sm hover:underline">Home</a>
          <a href="/about" className="mx-2 text-sm hover:underline">About</a>
          <a href="/contact" className="mx-2 text-sm hover:underline">Contact</a>
          <a href="/privacy" className="mx-2 text-sm hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
