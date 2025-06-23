import { useEffect, useState } from 'react';
import { db, type ChatMessage } from './db';
import { safeAwait } from './utils/safeAwait';
import { FaTrash } from 'react-icons/fa';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getMessages = async () => {
    const messages = await db.chatMessages.toArray();
    setMessages(messages);
  };

  const addMessage = async (question: string, answer: string) => {
    const [, err] = await safeAwait(
      db.chatMessages.add({
        question,
        answer,
        createdAt: new Date(),
      })
    );
    if (err) {
      console.error(err);
      return;
    }
    getMessages();
  };

  const handleSend = async () => {
    setIsLoading(true);
    const [response, err] = await safeAwait(
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'o4-mini',
          messages: [{ role: 'user', content: question }],
        }),
      })
    );
    if (err || !response?.ok) {
      console.error(err);
      return;
    }
    const data = await response?.json();
    await addMessage(question, data.choices[0].message.content || '');
    setIsLoading(false);
    setQuestion('');
  };

  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) {
      console.error('Cannot delete message: ID is undefined');
      return;
    }

    const [, err] = await safeAwait(db.chatMessages.delete(id));
    if (err) {
      console.error('Failed to delete message:', err);
      // You could add user feedback here, like a toast notification
      return;
    }

    // Refresh the messages list after successful deletion
    await getMessages();
  };

  useEffect(() => {
    getMessages();
  }, []);

  const filteredMessages = messages.filter((message) =>
    message.question.toLowerCase().includes(search.toLowerCase())
  );

  const MessageItem = ({
    message,
    showDelete = true,
  }: {
    message: ChatMessage;
    showDelete?: boolean;
  }) => (
    <div className="mt-2 flex flex-col p-2 bg-gray-200 rounded-md">
      <div className="flex justify-between items-center">
        <p className="text-left font-bold">{message.question}</p>
        {showDelete && (
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>
      <p className="text-left">{message.answer}</p>
    </div>
  );

  const renderMessages = () => {
    const messagesToShow = search ? filteredMessages : messages;

    if (messagesToShow.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-4">
          {search
            ? 'No messages found matching your search.'
            : 'No messages yet. Start a conversation!'}
        </div>
      );
    }

    return messagesToShow.map((message) => (
      <MessageItem
        key={message.id}
        message={message}
        showDelete={!search} // Only show delete button for regular view, not search results
      />
    ));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-5">Open AI chat</h1>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="find a question"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-col h-[60vh] overflow-y-auto bg-gray-100 p-2 mt-2 rounded-md">
            {renderMessages()}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your message"
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              disabled={isLoading || !question}
              onClick={handleSend}
              className="w-full bg-blue-500 text-white p-2 rounded-md mt-2"
            >
              {isLoading ? 'Loading...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
