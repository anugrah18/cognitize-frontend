import React from "react";
import { FaYoutube } from "react-icons/fa";

export default function BotMessageYoutubeList({ text, videos = [] }) {
  return (
    <div className="flex justify-start max-w-xs break-words">
      <div className="bg-gray-200 text-gray-900 rounded-lg p-3 flex flex-col gap-4 max-w-full">
        {/* Header with YouTube icon and text */}
        <div className="flex items-center gap-3">
          <FaYoutube size={24} className="text-cyan-600 flex-shrink-0" />
          <div className="whitespace-pre-wrap">{text}</div>
        </div>

        {/* Video list */}
        <div className="grid grid-cols-1 gap-4">
          {videos.map(({ link, thumbnail, title }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 rounded-md overflow-hidden shadow hover:shadow-lg transition flex flex-col max-w-[250px]"
            >
              <img
                src={thumbnail}
                alt={title}
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="p-2 bg-white text-sm font-semibold text-black truncate hover:text-blue-600 hover:underline">
                {title}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
