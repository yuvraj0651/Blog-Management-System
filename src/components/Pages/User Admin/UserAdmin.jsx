import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../API/Thunk/AuthThunk";

const UserAdmin = () => {
    const [search, setSearch] = useState("");
    const [selectSortCategory, setSelectSortCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectSortCategory]);

    const { authData } = useSelector((state) => state.auth);
    console.log("User Admin:", authData);

    const filteredUserData = useMemo(() => {
        if (!Array.isArray(authData)) return [];

        const searchValue = search.trim().toLowerCase();

        const filtered = searchValue
            ? authData.filter(user =>
                user.fullName.toLowerCase().includes(searchValue)
            )
            : [...authData];

        return filtered.map((user, index) => ({
            ...user,
            createdAt: new Date(Date.now() - index * 1000 * 60)
        }));
    }, [authData, search]);

    const sortedUserData = useMemo(() => {
        const data = [...filteredUserData];

        if (selectSortCategory === "sort-a-z") {
            data.sort((a, b) => a.fullName.localeCompare(b.fullName));
        } else if (selectSortCategory === "sort-z-a") {
            data.sort((a, b) => b.fullName.localeCompare(a.fullName));
        } else if (selectSortCategory === "newest") {
            data.sort((a, b) => b.createdAt - a.createdAt);
        } else if (selectSortCategory === "oldest") {
            data.sort((a, b) => a.createdAt - b.createdAt);
        }

        return data;
    }, [filteredUserData, selectSortCategory]);

    // Pagination Logic
    let itemsPerPage = 4;
    let lastItemIndex = currentPage * itemsPerPage;
    let firstItemIndex = lastItemIndex - itemsPerPage;
    let paginatedUserData = sortedUserData.slice(firstItemIndex, lastItemIndex);

    let totalPages = Math.ceil(sortedUserData.length / itemsPerPage);
    let pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    User Management
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage all users, roles, and account status
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                {/* Search */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users by name or email"
                    className="w-full md:w-80 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    <select className="px-3 py-2 border rounded-lg text-sm bg-white">
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>User</option>
                    </select>

                    <select className="px-3 py-2 border rounded-lg text-sm bg-white">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                    <select
                        value={selectSortCategory}
                        onChange={(e) => setSelectSortCategory(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm bg-white">
                        <option hidden>Sort By</option>
                        <option value="sort-a-z">Name (A-Z)</option>
                        <option value="sort-z-a">Name (Z-A)</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">User</th>
                            <th className="px-4 py-3 text-left font-semibold">Email</th>
                            <th className="px-4 py-3 text-left font-semibold">Role</th>
                            <th className="px-4 py-3 text-left font-semibold">Status</th>
                            <th className="px-4 py-3 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {
                            paginatedUserData.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>
                                        <p className="my-7 text-center tracking-wide font-[500] capitalize text-[0.9rem]">No user data to show</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedUserData.map((item) => (
                                    <tr
                                        key={item.id || item.email}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3 flex items-center gap-3">
                                            <img
                                                src="https://i.pravatar.cc/40"
                                                alt="user"
                                                className="w-9 h-9 rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">{item.fullName}</p>
                                                <p className="text-xs text-gray-500">@{item.fullName.split(" ")[0]}</p>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {item.email}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                                                Admin
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button className="px-3 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200">
                                                    View
                                                </button>
                                                <button className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200">
                                                    Disable
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>
            <div className="my-7 flex items-center justify-end">
                <nav className="flex items-center gap-1 text-sm">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg border transition
            ${page === currentPage
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </nav>
            </div>

            {/* Footer info */}
            <div className="mt-4 text-xs text-gray-500">
                Showing 5 of 120 users
            </div>
        </div>
    );
}

export default UserAdmin;