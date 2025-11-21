// src/editor/extensions.ts
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";

export const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4] },
  }),
  Underline,
  TextStyle,
  Color,
  FontFamily,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Highlight,
  Link.configure({ openOnClick: false }),
  Image,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
];