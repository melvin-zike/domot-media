const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const verify = require("./verifyToken");

const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
// const router = express.Router();
const path = require("path");
// const { Console } = require("console");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(
express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
app.use(helmet());
app.use(morgan("common"));
// app.use(bodyParser({ limit: "20mb", extended: true}));
// app.use(bodyParser.urlencoded({ limit: "20mb", extended: true}));



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", verify, upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.use(express.static(path.join(__dirname, "/domot-client")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/domot-client/build', 'index.html'));
});



app.listen(process.env.PORT || 4200, () => {
  console.log("Backend server is running!");
});


