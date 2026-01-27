import { useSelector } from "react-redux";

const UserProfile = () => {

    const { authData } = useSelector((state) => state.auth);
    console.log(authData);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">
                    <img
                        src="https://i.pravatar.cc/150?img=32"
                        alt="User"
                        className="w-32 h-32 rounded-full border-4 border-gray-200"
                    />

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Aman Verma
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Frontend Developer & Tech Blogger
                        </p>

                        <p className="mt-4 text-sm text-gray-600 max-w-xl">
                            Passionate about building modern web experiences using
                            React, Tailwind CSS and scalable UI architectures.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                React
                            </span>
                            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                Tailwind
                            </span>
                            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                JavaScript
                            </span>
                            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                UI/UX
                            </span>
                        </div>
                    </div>

                    <button className="px-6 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
                        Edit Profile
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                        { label: "Articles", value: "24" },
                        { label: "Followers", value: "1.2K" },
                        { label: "Following", value: "180" },
                        { label: "Likes", value: "8.4K" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow p-5 text-center"
                        >
                            <h3 className="text-xl font-bold text-gray-900">
                                {item.value}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Profile Details */}
                <div className="grid md:grid-cols-2 gap-6 mt-10">
                    {/* About */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            About
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            I write blogs about frontend development, UI design
                            principles, and performance optimization. My goal is
                            to help developers build better user experiences with
                            clean and maintainable code.
                        </p>
                    </div>

                    {/* Info */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Personal Information
                        </h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Email</span>
                                <span className="text-gray-800">
                                    {authData.email}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Location</span>
                                <span className="text-gray-800">
                                    India
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Role</span>
                                <span className="text-gray-800">
                                    Author
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Joined</span>
                                <span className="text-gray-800">
                                    Jan 2024
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Articles (Static) */}
                <div className="mt-12">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Recent Articles
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                                    alt="Article"
                                    className="h-40 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                                        Building Scalable UI Components with React
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-2">
                                        5 min read • 1.2k views
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;
