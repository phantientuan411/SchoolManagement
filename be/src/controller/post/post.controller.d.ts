import * as express from "express";
interface SortQuery {
    [key: string]: "asc" | "desc" | "";
}
interface PostQuery {
    pageId: string;
    pageSize: string;
    searchName?: string;
    sort: SortQuery | string;
}
declare const getQueryPost: (req: express.Request<{}, {}, {}, PostQuery>, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const createPost: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const updatePost: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const deletePost: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { getQueryPost, createPost, updatePost, deletePost };
//# sourceMappingURL=post.controller.d.ts.map