//build with tip tap
import {  useEditor,EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import MenuBar from "./MenuBar"

const Text_post = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign,
      Highlight,
      Link
    ],
    content:"<p>Nhập nội dung văn bản</p>"
  })

  return (
    <div className="flex flex-col">
      <div className="text-center">Text_post</div>
      <div>
          <MenuBar/>
          <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default Text_post