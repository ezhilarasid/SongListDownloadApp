🎵 React Native Song List & Download App

A mini React Native project that displays a list of songs from an API and allows users to download songs from both the Song List screen and the Song Details screen.

✨ Features

🏠 Home Screen with gradient background & headphones illustration

📜 Song List screen with:

Song thumbnail, title, artist

Download button for each song

🎶 Song Details screen with:

Larger artwork

Song info

Download button

⬇️ File Download using react-native-fs (saves inside app’s Documents folder)

🔄 Loader spinner while downloading

✅ Success alert after download completes

♻️ Clean project structure with reusable components

📂 Project Structure
src/
 ├── api/
 │   └── songsApi.js         # Mock API for song data
 ├── components/
 │   └── SongItem.js         # Reusable song card with download button
 ├── navigation/
 │   └── AppNavigator.js     # Navigation setup
 ├── screens/
 │   ├── HomeScreen.js       # Welcome / landing page
 │   ├── SongListScreen.js   # Displays list of songs
 │   └── SongDetailsScreen.js# Song detail view with download
 └── utils/
     └── downloadHelper.js   # File download logic

🚀 Getting Started
1. Clone the repo
git clone https://github.com/ezhilarasid/SongListDownloadApp.git
cd SongListDownloadApp

2. Install dependencies
npm install

3. Install navigation dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler

4. Install file system dependency
npm install react-native-fs

5. iOS setup (Mac only)
cd ios && pod install && cd ..

▶️ Running the App

Start Metro bundler:

npx react-native start


Run on Android:

npx react-native run-android


Run on iOS (macOS only):

npx react-native run-ios
