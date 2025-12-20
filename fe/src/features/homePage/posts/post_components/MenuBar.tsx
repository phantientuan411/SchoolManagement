// src/editor/MenuBar.tsx
import React from "react";
import { Editor } from "@tiptap/react";
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
    List, ListOrdered, Quote, Undo, Redo, AlignLeft, AlignCenter,
    AlignRight, AlignJustify, Highlighter, Link as LinkIcon, Image as ImageIcon,
    Table as TableIcon, X as ClearIcon, Minus as HrIcon,
    X
} from "lucide-react";

interface MenuBarProps {
    editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
    if (!editor) return null;

    const promptLink = () => {
        const url = window.prompt("Enter URL");
        if (!url) return;
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    const removeLink = () => {
        editor.chain().focus().unsetLink().run();
    };

    const promptImage = () => {
        const url = window.prompt("Image URL");
        if (!url) return;
        editor.chain().focus().setImage({ src: url }).run();
    };

    const insertTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    const setColor = () => {
        const color = window.prompt("Enter text color (e.g. #ef4444 or red):");
        if (!color) return;
        editor.chain().focus().setColor(color).run();
    };

    const setHighlight = () => {
        editor.chain().focus().toggleHighlight().run();
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 bg-white border rounded">
            {/* Inline formatting */}
            <button onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Bold">
                <Bold size={16} />
            </button>

            <button onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Italic">
                <Italic size={16} />
            </button>

            <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded ${editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Underline">
                <UnderlineIcon size={16} />
            </button>

            <button onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded ${editor.isActive("strike") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Strikethrough">
                <Strikethrough size={16} />
            </button>

            <button onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-2 rounded ${editor.isActive("code") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Code">
                <Code size={16} />
            </button>

            {/* Color / highlight */}
            <button onClick={setColor} className="p-2 rounded hover:bg-gray-100" title="Text color">
                <span className="inline-flex items-center gap-1">
                    <svg width="14" height="14" className="rounded-sm border" />
                    A
                </span>
            </button>

            <button onClick={setHighlight} className={`p-2 rounded ${editor.isActive("highlight") ? "bg-yellow-200" : "hover:bg-gray-100"}`} title="Highlight">
                <Highlighter size={16} />
            </button>

            {/* Headings */}
            <div className="flex items-center border-l px-2">
                <select
                    onChange={(e) => {
                        const level = parseInt(e.target.value);
                        if (level) {
                            editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run();
                        } else {
                            editor.chain().focus().setParagraph().run();
                        }
                    }}
                    value={
                        editor.isActive("heading", { level: 1 }) ? "1" :
                            editor.isActive("heading", { level: 2 }) ? "2" :
                                editor.isActive("heading", { level: 3 }) ? "3" : "0"
                    }
                    className="p-1 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="0">Normal</option>
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                </select>
            </div>
            {/* Font Family */}
            <div className="flex items-center border-l px-2">
                <select
                    onChange={(e) => {
                        const fontFamily = e.target.value;
                        if (fontFamily === "default") {
                            editor.chain().focus().unsetFontFamily().run();
                        } else {
                            editor.chain().focus().setFontFamily(fontFamily).run();
                        }
                    }}
                    value={editor.getAttributes('textStyle').fontFamily || "default"}
                    className="p-1 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="default">Default</option>
                    <option value="Inter" style={{ fontFamily: 'Inter' }}>Inter</option>
                    <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
                    <option value="Courier New" style={{ fontFamily: 'Courier New' }}>Courier New</option>
                    <option value="Georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
                    <option value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
                    <option value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
                    <option value="Comic Sans MS" style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
                </select>
            </div>
            {/* Lists */}
            <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Bullet list">
                <List size={16} />
            </button>

            <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Ordered list">
                <ListOrdered size={16} />
            </button>

            {/* Quote / hr */}
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded ${editor.isActive("blockquote") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Quote">
                <Quote size={16} />
            </button>

            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="p-2 rounded hover:bg-gray-100" title="Horizontal rule">
                <HrIcon size={16} />
            </button>

            {/* Align */}
            <div className="flex items-center border-l px-2 gap-1">
                <button onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className={`p-2 rounded ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Left">
                    <AlignLeft size={16} />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className={`p-2 rounded ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Center">
                    <AlignCenter size={16} />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className={`p-2 rounded ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Right">
                    <AlignRight size={16} />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    className={`p-2 rounded ${editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Justify">
                    <AlignJustify size={16} />
                </button>
            </div>

            {/* Link / Image / Table */}
            <div className="flex items-center border-l px-2 gap-1">
                <button onClick={promptLink}
                    className={`p-2 rounded ${editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"}`} title="Insert link">
                    <LinkIcon size={16} />
                </button>

                <button onClick={removeLink} className="p-2 rounded hover:bg-gray-100" title="Remove link">
                    <ClearIcon size={16} />
                </button>

                <button onClick={promptImage} className="p-2 rounded hover:bg-gray-100" title="Insert image">
                    <ImageIcon size={16} />
                </button>

                <button onClick={insertTable} className="p-2 rounded hover:bg-gray-100" title="Insert table">
                    <TableIcon size={16} />
                </button>
            </div>

            {/* Undo / Redo / Clear */}
            <div className="flex items-center border-l px-2 gap-1">
                <button onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded hover:bg-gray-100" title="Undo">
                    <Undo size={16} />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded hover:bg-gray-100" title="Redo">
                    <Redo size={16} />
                </button>

                <button onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className="p-2 rounded hover:bg-gray-100" title="Clear formatting">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default MenuBar;
