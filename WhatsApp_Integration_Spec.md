# Technical Specification: WhatsApp Daytime Sleep Integration

## 1. Overview
The WhatsApp Daytime Sleep Integration is a premium feature for the Ethereal Rest application. It leverages the app's "On-Device Intelligence" to detect daytime sleep patterns and automatically notify parents via the WhatsApp Business API.

## 2. Objective
To provide real-time peace of mind to parents by notifying them when their child has successfully transitioned into a nap during specified daytime hours, enhancing the app's utility as a comprehensive family sleep tool.

## 3. System Architecture

### 3.1. Detection Layer (Client-Side)
- **Sensor Suite:** Utilizes the high-precision accelerometer and soundscape analysis to identify sleep onset.
- **Logic:** If sleep is detected between the user-defined `Start Time` and `End Time`, a trigger event is generated.

### 3.2. Integration Layer (Server-Side)
- **API Provider:** WhatsApp Business API (via Meta Graph API or Twilio Messaging API).
- **Authentication:** Secure storage of API tokens and Parent Phone Numbers in the user's encrypted profile.
- **Message Templates:** Since WhatsApp requires pre-approved templates for business-initiated messages, the following template must be registered:
  - **Template Name:** `daytime_sleep_notification`
  - **Content:** "Hey, your child is sleeping in the day."
  - **Media:** Image attachment (JPEG/PNG).

### 3.3. Workflow
1. **Trigger:** On-device AI detects sleep during the active monitoring window.
2. **Request:** Client sends a secure POST request to the `/api/notify/whatsapp` endpoint.
3. **Validation:** Server verifies the user's subscription and the current time against the user's settings.
4. **Dispatch:** Server calls the WhatsApp API with the approved template and a dynamic image URL of a sleeping child (or a captured frame if privacy settings allow).
5. **Confirmation:** WhatsApp delivers the message; the app logs the successful notification in the "Trends" tab.

## 4. Technical Requirements

### 4.1. Environment Variables
- `WHATSAPP_API_TOKEN`: Access token for the Meta Business Suite.
- `WHATSAPP_PHONE_NUMBER_ID`: The unique ID for the sender's phone number.
- `WHATSAPP_TEMPLATE_NAME`: `daytime_sleep_notification`.

### 4.2. Security & Compliance
- **Privacy:** All audio/movement data remains on-device. Only the "Sleep Detected" boolean and the target phone number are transmitted.
- **Opt-in:** Parents must explicitly provide their phone number and verify it via a one-time password (OTP) to comply with anti-spam regulations.

## 5. User Interface (UI) Design
- **Integration Hub:** A dedicated section in the "Profile" or "Labs" tab.
- **Customization:**
  - Toggle switch for "Daytime Monitoring".
  - Time Range Picker (e.g., 10:00 AM - 4:00 PM).
  - Phone Number Input with international country code support.
  - "Send Test Message" button for immediate verification.

## 6. Future Enhancements
- **Multi-Parent Support:** Ability to notify multiple contacts.
- **Custom Images:** Allowing parents to upload a custom "Sleeping" placeholder image.
- **Interactive Responses:** Allowing parents to reply "Check in" to receive a live status update.
