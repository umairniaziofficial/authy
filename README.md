# 🔐 Authy: A React Firebase Authentication App

Authy is a full-featured authentication application built with React, Firebase, and Redux. This project demonstrates a complete authentication flow including email/password login, Google authentication, email verification, and password reset functionality. It also includes a real-time chat feature to demonstrate protected routes and Firebase Firestore integration.

![Authy Screenshot](https://via.placeholder.com/800x400.png?text=Authy+Screenshot)

## ✨ Features

- 👤 User authentication (Email/Password & Google Sign-in)
- 📧 Email verification system
- 🔑 Password reset functionality
- 💬 Real-time chat with Firestore
- 🔒 Protected routes based on authentication status
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 🚀 Redux Toolkit for state management
- 📱 Responsive design for all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Firebase project

### Installation

1. Clone the repository:

```bash
git clone https://github.com/umairniaziofficial/authy.git
cd authy
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory with your Firebase configuration:

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and select the sign-in methods:
   - Email/Password
   - Google
3. Create a Firestore database with the following collection:
   - `messages` - to store chat messages

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:5173/](http://localhost:5173/) (or another port if 5173 is already in use).

## 📁 Project Structure

### 🔒 Authentication Flow

- **Sign Up**: Users can create an account with email/password or Google authentication.
- **Email Verification**: After signing up, users must verify their email to access the chat feature.
- **Login**: Existing users can log in with their email/password or Google account.
- **Password Reset**: Users can request a password reset if they forget their password.

### 💬 Chat Functionality

The chat feature demonstrates:

- Real-time updates using Firestore
- User identification
- Timestamp-based message sorting
- Message ownership UI differences

## ⚙️ Environment Variables

You must create a `.env` file in the project root with the following variables from your Firebase project:

| Variable                          | Description                             |
| --------------------------------- | --------------------------------------- |
| VITE_FIREBASE_API_KEY             | Firebase Web API Key                    |
| VITE_FIREBASE_AUTH_DOMAIN         | Firebase Auth Domain                    |
| VITE_FIREBASE_PROJECT_ID          | Firebase Project ID                     |
| VITE_FIREBASE_STORAGE_BUCKET      | Firebase Storage Bucket                 |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Firebase Messaging Sender ID            |
| VITE_FIREBASE_APP_ID              | Firebase Application ID                 |
| VITE_FIREBASE_MEASUREMENT_ID      | Firebase Measurement ID (for Analytics) |

### To obtain these values:

1. Go to your Firebase project console
2. Click on "Project settings" (gear icon)
3. Scroll down to "Your apps" section
4. Select your web app or create a new one
5. Find the Firebase SDK configuration values

## 🛠️ Built With

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Frontend tooling
- [Firebase](https://firebase.google.com/) - Authentication and database
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component collection
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Router](https://reactrouter.com/) - Routing

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Firebase](https://firebase.google.com/) for the authentication and database services

---

🔗 **GitHub Repository:** [Authy](https://github.com/umairniaziofficial/authy)

