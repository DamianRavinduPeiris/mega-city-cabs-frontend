import { type FC, useEffect, useState } from "react"
import UserType from "../../types/UserType"
import ResponseType from "../../types/ResponseType"
import axios from "axios"
import { Toaster } from "react-hot-toast"
import { addUser, updateUser, deleteUser, showAlert, } from "../../util/CommonUtils"


const UserManagement: FC = () => {
    const [users, setUsers] = useState<UserType[]>()
    const [user, setUser] = useState<UserType>({ userId: '', name: '', email: '', picture: '' })
    const [currentUser, setCurrentUser] = useState<UserType>({ userId: '', name: '', email: '', picture: '' });
    const [isOpen, setIsOpen] = useState(false);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=.]*)?$/;

    useEffect(() => {

        axios.get<ResponseType>(`${baseURL}/api/v1/user`)
            .then((res) => {
                console.log(res.data.data)
                setUsers(res.data.data as UserType[])

            }).catch((er) => {
                console.log('error', er)
            })

    }, [])


    return (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mt-4 text-center">Manage Users</h2>
            <Toaster />
            <div className="mb-6">

                <h3 className="text-lg font-medium mb-2">Add New User</h3>

                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="flex-1 p-2 border rounded"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}

                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="flex-1 p-2 border rounded"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}

                    />
                    <input
                        type="picture"
                        placeholder="Profile Picture URL"
                        className="flex-1 p-2 border rounded"
                        value={user.picture}
                        onChange={(e) => setUser({ ...user, picture: e.target.value })}

                    />
                    <button
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
                        onClick={async () => {
                            if (nameRegex.test(user.name) && emailRegex.test(user.email) && urlRegex.test(user.picture)) {
                                addUser(user, baseURL)
                                setUsers(prevUsers => prevUsers ? [...prevUsers, user] : [user]);
                                setUser({ userId: '', name: '', email: '', picture: '' });
                            } else {
                                showAlert("Invalid input! Please check the fields.", "❌", "error");
                            }

                        }}

                    >
                        Add User
                    </button>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium mb-2">User List</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">UserId</th>
                                <th className="py-3 px-6 text-left">ProfilePicture</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-center">Email</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {users?.map((user) => (
                                <tr key={user.userId} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left">{user.userId}</td>
                                    <td className="py-3 px-6 text-center">
                                        <img src={user.picture} alt="profile" className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>

                                    <td className="py-3 px-6 text-left">{user.email}</td>
                                    <div className="relative py-3 px-6 text-left">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                            onClick={() => {
                                                setIsOpen(true)
                                                setCurrentUser(user)
                                            }}
                                        >
                                            Update User.
                                        </button>

                                        {isOpen && (
                                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all scale-100 animate-fadeIn">
                                                    <h2 className="text-xl font-semibold">Add updated details.</h2>

                                                    <div className="mt-4 space-y-2">

                                                        <input
                                                            key="name"
                                                            type="text"
                                                            value={currentUser?.name}
                                                            placeholder="Name"
                                                            className="p-2 border rounded"
                                                            onChange={(e) => setCurrentUser({ ...user, name: e.target.value })}
                                                        />
                                                        <input
                                                            key="Email"
                                                            type="text"
                                                            value={currentUser?.email}
                                                            placeholder="Email"
                                                            className="p-2 border rounded"
                                                            onChange={(e) => setCurrentUser({ ...user, email: e.target.value })}
                                                        />
                                                        <input
                                                            key="ProfilePicture"
                                                            type="text"
                                                            value={currentUser?.picture}
                                                            placeholder="ProfilePicture URL"
                                                            className="p-2 border rounded"
                                                            onChange={(e) => setCurrentUser({ ...user, picture: e.target.value })}
                                                        />
                                                    </div>
                                                    <button
                                                        className="m-2 mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                                                        onClick={() => {
                                                            if (nameRegex.test(currentUser.name) && emailRegex.test(currentUser.email) && urlRegex.test(currentUser.picture)) {
                                                                updateUser(currentUser, baseURL);
                                                                setUsers(users?.map((u) => u.userId === currentUser.userId ? currentUser : u));
                                                                setIsOpen(false);
                                                            } else {
                                                                showAlert("Invalid input! Please check the fields.", "❌", "error");
                                                            }

                                                        }
                                                        }


                                                    >
                                                        Update
                                                    </button>


                                                    <button
                                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <td className="py-3 px-6 text-center">
                                        <button className="text-red-500 hover:text-black" onClick={() => {
                                            deleteUser(user.userId, baseURL)
                                            setUsers(users?.filter((u) => u.userId !== user.userId))
                                        }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserManagement

