import React from "react";
import { FaCloudUploadAlt  } from "react-icons/fa";

export default function BotMessageUpdate({text}) {
  return(
    <div className="flex justify-start max-w-xs break-words">
      <div className="bg-gray-200 text-gray-900 rounded-lg p-3 flex items-center gap-3">
        {/* Icon on the left */}
        <FaCloudUploadAlt size={24} className="text-cyan-600 flex-shrink-0" />

        {/* Vertical divider */}
        <div className="border-l border-gray-400 h-6" />

        {/* Message text */}
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  );
}
