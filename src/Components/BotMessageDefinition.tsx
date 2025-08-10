import React from "react";
import { MdInfo } from "react-icons/md";

export default function BotMessageDictionary({ text }) {
  return (
    <div className="flex justify-start max-w-xs break-words shadow-sm">
      <div className="bg-gray-200 text-gray-900 rounded-lg p-3 flex items-start gap-3">
        {/* Icon on the left */}
        <MdInfo size={24} className="text-cyan-600 flex-shrink-0 mt-1" />

        {/* Vertical divider */}
        <div className="border-l border-gray-400 h-6 mt-1" />

        {/* Message text with scroll */}
        <div
          className="whitespace-pre-wrap overflow-y-auto"
          style={{ maxHeight: "150px", minWidth: 0 }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
