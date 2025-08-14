import express from "express"
import { prismaClient } from "store/client"
import cors from "cors"
import { authInput, websiteInput } from "./types"
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8080
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in the environment variables.");
  process.exit(1);
}

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the Better Uptime API",
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "better-uptime-api"
  })
})

app.post("/user/signup", async (req, res) => {

  const parsedData = authInput.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).send({
      message: "Invalid Input Data for Sign Up",
      Error: parsedData.error.format(),
    });

    return;
  }

  const { email, password } = parsedData.data;

  // Check if the user already exists
  const existingUser = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).send({
      message: "User already exists",
    });
  }

  // Create a new user
  try {
    const user = await prismaClient.user.create({
      data: {
        password,
        email,
      },
    });

    res.json({
      Message: "User created successfully",
      UserId: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(403).send({
      message: "Error Occured in creating User",
    });
  }
})

app.post("/user/signin", async (req, res) => {

  const parsedData = authInput.safeParse(req.body);

  if (!parsedData.success) {

    return res.status(400).send({
      message: "Invalid Input Data for Sign In",
      Error: parsedData.error.format(),

    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (parsedData.data.password != user?.password) {
    res.status(403).send({
      message: "Password incorrect error",
    });
    return;
  }


  // JWT token should always be signed with a object payload

  let token = jwt.sign(
    {
      userId: user.id,
    }, JWT_SECRET);

  res.json({
    jwt: token,
  });

});


app.post("/website", authMiddleware, async (req, res) => {

  const parsedData = websiteInput.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send({
      message: "Invalid Input Data for Website",
      Error: parsedData.error.format(),
    });
  }

  try {
    const website = await prismaClient.website.create({
      data: {
        url: parsedData.data.url,
        timeAdded: new Date(),
        userId: req.userId!, // Assuming req.userId is set by the authMiddleware
      }
    })

    return res.json({
      "msg": "On /website",
      id: website.id
    })

  } catch (error) {

    console.error("Error creating website:", error);
    return res.status(500).send({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });

  }
})

app.get("/status/:websiteId", authMiddleware, async (req, res) => {
  const websiteId = req.params.websiteId


  if (!websiteId) {
    return res.status(400).json({
      message: "Website ID is required"
    })
  }

  // Find the website by ID and userId and include the latest tick to check whether the website was up or down

  const website = await prismaClient.website.findFirst({
    where: {
      id: websiteId,
      userId: req.userId, // Assuming req.userId is set by the authMiddleware
    },
    include: {
      ticks: {
        orderBy: [{
          createdAt: "desc",
        }],
        take: 1
      }
    }
  })

  if (!website) {
    return res.status(409).json({
      message: "Not found"
    })
  }

  return res.json({
    "msg": "On /status",
    website: website
  })
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})