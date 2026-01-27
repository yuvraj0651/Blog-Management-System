import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../API/Thunk/BlogThunk";
import { Link } from "react-router-dom";

const BlogPage = ({ filteredBlogData }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogData());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredBlogData]);

    const { isLoading, error } = useSelector((state) => state.blog);

    const defaultImageUrl = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d";

    // Pagination Logic
    let itemsPerPage = 6;
    let lastItemIndex = currentPage * itemsPerPage;
    let firstItemIndex = lastItemIndex - itemsPerPage;
    let paginatedBlogs = filteredBlogData.slice(firstItemIndex, lastItemIndex);

    let totalPages = Math.ceil(filteredBlogData.length / itemsPerPage);
    let pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    if (isLoading) {
        return (
            <p className="text-center tracking-wide text-[0.9rem] font-[500] my-2 capitalize">Loading blog data</p>
        )
    };

    if (error) {
        return (
            <p className="text-center tracking-wide text-[0.9rem] font-[500] my-2 capitalize">Something went wrong....</p>
        )
    }

    if (filteredBlogData.length === 0) {
        return (
            <div className="my-28">
                <p className="text-center tracking-wide capitalize font-[500]">Sorry no products data to show</p>
            </div>
        )
    }

    return (
        <section className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 pt-7 pb-10">
                <h1 className="text-4xl font-bold text-gray-900">
                    Latest Articles
                </h1>
                <p className="mt-3 text-gray-600 max-w-2xl">
                    Insights, tutorials, and real-world experiences from developers
                    building modern web applications.
                </p>
            </div>
            <div className="max-w-7xl mx-auto px-6 pb-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {
                    paginatedBlogs.map((blog) => (
                        <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
                            <img
                                src={blog.coverImage || defaultImageUrl}
                                alt={blog.title}
                                className="h-52 w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = defaultImageUrl
                                }}
                            />

                            <div className="p-6">
                                <span className="text-xs font-medium text-blue-600 uppercase">
                                    {blog.title}
                                </span>

                                <h2 className="mt-3 text-xl font-semibold text-gray-900 leading-snug line-clamp-2">
                                    {blog.excerpt}.
                                </h2>

                                <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    {blog.content}.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {(blog.tags || ["Web Dev", "Frontend"]).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="view-detail-block my-4">
                                    <Link to={`/blog/${blog.id}`}>
                                        <span className="capitalize tracking-wide font-[500] hover:underline text-[0.9rem]">view details</span>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={blog.author.avatar}
                                            alt="author"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span>{blog.author.name}</span>
                                    </div>
                                    <span>{blog.readTime} read</span>
                                </div>
                            </div>
                        </article>
                    ))
                }
            </div>
            <div className="mb-7 flex items-center justify-center">
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
        </section>
    );
};

export default BlogPage;
