const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                {/* Brand Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white">DevBlog</h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                        DevBlog is a modern tech blog sharing articles on frontend,
                        backend, JavaScript, React, and real-world development practices.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">Articles</li>
                        <li className="hover:text-white cursor-pointer">Categories</li>
                        <li className="hover:text-white cursor-pointer">About Us</li>
                        <li className="hover:text-white cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Categories
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">JavaScript</li>
                        <li className="hover:text-white cursor-pointer">React</li>
                        <li className="hover:text-white cursor-pointer">CSS & Tailwind</li>
                        <li className="hover:text-white cursor-pointer">Web Performance</li>
                        <li className="hover:text-white cursor-pointer">Career</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Newsletter
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Subscribe to get the latest posts delivered to your inbox.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-md bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">

                    <p>
                        © {new Date().getFullYear()} DevBlog. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <span className="hover:text-white cursor-pointer">Twitter</span>
                        <span className="hover:text-white cursor-pointer">LinkedIn</span>
                        <span className="hover:text-white cursor-pointer">GitHub</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
