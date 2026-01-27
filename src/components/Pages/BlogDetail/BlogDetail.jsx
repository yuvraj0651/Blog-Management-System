import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addingComment, deleteComment, fetchComment, updateComment } from "../../API/Thunk/CommentThunk";

export default function BlogDetailPage() {

    const [commentText, setCommentText] = useState("");
    const [editingId, setEditingId] = useState(null);

    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComment())
    }, [dispatch , id]);

    const { blogData } = useSelector((state) => state.blog);
    const { commentData } = useSelector((state) => state.comments);
    console.log(commentData);

    const blogDetailData = blogData.find((blog) => blog.id === Number(id));
    console.log("Blog Detail Data: ", blogDetailData);

    const defaultImageUrl = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d";

    if (!blogDetailData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading blog...</p>
            </div>
        );
    }

    const handleEdit = (comment) => {
        setCommentText(comment.content);
        setEditingId(comment.id);
    };

    const submitComment = () => {
        if (!commentText.trim()) return;

        if (editingId !== null) {
            dispatch(
                updateComment({
                    id: editingId,
                    newCommentData: {
                        blogId: Number(id),
                        content: commentText,
                        updatedAt: new Date().toLocaleString(),
                    }
                })
            )
                .unwrap()
                .then(() => alert("Comment Updated"));
        } else {
            dispatch(
                addingComment({
                    id: Date.now().toString(),
                    blogId: Number(id),
                    content: commentText,
                    createdAt: new Date().toLocaleString(),
                })
            )
                .unwrap()
                .then(() => alert("Comment Added"));
        }

        setCommentText("");
        setEditingId(null);
    };

    const deleteUserComment = (id) => {
        dispatch(deleteComment(id)).unwrap().then(() => {
            alert("User Comment Deleted");
        }).catch((error) => {
            alert(error);
        })
    };

    const filteredComments = commentData.filter((comment) => comment.blogId === Number(id));

    const relatedBlogs = blogData.filter((blog) => {
        if (blog.id === blogDetailData.id) return false;

        const sameCategory = blog.category === blogDetailData.category;
        const commonTags = blog.tags?.some((tag) => blogDetailData.tags?.includes(tag)) || false;

        return sameCategory || commonTags;
    }).sort((a, b) => b.views - a.views).slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Blog Header */}
            <header className="bg-white border-b">
                <div className="max-w-4xl mx-auto px-4 py-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        {blogDetailData.title}
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg">
                        {blogDetailData.excerpt}.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>By {blogDetailData.author.name}</span>
                        <span>•</span>
                        <span>{blogDetailData.publishedAt}</span>
                        <span>•</span>
                        <span>{blogDetailData.readTime} read</span>
                    </div>
                </div>
            </header>

            {/* Blog Cover Image */}
            <div className="max-w-5xl mx-auto px-4 mt-10">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <img
                        src={blogDetailData.coverImage}
                        alt="Blog cover"
                        className="w-full h-[240px] md:h-[380px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-sm opacity-80">{blogDetailData.category}</p>
                        <h2 className="text-xl md:text-2xl font-semibold">
                            {blogDetailData.title}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Blog Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <article className="prose prose-gray max-w-none">
                    <p>
                        Modern frontend development is no longer about writing simple HTML
                        and CSS. Today, applications need to be scalable, fast, and easy to
                        maintain as they grow.
                    </p>

                    <h2>Why React is a Popular Choice</h2>
                    <p>
                        React’s component-based architecture allows teams to break complex
                        UIs into smaller, reusable pieces. This makes development faster and
                        code easier to reason about.
                    </p>

                    <img
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                        alt="Coding workspace"
                        className="rounded-xl shadow-md my-10"
                    />

                    <h2>Thinking in Components</h2>
                    <p>
                        Each component should ideally handle a single responsibility.
                        Separating logic, layout, and styling helps teams collaborate
                        efficiently.
                    </p>

                    <blockquote>
                        “Scalable frontend architecture is built on predictable data flow
                        and reusable UI components.”
                    </blockquote>

                    <p>
                        In real-world applications, React is often paired with tools like
                        Tailwind CSS, Redux Toolkit, and modern routing solutions to build
                        production-grade experiences.
                    </p>
                </article>

                {/* Comment Section (Static UI Only) */}
                <section className="mt-20">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                        Comments ({filteredComments.length})
                    </h3>

                    {/* Comment Input */}
                    <div className="bg-white border rounded-xl p-4 mb-8">
                        <textarea
                            placeholder="Write your comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full resize-none border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            rows={4}
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={submitComment}
                                className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-800">
                                {editingId ? "Update Comment" : "Add Comment"}
                            </button>
                        </div>
                    </div>

                    {/* Comment List */}
                    <div className="space-y-6">
                        {
                            filteredComments.length === 0 ? (
                                <h4 className="text-center capitalize tracking-wide font-[500] text-[0.9rem] cursor-pointer">No comments to show</h4>
                            ) : (
                                filteredComments.map((comment) => (
                                    <div key={comment.id} className="bg-white border rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="https://i.pravatar.cc/40"
                                                alt="User"
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">Aman Verma</p>
                                                <p className="text-xs text-gray-500">2 hours ago</p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-gray-700 text-sm">
                                            {comment.content}
                                        </p>
                                        <div className="mt-4 flex gap-4 text-sm">
                                            <button
                                                onClick={() => handleEdit(comment)}
                                                className="text-gray-600 hover:text-gray-900">Edit</button>
                                            <button
                                                onClick={() => deleteUserComment(comment.id)}
                                                className="text-red-500 hover:text-red-600">Delete</button>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    {
                        relatedBlogs.length > 0 && (
                            <section className="mt-16">
                                <h3 className="text-2xl font-semibold mb-6">
                                    Related Articles
                                </h3>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedBlogs.map((blog) => (
                                        <Link key={blog.id} to={`/blog/${blog.id}`}>
                                            <div className="bg-white rounded-xl shadow hover:shadow-md transition">
                                                <img
                                                    src={blog.coverImage}
                                                    alt={blog.title}
                                                    className="h-40 w-full object-cover rounded-t-xl"
                                                    onError={(e) => {
                                                        e.currentTarget.src = defaultImageUrl
                                                    }}
                                                />
                                                <div className="p-4">
                                                    <p className="text-xs text-blue-600 uppercase">
                                                        {blog.category}
                                                    </p>
                                                    <h4 className="mt-2 text-sm font-semibold line-clamp-2">
                                                        {blog.title}
                                                    </h4>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {blog.readTime} • {blog.views} views
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )
                    }
                </section>
            </main>
        </div>
    );
}