import { useState } from "react";

const PlanPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Where would you like to go?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.sender === "ai" ? "assistant" : "user",
            content: msg.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server.");
      }

      const data = await response.json();
      const aiMessage = { id: Date.now() + 1, text: data.reply, sender: "ai" };
      setMessages([...newMessages, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I seem to be having trouble connecting. Please try again later.",
        sender: "ai",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side: Chat Interface */}
      <div className="w-1/2 flex flex-col p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Plan Your Trip
        </h1>
        <div className="flex-grow bg-white rounded-lg shadow-md p-4 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-lg ${
                  message.sender === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-gray-200 text-gray-800">
                Typing...
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell me your travel plans..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-6 rounded-r-lg hover:bg-indigo-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      {/* Right side: Itinerary and Map */}
      <div className="w-1/2 p-6">
        <div className="bg-white rounded-lg shadow-md h-full p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Itinerary
          </h2>
          <div className="border-dashed border-2 border-gray-300 rounded-lg h-1/2 mb-4 flex items-center justify-center">
            <p className="text-gray-500">Map will be displayed here.</p>
          </div>
          <div className="border-dashed border-2 border-gray-300 rounded-lg h-1/2 flex items-center justify-center">
            <p className="text-gray-500">Trip details will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
