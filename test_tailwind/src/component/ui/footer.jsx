import React from "react";
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-6 sm:px-12">
          {/* Top Section */}
          <div className="flex flex-wrap justify-between gap-6">
            {/* About Section */}
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <h2 className="text-lg font-bold text-white mb-4">About Us</h2>
              <p className="text-sm">
                We are a leading e-commerce platform providing the best products at unbeatable prices. Our mission is to deliver quality and satisfaction to our customers.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <h2 className="text-lg font-bold text-white mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-white transition duration-200">Home</a>
                </li>
                <li>
                  <a href="/products" className="hover:text-white transition duration-200">Products</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white transition duration-200">About Us</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition duration-200">Contact</a>
                </li>
              </ul>
            </div>
  
            {/* Contact Section */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-lg font-bold text-white mb-4">Contact Us</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="bx bx-map text-xl mr-2"></i> 123 Main Street, City, Country
                </li>
                <li className="flex items-center">
                  <i className="bx bx-phone text-xl mr-2"></i> +1 (234) 567-890
                </li>
                <li className="flex items-center">
                  <i className="bx bx-envelope text-xl mr-2"></i> support@example.com
                </li>
              </ul>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-700 my-6"></div>
  
          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition duration-200">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="#" className="hover:text-white transition duration-200">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  