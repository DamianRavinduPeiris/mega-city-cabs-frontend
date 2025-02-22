import type { FC } from "react"

const Header: FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              <span className="sr-only">View notifications</span>
            
            </button>
            <div className="ml-3 relative">
              <div>
                <button
                  className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

