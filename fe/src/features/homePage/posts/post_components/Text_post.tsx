// src/editor/TextEditor.tsx
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { editorExtensions } from "./extension.tsx";
import MenuBar from "./MenuBar";
import {post} from '../../../../axios/ultil.tsx'
const TextEditor: React.FC<{ initialContent?: string, onUpdate?: (html: string) => void }> = ({ initialContent = "<p>Start writing...</p>", onUpdate }) => {
  const editor = useEditor({
    extensions: editorExtensions,
    content: initialContent,
    autofocus: true,
  });

  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      onUpdate?.(editor.getHTML());
    };
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
    };
  }, [editor, onUpdate]);
  const handleSave= async()=>{
    const html = editor.getJSON()
    await post('/post/newPost',{
      content:html,
      title:''
    })
  } 
   return (
    <div className="prose dark:prose-invert border rounded bg-white">
      <MenuBar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} className="min-h-[200px] outline-none" />
      </div>
    </div>
  );
};

export default TextEditor;
