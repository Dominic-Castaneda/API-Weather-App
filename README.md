# Weather App (React Native + Expo)

This is a cross-platform **Weather App** built using **React Native**, **Expo**, and **Expo Router**. It allows users to search for cities, save them, and view real-time weather data including hourly and 10-day forecasts. The app supports iOS, Android, and Web.

Weather data is powered by the **OpenWeather API**, and saved cities are stored using **Supabase**.

---

## 📋 Features

- 🔍 Search cities using OpenWeather's Geocoding API  
- 🌤 View current temperature, humidity, wind, and description  
- 🕐 Hourly forecast for the next 12 hours  
- 📅 10-day forecast with icons and temperature ranges  
- 🗺 View weather map overlays for selected cities  
- 💾 Save cities to a personal list (stored in Supabase)  
- 🌐 Supports Expo Web + Expo Go for mobile devices  

---

## 🚀 Getting Started

### 1. Clone the Repository

Using GitHub Desktop:

```
File > Clone Repository > Select this repo
```

Or from terminal:

```bash
git clone https://github.com/Dominic-Castaneda/API-Weather-App.git
```

---

### 2. Navigate to the Project Directory

```bash
cd API_Weather_App
```

---

### 3. Install Dependencies

```bash
npm install
```

This installs all dependencies listed in `package.json` using Node.  
📦 No need for `node_modules/` — it’s generated automatically.

---

### 4. Set Up Environment Variables

Create a `.env` file in the root of the project:

```
OPENWEATHER_API_KEY=your_openweather_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

You can use the included `.env.example` file as a reference.

> **Note:** Do **not** commit `.env` to GitHub — this file contains sensitive information and is ignored via `.gitignore`.

---

### 5. Start the App

```bash
npx expo start
```

- Press `w` to run on Web  
- Scan the QR code using the **Expo Go app** on your phone to run on iOS/Android  

---

## 📁 Folder Structure

```plaintext
API_Weather_App/
├── app/
│   ├── (tabs)/
│   │   ├── index.jsx        # Search & saved cities
│   │   ├── forecast.jsx     # Forecast screen
│   │   └── map.jsx          # Weather map screen
│   ├── _layout.jsx          # Expo Router tab layout
│   └── +not-found.jsx       # 404 fallback
├── lib/                     # Supabase + global state
├── components/              # Shared UI components
├── assets/                  # Icons, splash, fonts
├── .env.example             # Reference for required keys
├── package.json             # Project metadata & dependencies
└── babel.config.js          # Environment config
```

---

## 👥 Branch Workflow

### ✅ Don’t work on `main` directly.

**All development should happen in feature branches:**

1. Create a new branch in GitHub Desktop:  
   - Example: `feature-search`, `fix-forecast-logic`, etc.
2. Make your changes in VS Code.
3. Commit and push from GitHub Desktop.
4. Open a Pull Request on GitHub.

✅ **Dominic** will review and approve before merging into `main`.

---

## 🛠 Technologies Used

- [Expo](https://expo.dev/)  
- [React Native](https://reactnative.dev/)  
- [Expo Router](https://expo.github.io/router/)  
- [Axios](https://axios-http.com/)  
- [Supabase](https://supabase.com/)  
- [OpenWeather API](https://openweathermap.org/api)  
- [Leaflet.js](https://leafletjs.com/) (for weather map on web)  
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)  

---

## ✅ Notes for Professors/Testers

- If testing locally, be sure to **request the `.env` file directly from the developer**.  
- Alternatively, create your own `.env` using a valid OpenWeather API key and Supabase project.  
- `node_modules/` is intentionally ignored — run `npm install` to generate dependencies.

---

## 📄 License

This project is for educational purposes only.