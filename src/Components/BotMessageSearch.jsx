import React from "react";
import { MdInfo } from "react-icons/md";
import { FaFilePdf, FaWikipediaW } from "react-icons/fa";

const notFoundMessage = ["I don't know"];

export default function BotMessageSearch({ text, sources = [] }) {
  const cleanedText = text.replace("FINAL ANSWER:", "").trim();

  // Check if cleanedText includes any notFoundMessage string (case-insensitive)
  const hasNotFound = notFoundMessage.some((msg) =>
    cleanedText.toLowerCase().includes(msg.toLowerCase())
  );

  // If found, override sources to empty array as part of UI gaurdrail.
  const displayedSources = hasNotFound ? [] : sources;

  return (
    <div className="flex justify-start max-w-xs break-words">
      <div className="bg-gray-200 text-gray-900 rounded-lg p-3 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          {/* Icon on the left */}
          <MdInfo size={24} className="text-cyan-600 flex-shrink-0 mt-1" />

          {/* Vertical divider */}
          <div className="border-l border-gray-400 h-6 mt-1" />

          {/* Message text without scroll */}
          <div className="whitespace-pre-wrap min-w-0">{cleanedText}</div>
        </div>

        {/* Sources list */}
        {displayedSources.length > 0 && (
          <div className="mt-4 border-t border-gray-300 pt-3 text-sm text-gray-700 flex flex-col gap-2 max-w-xs">
            <b>Source(s):</b>
            {displayedSources.map(({ source, type }, i) => (
              <div key={i} className="flex items-center gap-2">
                {/* Show PDF icon if internal doc */}
                {type === "internal doc" && (
                  <FaFilePdf className="text-cyan-600 flex-shrink-0" />
                )}
                {/* Show Wikipedia icon if wikipedia */}
                {type === "wikipedia" && (
                  <FaWikipediaW className="text-cyan-600 flex-shrink-0" />
                )}
                <span>{source}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
