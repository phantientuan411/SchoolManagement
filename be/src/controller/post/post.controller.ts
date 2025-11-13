import PostModel from "../../model/homepage/post.model.ts";
import * as express from "express";
import AccountModel from "../../model/acount/acount.model.ts";

interface SortQuery {
  [key: string]: "asc" | "desc" | "";
}

interface PostQuery {
  pageId: string;
  pageSize: string;
  searchName?: string;
  sort: SortQuery | string;
}

const parseSortQuery = (sortObj: SortQuery): Record<string, 1 | -1> => {
  const result: Record<string, 1 | -1> = {};
  for (const key in sortObj) {
    const value = sortObj[key];
    if (value === "asc") result[key] = 1;
    else if (value === "desc") result[key] = -1;
  }
  return result;
};

const getQueryPost = async (req: express.Request<{}, {}, {}, PostQuery>, res: express.Response) => {
  try {
    const pageId = parseInt(req.query.pageId);
    const pageSize = parseInt(req.query.pageSize);
    const searchName = req.query.searchName || "";

    if (isNaN(pageId) || isNaN(pageSize)) {
      return res.status(400).json({ message: "Thiếu tham số pageId hoặc pageSize" });
    }

    const query = searchName
      ? { name: { $regex: searchName, $options: "i" } }
      : {};

    const startItem = (pageId - 1) * pageSize;
    const totalPost = await PostModel.countDocuments(query);
    const totalPage = Math.ceil(totalPost / pageSize);

    const getPost = await PostModel.find(query)
      .populate("author")
      .skip(startItem)
      .limit(pageSize)
      .sort(parseSortQuery(JSON.parse(req.query.sort as string)));

    return res.status(200).json({
      data: getPost,
      totalPage,
      totalPost,
      message: "Thành công",
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

const createPost = async (req: express.Request, res: express.Response) => {
  try {
    const { title, content, author,type } = req.body;
    if (!title || !content || !author || !type) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const checkAccount = await AccountModel.findById({ _id: author });
    if (!checkAccount) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    const newPost = await PostModel.create({ title, content, author, type });
    return res.status(201).json({ message: "Tạo thành công", data: newPost });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updatePost = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ID bài viết" });
    }

    const updatedPost = await PostModel.findByIdAndUpdate({ _id: id }
      ,
      { title, content, isUpdate: true },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "cập nhật thất bại" });
    }

    return res.status(200).json({ message: "Cập nhật thành công", data: updatedPost });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

const deletePost = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Thiếu ID bài viết" });
    }
    const deletedPost = await PostModel.findByIdAndDelete({ _id: id });
    if (!deletedPost) {
      return res.status(404).json({ message: "Bài viết không tồn tại hoặc đã bị xóa" });
    }
    return res.status(200).json({ message: "Xóa thành công", data: deletedPost });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export { getQueryPost, createPost, updatePost, deletePost };
