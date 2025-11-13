import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { post, get, put, del } from "../../axios/ultil.tsx";

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    type: string;
}

interface SortQuery {
    _id: 'asc' | 'desc' | "";
    title: 'asc' | 'desc' | "";
    content: 'asc' | 'desc' | "";
    author: 'asc' | 'desc' | "";
    type: 'asc' | 'desc' | "";
}

interface ApiPostRespond {
    data: Post[];
    totalPage: number;
    totalPost: number
}

interface ApiPostRequest {
    pageId: number;
    pageSize: number;
    searchName: string | null;
    sort: SortQuery
}

interface PostState {
    post: Post[];
    pageId: number;
    pageSize: number;
    searchName: string;
    sort: SortQuery;
    totalPage: number;
    totalPost: number;
    loading: boolean;
    error: string | null;
    pagination: number[];
    selectedPost: string
}

const initialState: PostState = {
    post: [],
    pageId: 1,
    pageSize: 20,
    searchName: "",
    sort: {
        _id: "",
        title: "",
        content: "",
        author: "",
        type: ""
    },
    selectedPost: "1",
    pagination: [],
    totalPage: 0,
    totalPost: 0,
    loading: false,
    error: null
}
interface UpdateSortFieldPayload {
    field: keyof SortQuery;
    value: "asc" | "desc" | "";
}

const token = localStorage.getItem("accessToken") ?? "";

export const getPost = createAsyncThunk<
    ApiPostRespond,
    ApiPostRequest,
    { rejectValue: string }
>(
    "post",
    async (
        { pageId, pageSize, searchName, sort },
        { rejectWithValue }
    ) => {
        try {
            const res = await get('post', { pageId, pageSize, searchName: searchName ?? "", sort: JSON.stringify(sort) }, { baseURL: "http://localhost:3000/api" ,token})
            if (!res.ok || !res.data) {
                return rejectWithValue(res.error || "Lấy dữ liệu thất bại")
            }
            return res.data

        } catch (error: any) {
            return rejectWithValue(error.message || "Lấy dữ liệu thất bại")
        }
    }
)
// Thêm bài viết
export const createPost = createAsyncThunk<
    Post,
    Omit<Post, "_id">,
    { rejectValue: string }
>(
    "post/newPost",
    async (newPost, { rejectWithValue }) => {
        try {
            const res = await post("post/newpost", newPost, { baseURL: "http://localhost:3000/api", token });
            if (res.status !== 201 || !res.data) {
                return rejectWithValue("Thêm bài viết thất bại");
            }
            else{
                window.location.reload();
                return res.data;
            }
            
            
            
        } catch (error: any) {
            return rejectWithValue(error.message || "Thêm bài viết thất bại");
        }
    }
);

// Cập nhật bài viết
export const updatePost = createAsyncThunk<
    Post,
    Post,
    { rejectValue: string }
>(
    "post/updatePost",
    async (updatedPost, { rejectWithValue }) => {
        try {
            const res = await put(
                `post/${updatedPost._id}?_method=PUT`,
                updatedPost,
                { baseURL: "http://localhost:3000/api",token }
            );
            if (res.status !== 200 || !res.data) {
                return rejectWithValue("Cập nhật bài viết thất bại");
            }
            else{
                window.location.reload();
                return res.data;
            }
            
        } catch (error: any) {
            return rejectWithValue(error.message || "Cập nhật bài viết thất bại");
        }
    }
);

// Xóa bài viết
export const deletePost = createAsyncThunk<
    string, // trả về id đã xóa
    string, // id bài viết
    { rejectValue: string }
>(
    "post/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            const res = await del(
                `post/delete/${id}?_method=DELETE`,
                
                { baseURL: "http://localhost:3000/api",token }
            );
            if (res.status !== 200) {
                return rejectWithValue("Xóa bài viết thất bại");
            }
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || "Xóa bài viết thất bại");
        }
    }
);
const getPostSlice = createSlice({
    name: "getPost",
    initialState,
    reducers: {
        setPagination: (state, action) => {
            state.pagination = action.payload
        },
        setPageId: (state, action) => {
            state.pageId = action.payload
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload
        },
        setSearchName: (state, action) => {
            state.searchName = action.payload
        },
        setSortField: (state, action: PayloadAction<UpdateSortFieldPayload>) => {
            const { field, value } = action.payload
            state.sort[field] = value
        }
    },
    extraReducers: (builder) => {
        builder
            // Lấy danh sách
            .addCase(getPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload.data;
                state.totalPage = action.payload.totalPage;
                state.totalPost = action.payload.totalPost;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            //  Thêm bài viết
            .addCase(createPost.fulfilled, (state, action) => {
                state.post.unshift(action.payload); // thêm lên đầu
                state.totalPost += 1;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            //  Cập nhật bài viết
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.post.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.post[index] = action.payload;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            //  Xóa bài viết
            .addCase(deletePost.fulfilled, (state, action) => {
                state.post = state.post.filter(p => p._id !== action.payload);
                state.totalPost -= 1;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.error = action.payload as string;
            });

    }
})

export const { setPagination, setPageId, setSelectedPost, setSearchName, setSortField } =
    getPostSlice.actions;

export default getPostSlice.reducer;


