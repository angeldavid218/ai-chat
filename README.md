# AI Chat Application

A modern React-based chat application that integrates with OpenAI's API to provide intelligent conversational responses. Built with TypeScript, Vite, and Dexie for local data persistence.

## 🚀 Features

- **AI-Powered Conversations**: Chat with OpenAI's o4-mini model
- **Local Message Storage**: Persistent chat history using IndexedDB (Dexie)
- **Search Functionality**: Find previous conversations by searching questions
- **Message Management**: Delete individual messages
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Error Handling**: Robust error handling with safeAwait utility

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Dexie (IndexedDB wrapper)
- **Icons**: React Icons
- **API**: OpenAI Chat Completions API

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- OpenAI API key

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-chat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

   **Note**: Replace `your_openai_api_key_here` with your actual OpenAI API key.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 🎯 Usage

### Starting a Conversation

1. Type your question in the input field at the bottom
2. Click "Send" or press Enter
3. Wait for the AI response
4. Your conversation will be automatically saved

### Searching Messages

1. Use the search input at the top to find previous questions
2. Results will show matching conversations
3. Search results don't show delete buttons for cleaner viewing

### Managing Messages

- Click the trash icon next to any message to delete it
- Deleted messages are permanently removed from local storage

## 📁 Project Structure

```
ai-chat/
├── src/
│   ├── App.tsx              # Main application component
│   ├── db.ts                # Database configuration (Dexie)
│   ├── main.tsx             # Application entry point
│   ├── utils/
│   │   └── safeAwait.ts     # Error handling utility
│   └── assets/              # Static assets
├── public/                  # Public assets
├── .env                     # Environment variables (create this)
├── package.json
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗄️ Database Schema

The application uses Dexie (IndexedDB) with the following schema:

```typescript
interface ChatMessage {
  id?: number; // Auto-incrementing primary key
  question: string; // User's question
  answer: string; // AI's response
  createdAt?: Date; // Timestamp
}
```

## 🛡️ Error Handling

The application uses a custom `safeAwait` utility for consistent error handling:

```typescript
const [data, error] = await safeAwait(promise);
if (error) {
  // Handle error gracefully
  return;
}
// Use data safely
```

## 🔒 Security Notes

- **API Key**: Never commit your `.env` file to version control
- **Client-Side Storage**: Messages are stored locally in the browser
- **API Calls**: All OpenAI API calls are made directly from the client

## 🚀 Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service (Netlify, Vercel, etc.)

3. **Set environment variables** in your hosting platform's dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions, please open an issue on the repository.
