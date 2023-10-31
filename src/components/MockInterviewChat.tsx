import { useState } from 'react';

function MockInterviewChat() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! How can I assist you with your mock interview today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    // Add the user's message
    setMessages([...messages, { type: 'user', content: inputValue }]);

    // TODO: Call your language model here to get a response and then add to messages
    // For now, I'll simulate a mock response
    setTimeout(() => {
      setMessages([
        ...messages,
        { type: 'user', content: inputValue },
        { type: 'bot', content: 'This is a mock response.' },
      ]);
    }, 1000);

    setInputValue('');
  };

  return (
    <div className="bg-gray-200 h-full flex flex-col border-2 border-yellow-800">
      <div className="flex-1 overflow-y-auto p-4 h-full border border-black">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === 'bot' ? 'text-left' : 'text-right'
            }`}
          >
            <div
              className={`inline-block max-w-xs py-2 px-4 rounded-lg ${
                message.type === 'bot'
                  ? 'bg-blue-400 text-white'
                  : 'bg-green-400 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 bg-white">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="w-full py-2 px-4 pr-16 rounded-full border focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white rounded-full p-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MockInterviewChat;
