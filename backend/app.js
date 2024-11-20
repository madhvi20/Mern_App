import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

// Load environment variables
config({ path: "./config.env" });

const app = express();
const router = express.Router();

// Enable CORS with specific frontend URL
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Ensure this is set in your .env file
    methods: ["POST"],
    credentials: true,  // Allow cookies to be sent with requests (optional)
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your send mail route
router.post("/send/mail", async (req, res, next) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details (name, email, message).",
    });
  }

  try {
    // Send email (ensure sendEmail is defined and works correctly)
    await sendEmail({
      email: "madhvisingh484@gmail.com",  // The recipient email
      subject: "GYM WEBSITE CONTACT",      // The email subject
      message: message,                    // The email body
      userEmail: email,                    // The sender's email
    });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
});

// Use router for the API routes
app.use(router);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
