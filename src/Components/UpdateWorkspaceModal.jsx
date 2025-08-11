import React, { useState, useEffect } from "react";
import botAvatar from "../assets/AiStein.png";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import { FaYoutube, FaWikipediaW, FaFilePdf } from "react-icons/fa";
import { BACKEND_URL } from "../constants";
import { addMessage } from "../store/chatSlice"; 

export default function UpdateWorkspaceModal({ isOpen, onClose }) {
  const userName = useSelector((state) => state.chat.userName);
  const [isTyping, setIsTyping] = useState(true);
  const dispatch = useDispatch(); 

  const [formState, setFormState] = useState({
    type: "pdf",
    topic: "",
    title: "",
    link: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    setIsTyping(true);
    // Reset form and typing state on modal open
    setFormState({ type: "pdf", topic: "", title: "", link: "" });

    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const goBackText = "No, I want to go back to chatting";

  // Update form field handler
  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { type, topic, title, link } = formState;

    let prompt = `Update my workspace for ${type} using `;

    switch (type) {
      case "pdf":
        prompt += `pdf:::${topic}:::${title}`;
        break;
      case "wikipedia":
        prompt += `wiki:::${topic}:::${title}`;
        break;
      case "youtube":
        prompt += `youtube:::${topic}:::${title}:::${link}`;
        break;
      default:
        prompt = "";
    }

    console.log("Custom prompt:", prompt);
    dispatch(
        addMessage({
          id: Date.now(),
          text: `Update my workspace on topic '${topic}' by adding ${type} content.`,
          type: "user",
          sources: null,
          videos: null,
          timestamp: new Date().toISOString(),
        })
      );

    setIsTyping(true);    

    try {
      const response = await fetch(`${BACKEND_URL}/ask?user_id=${userName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();      

      dispatch(
        addMessage({
          id: Date.now() + 1, // slightly different id
          text: data.answer || "Sorry couldn't update workspace.",
          type: data.tool_name ? data.tool_name : "bot-default",
          sources: data.sources || null,
          videos: data.videos || null,
          timestamp: new Date().toISOString(),
        })
      );

      onClose(); // Close modal smoothly after dispatch
    } catch (error) {
      console.error("Error updating workspace:", error);
      // Optionally dispatch error message
      dispatch(
        addMessage({
          id: Date.now() + 1,
          text: "Oops! Something went wrong while updating workspace.",
          type: "bot-default",
          timestamp: new Date().toISOString(),
        })
      );
    } finally {
      setIsTyping(false);
    }
  };

  // Icon map for source types
  const iconMap = {
    pdf: <FaFilePdf className="text-red-600" />,
    wikipedia: <FaWikipediaW className="text-blue-600" />,
    youtube: <FaYoutube className="text-red-500" />,
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      {/* Modal content centered */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="flex max-w-4xl w-full bg-gray-100 rounded-lg shadow-lg p-6 relative items-start">
          {isTyping ? (
            <div className="text-gray-900 p-4 max-w-full flex items-center gap-2">
              <span className="animate-pulse">Agent is thinking ...</span>
            </div>
          ) : (
            <>
              {/* Avatar */}
              <img
                src={botAvatar}
                alt="Bot Avatar"
                className="w-16 h-16 rounded-full shadow-md mr-6 select-none self-start"
                draggable={false}
              />

              {/* Left side message + clickable bubble */}
              <div className="flex flex-col justify-center w-1/2 pr-6 border-r border-gray-300 min-h-[100px] space-y-3">
                <div className="bg-gray-200 text-gray-900 rounded-lg p-4 shadow-sm max-w-full whitespace-pre-wrap">
                  Hi {userName}, I can help you update your workspace. Just type
                  the topic and required details of source and hit{" "}
                  <b className="text-cyan-700">submit</b> when ready.
                </div>

                {/* Left side clickable bubble */}
                <div
                  onClick={onClose}
                  className="bg-cyan-500 text-white rounded-lg p-3 mt-6 max-w-xs break-words shadow-md cursor-pointer select-none hover:bg-cyan-600 transition flex items-center gap-2"
                >
                  <MdArrowBack /> {goBackText}
                </div>
              </div>

              {/* Right side form */}
              <div className="flex flex-col w-1/2 pl-6 space-y-3">
                <label
                  className="mb-2 font-medium text-gray-800"
                  htmlFor="topic"
                >
                  Topic
                </label>
                <input
                  id="topic"
                  type="text"
                  placeholder="Enter topic here"
                  value={formState.topic}
                  onChange={(e) => handleChange("topic", e.target.value)}
                  className="mb-4 p-2 border border-gray-300 rounded"
                />

                <fieldset className="mt-4">
                  <legend className="font-semibold mb-2 text-gray-800">
                    Source Type
                  </legend>
                  <div className="flex gap-6">
                    {["pdf", "wikipedia", "youtube"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="sourceType"
                          value={type}
                          checked={formState.type === type}
                          onChange={() => handleChange("type", type)}
                          className="cursor-pointer"
                        />
                        <span className="capitalize flex items-center gap-1">
                          {iconMap[type]}
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Conditional inputs for YouTube */}
                {formState.type === "youtube" && (
                  <>
                    <input
                      type="text"
                      placeholder="Video Title"
                      value={formState.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className="mt-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Video Link"
                      value={formState.link}
                      onChange={(e) => handleChange("link", e.target.value)}
                      className="mt-2 p-2 border border-gray-300 rounded"
                    />
                  </>
                )}

                {/* For pdf or wikipedia just one title input */}
                {(formState.type === "pdf" ||
                  formState.type === "wikipedia") && (
                  <input
                    type="text"
                    placeholder="Title"
                    value={formState.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="mt-4 p-2 border border-gray-300 rounded"
                  />
                )}

                <button
                  className="bg-cyan-600 text-white font-semibold py-2 rounded hover:bg-cyan-700 transition mt-6"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>

              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
