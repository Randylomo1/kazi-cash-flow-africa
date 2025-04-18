
# KaziCash - Mobile-First Fintech App for African Gig Workers

KaziCash is a mobile-first fintech superapp designed for Africa's informal and gig workers. The app provides instant M-Pesa payments, work-based microloans, trust profiles, offline functionality, and smart AI features including a chatbot, speech-to-text, and dynamic credit scoring.

## Features

- **User Authentication**: Secure login with phone number + OTP
- **Home Dashboard**: Today's earnings, trust score meter, job suggestions feed
- **Job Center**: Map/list toggle for job browsing, filtering by pay/type/trust level
- **KaziWallet**: Total balance, M-Pesa integration, offline payment sync
- **Work-Based Credit**: Loan simulator, trust-based eligibility
- **Trust Profile**: Star ratings, badges, completed job history
- **Offline Mode**: Working offline banner, local job caching
- **AI Features**: Chatbot, speech-to-text, AI credit score engine
- **Multi-language Support**: English, Swahili, French

## Installation on Android Studio

### Prerequisites

- Android Studio (latest stable version)
- Java Development Kit (JDK) 8 or higher
- Android SDK

### Steps to Import and Run

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/kazicash.git
   ```

2. **Open Android Studio**
   - Select "Open an existing Android Studio project"
   - Navigate to the cloned project folder and select the "android" directory
   - Click "OK"

3. **Sync Gradle files**
   - Android Studio will automatically sync the Gradle files
   - If prompted, update Gradle plugin and dependencies

4. **Build the project**
   - Select "Build" > "Make Project" (or press Ctrl+F9 / Cmd+F9)

5. **Run the app**
   - Select a virtual device or connect a physical device
   - Click the "Run" button (the green triangle) or press Shift+F10 / Ctrl+R

6. **For development**
   - The web app source code is in the `src` directory
   - Make changes to the React codebase
   - Run `npm run build` to create a production build
   - Copy the build files to `android/app/src/main/assets`

## Development

### Web App Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Building for Android

```bash
# Create a production build of the web app
npm run build

# Copy the build to Android assets folder
cp -r build/* android/app/src/main/assets/

# Open Android Studio and build the APK
# Or use Gradle command line:
cd android
./gradlew assembleDebug
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
