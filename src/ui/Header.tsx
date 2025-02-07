import { Toaster } from "react-hot-toast";

export default function Header() {
  return (
    <>
      <Toaster />
      <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            MegaCity<sup>&trade;</sup>
          </h1>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#why-us" className="hover:text-gray-600 transition">
              Why Us?
            </a>
            <a href="#how-to" className="hover:text-gray-600 transition">
              How It Works?
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </button>
        </div>
      </header>
    </>
  );
}
