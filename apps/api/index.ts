import express from "express"
import { prismaClient } from "store/client"

const app = express()

app.post("/website", (req, res) => {

})

app.get("/status/:websiteId", (req, res) => {

})


app.listen(process.env.PORT || 8080)