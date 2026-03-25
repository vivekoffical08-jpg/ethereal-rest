import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

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
      // Real Meta Graph API call for WhatsApp
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
            to: phoneNumber.replace(/\D/g, ''), // Strip non-digits
            type: "template",
            template: {
              name: "hello_world", // Standard test template
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
