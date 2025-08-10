import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/chatSlice";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(setUserName(name.trim()));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6">
      <h2 className="text-4xl font-semibold text-white mb-6">
        Welcome to Cognitize
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 px-4 py-3 rounded-md border border-gray-600 bg-transparent text-white text-xl  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          autoFocus
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md transition"
        >
          Start Chatting
        </button>
      </form>
    </div>
  );
}
