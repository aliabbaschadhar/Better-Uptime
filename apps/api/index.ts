import express, { response } from "express"
import { prismaClient } from "store/client"
import cors from "cors"
import { authRouter } from "./auth.ts"

const app = express()

app.use(express.json())
app.use(cors())

// Mount the auth router
app.use("/auth", authRouter)

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the Better Uptime API",
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "better-uptime-api"
  })
})

app.post("/website", async (req, res) => {
  const website = await prismaClient.website.create({
    data: {
      url: req.body.url,
      timeAdded: new Date()
    }
  })
  return res.json({
    "msg": "On /website",
    id: website.id
  })
})

app.get("/status/:websiteId", (req, res) => {
  const websiteId = req.params.websiteId
  // Here you would typically check the status of the website with the given ID
  // For now, we will just return a dummy status
  return res.json({
    "msg": "On /status",
    websiteId: websiteId,
    status: "up" // This is a placeholder; actual status checking logic would go here
  })
})


app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`)
})