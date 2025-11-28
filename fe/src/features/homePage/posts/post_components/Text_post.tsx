// src/editor/TextEditor.tsx
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { editorExtensions } from "./extension.tsx";
import { get } from "../../../../axios/ultil.tsx";

const TextEditor: React.FC = () => {
  const [contentApi, setContentApi] = useState("<p>Đang tải...</p>");
  useEffect(() => {
  const fetchData = async () => {
    const res = await get(
      "post",
      {
        pageId: 1,
        pageSize: 1,
        searchName: "",
      },
      {
        token: localStorage.getItem("accessToken") ?? "",
      }
    );

    if (!res.ok) {
      setContentApi("<p>Lỗi tải dữ liệu</p>");
      return;
    }

    const posts = res.data?.data || [];
    if (posts.length === 0) {
      setContentApi("<p>Không có bài viết nào</p>");
      return;
    }

    interface Post {
      type: string;
      content: string;
    }

    const filted: Post[] = posts.filter((p: Post) => p.type === "văn bản");

    const firstPost = filted[0];

    setContentApi(firstPost?.content || "<p>Không có nội dung</p>");
  };

  fetchData();
}, []);



  // KHỞI TẠO EDITOR
  const editor = useEditor({
    extensions: editorExtensions,
    content: contentApi,
    editable: false,
  });

  useEffect(() => {
    if (editor && contentApi) {
      editor.commands.setContent(contentApi);
    }
  }, [contentApi, editor]);

  return (
    <div className="prose dark:prose-invert border rounded bg-white p-4">
      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  );
};

export default TextEditor;
