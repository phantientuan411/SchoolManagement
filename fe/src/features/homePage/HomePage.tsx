import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux&hook/store.ts";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  setPageId,
} from "./HomeData.tsx";
import Post from "./posts/Post.tsx";
const u = localStorage.getItem("user") ?? "{}";
const user = u ? JSON.parse(u) : null;
console.log(user?.acountInform?._id);
import { Link } from "react-router-dom";
const PostPage = () => {
  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  const { post, loading, error, pageId, pageSize, totalPage } = useSelector(
    (state: RootState) => state.homePage
  );

  const [form, setForm] = useState({
    _id: "",
    title: "",
    content: "",
    author: user?.acountInform?._id,
    type: "thông báo",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(
      getPost({
        pageId,
        pageSize,
        searchName: "",
        sort: { _id: "", title: "", content: "", author: "", type: "" },
      })
    );
  }, [dispatch, pageId]);
  const [showModal, setShowModal] = useState(false); // modal cho thông báo

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updatePost(form));
    } else {
      const { _id, ...newPost } = form;
      dispatch(createPost(newPost));
    }
    setForm({ _id: "", title: "", content: "", author: "", type: "thông báo" });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleEdit = (p: typeof form) => {
    setForm(p);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      dispatch(deletePost(id));
    }
  };

  const thongBaoPosts = post.filter((p) => p.type === "thông báo");
  //  const vanBanPosts = post.filter((p) => p.type === "văn bản");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-9xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Thông báo</h1>

        {/* Chỉ Admin mới thấy nút này */}


        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-90"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} // background đen mờ 50%
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {isEditing ? "Chỉnh sửa bài viết" : "Thêm Thông báo mới"}
              </h2>

              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  setShowModal(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung
                  </label>
                  <textarea
                    placeholder="Nhập nội dung"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    {isEditing ? "Cập nhật" : "Thêm"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setIsEditing(false);
                    }}
                    className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </form>

              {/* Nút đóng góc phải */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
              >
                ✖
              </button>
            </div>
          </div>
        )}



        {/* Loading & error */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4">
            Đang tải dữ liệu...
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Hai cột văn bản */}
        <div className="flex gap-4">
          {/* Thông báo */}
          <div className="bg-white w-3/10 rounded-lg shadow-md overflow-hidden">
            <div className="flex bg-blue-50 px-4 py-3 border-b border-blue-200 font-semibold text-blue-700">
              <p>Thông báo</p>
              <div className="ml-auto">
                {user?.role === "admin" && (
                  <div className="btn-post">
                    <button onClick={() => setShowModal(true)}>+</button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 space-y-3">
              {thongBaoPosts.length === 0 ? (
                <p className="text-gray-500 text-sm text-center">
                  Chưa có thông báo nào
                </p>
              ) : (
                thongBaoPosts.map((p) => (
                  <div
                    key={p._id}
                    className="border-b last:border-0 pb-3 mb-3 flex justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{p.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {p.content}
                      </p>
                    </div>
                    {user?.role === "admin" && (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Văn bản */}
          <div className="bg-white w-7/10 rounded-lg shadow-md overflow-hidden">
            <div className="flex bg-green-50 px-4 py-3 border-b border-green-200 font-semibold text-green-700">
              <p>Văn bản</p>
              <div className="ml-auto">
                {user?.role === "admin" && (
                  <div className="btn-post">
                    <Link to={"/new"}><button>+</button></Link>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 space-y-3">
              <Post />
            </div>
          </div>
        </div>

        {/* Phân trang */}
        {totalPage > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => dispatch(setPageId(page))}
                className={`px-4 py-2 rounded-lg font-medium transition ${pageId === page
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
