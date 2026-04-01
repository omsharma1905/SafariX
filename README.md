# 🌍 SafariX – AI Trip Planner

SafariX is an AI-powered trip planning web application that helps users create personalized travel itineraries based on their preferences. Users can generate complete travel plans including hotel recommendations and daily activities using AI.

---

## ✨ Features

- 🔐 Google Authentication (OAuth)
- 🧠 AI-generated travel itineraries
- 📍 Destination search using Google Places
- 🏨 Hotel recommendations with images & details
- 🗺️ Day-wise travel plans with places to visit
- 💾 Save trips and view them later
- 📱 Fully responsive across all devices

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS + Shadcn UI
- **Routing:** React Router
- **Authentication:** Google OAuth
- **AI:** Google Gemini API
- **Maps & Places:** Google Places API
- **Database:** Firebase Firestore
- **Notifications:** Sonner

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/omsharma1905/SafariX.git
cd safarix
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a .env file in the root directory and add the following:

```bash
# Google Places API (Maps JavaScript + Places API)
VITE_GOOGLE_PLACE_API_KEY=AIzaSyD-example-google-place-key-123456
YOUR_GOOGLE_PLACES_API_KEY=AIzaSyD-example-google-place-key-123456

# Google Gemini AI API
VITE_GOOGLE_GEMINI_AI_API_KEY=AIzaSyD-example-gemini-ai-key-abcdef

# Google OAuth Client ID
VITE_GOOGLE_AUTH_CLIENT_ID=123456789012-abcxyzexample.apps.googleusercontent.com

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyD-example-firebase-api-key-987654
VITE_FIREBASE_AUTH_DOMAIN=safarix-example.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=safarix-example
VITE_FIREBASE_STORAGE_BUCKET=safarix-example.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEF1234
```

### 4️⃣ Run the project

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 🧠 How SafariX Works

- User signs in using Google
- User enters travel preferences (destination, days, budget, travelers)
- A structured prompt is sent to Gemini AI
- AI generates a detailed travel itinerary in JSON format
- Trip data is saved to Firebase
- Users can revisit and view their saved trips anytime

## 📌 Notes

- This project is built for learning, portfolio, and real-world use
- No unnecessary pages or placeholder links are included
- Google API keys must be configured correctly for the app to work

## 👨‍💻 Author


Om Sharma
<br>
SafariX – AI Trip Planner
