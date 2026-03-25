import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// API Route for WhatsApp Test Notification
app.post("/api/whatsapp/test", async (req, res) => {
  const { phoneNumber } = req.body;
  const apiToken = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!apiToken || !phoneNumberId) {
    return res.status(500).json({
      error: "WhatsApp API credentials are not configured in the environment."
    });
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phoneNumber.replace(/\D/g, ''),
          type: "template",
          template: {
            name: "hello_world",
            language: { code: "en_US" }
          }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    res.json({ success: true, messageId: data.messages?.[0]?.id });
  } catch (error) {
    console.error("WhatsApp API Error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "An unexpected error occurred."
    });
  }
});

// Catch-all for unknown API routes
app.all("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;