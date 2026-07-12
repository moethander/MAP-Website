import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return(
        <nav className="bg-blue-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <div className="flex gap-6 items-center">
                    <NavLink to = "/admin/dashboard" className="hover:text-yellow-300">Dashboard</NavLink>
                    <NavLink to = "/admin/home" className="hover:text-yellow-300">Home</NavLink>
                    <NavLink to = "/admin/manage-courses" className="hover:text-yellow-300">Courses</NavLink>
                    <NavLink to = "/admin/add-gallery" className="hover:text-yellow-300">Gallery</NavLink>
                    <NavLink to = "/admin/add-faq" className="hover:text-yellow-300">FAQ</NavLink>
                    <NavLink to = "/admin/add-contact" className="hover:text-yellow-300">Contact</NavLink>
                    <NavLink to = "/admin/add-test" className="hover:text-yellow-300">Test</NavLink>

                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar