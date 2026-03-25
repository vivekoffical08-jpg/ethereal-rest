# Ethereal Rest: Android Build Guide

This project is configured with **Capacitor** to support native Android builds.

## Prerequisites
- **Node.js** and **npm** installed.
- **Android Studio** installed and configured.
- **Java Development Kit (JDK)** installed and `JAVA_HOME` set.

## Build Instructions

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Build the Web App:**
    ```bash
    npm run build
    ```
    *This will also sync the web assets to the Android project.*

3.  **Open in Android Studio:**
    ```bash
    npx cap open android
    ```
    *This will open the `android` directory in Android Studio.*

4.  **Build the APK:**
    In Android Studio, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

## Capacitor Commands
- `npm run cap:sync`: Syncs web assets and plugins to the Android project.
- `npm run cap:open-android`: Opens the Android project in Android Studio.
- `npm run cap:build-android`: Attempts to build the Android app from the command line (requires `JAVA_HOME`).

## Note
The Android project is located in the `/android` directory.
