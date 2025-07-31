import express from "express"
import { prismaClient } from "store/client"
import cors from "cors"
import { authInput } from "./types"
import jwt from "jsonwebtoken"

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

app.post("/user/signup", async (req, res) => {

  const parsedData = authInput.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).send({
      message: "Invalid Input Data for Sign Up",
      Error: parsedData.error.format(),
    });

    return;
  }

  const { username, password } = parsedData.data;

  // Check if the user already exists
  const existingUser = await prismaClient.user.findUnique({
    where: {
      username: username,
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
        username,
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
      username: parsedData.data.username,
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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})