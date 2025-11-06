import * as express from "express";
const test = async (req: express.Request, res: express.Response) => {
    res.status(200).json({
        message: "hello"
    })

}
export{test}