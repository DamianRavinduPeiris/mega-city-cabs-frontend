import { useNavigate } from "react-router-dom";
import { showAlert } from "../../util/CommonUtils";
import { logoutUser } from "../../redux/UserSlice";
import store from "../../redux/Store";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const logout = () => {
  // Dispatch logout action to clear the user state
  store.dispatch(logoutUser());
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"
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
          <div className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition duration-200">
            <img
              src="https://www.svgrepo.com/show/422490/home-house.svg"
              className="w-5 h-5"
              alt="Home"
            />
            <span>Logout</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition duration-200">
            <img
              src="https://www.svgviewer.dev/static-svgs/33599/logout.svg"
              className="w-5 h-5"
              alt="Logout"

            />
            <span
              onClick={() => {
                showAlert("Logged out successfully!", "👋", "success");
                logout();
                setTimeout(() => {
                  navigate("/");

                }, 2000)
              }}
            >Logout</span>
          </div>
        </nav>
      </div>
    </div>
  );
};


export default Sidebar;
