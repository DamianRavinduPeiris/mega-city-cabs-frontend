const Footer = () => {
  return (
    <footer className="bg-gray-50 py-6">
      <div className="container mx-auto px-4 text-center space-y-4">
        
        <div className="flex justify-center space-x-6 text-gray-600">
          <a href="#" className="hover:text-gray-800">About</a>
          <a href="#" className="hover:text-gray-800">Blog</a>
          <a href="#" className="hover:text-gray-800">Jobs</a>
          <a href="#" className="hover:text-gray-800">Press</a>
          <a href="#" className="hover:text-gray-800">Accessibility</a>
          <a href="#" className="hover:text-gray-800">Partners</a>
        </div>

        <p className="text-gray-500">
            &copy; 2025 Megacity. All rights reserved.          
        </p>
      </div>
    </footer>
  );
};

export default Footer;
