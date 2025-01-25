export default function Header() {
    return (
      <div>
           <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">MegaCity<sup>&trade;</sup></div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-gray-600">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-gray-600">
              How It Works
            </a>
            <a href="#cta" className="hover:text-gray-600">
              Book Now
            </a>
          </nav>
          <button className="md:hidden">
          </button>
        </div>
      </header>
        
      </div>
    )
  }
  