import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../API/Thunk/AuthThunk";

const Header = ({ searchTerm, setSearchTerm }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/blog">
                        <div className="text-2xl font-bold text-gray-900">
                            DevBlog
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                        <Link to="/blog" className="hover:text-black">Home</Link>
                        <Link to="/articles" className="hover:text-black">Articles</Link>
                        <Link to="/categories" className="hover:text-black">Categories</Link>
                        <Link to="/about" className="hover:text-black">About</Link>
                        <Link to="/account" className="hover:text-black">Account</Link>
                    </nav>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center gap-4 relative">
                        {/* Search */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search articles..."
                            className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        {/* Subscribe */}
                        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                            Subscribe
                        </button>

                        {/* User Icon */}
                        <div
                            className="relative"
                            onMouseEnter={() => setUserMenuOpen(true)}
                            onMouseLeave={() => setUserMenuOpen(false)}
                        >
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="User"
                                className="w-9 h-9 rounded-full cursor-pointer border"
                            />

                            {/* Dropdown */}
                            {userMenuOpen && (
                                <div className="absolute right-0 w-40 bg-white border rounded-xl shadow-lg overflow-hidden">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/admin"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Admin
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logoutHandler();
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="flex flex-col gap-4 px-4 py-6 text-gray-700 font-medium">
                        <Link to="/blog">Home</Link>
                        <Link to="/articles">Articles</Link>
                        <Link to="/categories">Categories</Link>
                        <Link to="/about">About</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/admin">Admin</Link>

                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <button className="w-full px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                            Subscribe
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
