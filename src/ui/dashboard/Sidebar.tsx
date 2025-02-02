interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-20`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <img src="?height=24&width=24" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <nav>
          <SidebarLink
            icon="https://www.svgrepo.com/show/422490/home-house.svg?height=20&width=20"
            text="Home"
          />
        </nav>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  icon: string;
  text: string;
}

const SidebarLink = ({ icon, text }: SidebarLinkProps) => (
  <a
    href="#"
    className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
  >
    <img src={icon || "/placeholder.svg"} alt={text} className="w-5 h-5" />
    <span>{text}</span>
  </a>
);

export default Sidebar;
