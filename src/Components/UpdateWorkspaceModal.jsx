import React, { useState, useEffect } from "react";
import botAvatar from "../assets/AiStein.png";
import { useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";

export default function UpdateWorkspaceModal({ isOpen, onClose }) {
  const userName = useSelector((state) => state.chat.userName);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const goBackText = "No, I want to go back to chatting";

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
                  className="bg-cyan-500 text-white rounded-lg p-3 mt-6 max-w-xs break-words shadow-md cursor-pointer select-none hover:bg-cyan-600 transition"
                >
                    {goBackText} <MdArrowBack/>
                </div>
              </div>

              {/* Right side form + clickable bubble */}
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
                  className="mb-4 p-2 border border-gray-300 rounded"
                />

                <label
                  className="mb-2 font-medium text-gray-800"
                  htmlFor="details"
                >
                  Source Details
                </label>
                <textarea
                  id="details"
                  rows={4}
                  placeholder="Enter details here"
                  className="p-2 border border-gray-300 rounded resize-none"
                />

                <button
                  className="bg-cyan-600 text-white font-semibold py-2 rounded hover:bg-cyan-700 transition"
                  onClick={() => alert("Submit clicked")}
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
