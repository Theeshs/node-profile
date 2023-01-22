import express from "express";

const auth = express.Router()


auth.get("/version", (req, res) => {
    return res.send({ "message": "Success", "version": "1.0.0" })
})

auth.post("/user/create", (req, res) => {
    res.send(req.body)
})


export default auth