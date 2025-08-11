import BotMessageDefault from "./BotMessageDefault";
import BotMessageDelete from "./BotMessageDelete";
import BotMessageLongInfoScroll from "./BotMessageLongInfoScroll";
import BotMessageMemory from "./BotMessageMemory";
import BotMessageMotivate from "./BotMessageMotivation";
import BotMessagePersonality from "./BotMessagePersonality";
import BotMessageSearch from "./BotMessageSearch";
import BotMessageStandard from "./BotMessageStandard";
import BotMessageUpdate from "./BotMessageUpdate";
import BotMessageYoutubeList from "./BotMessageYoutubeList";

export default function BotMessageContainer({ text, type, sources, videos }) {   
  switch (type) {
    case "search_docs":
      return <BotMessageSearch text={text} sources={sources} />;
    case "get_youtube_videos":
      return <BotMessageYoutubeList text={text} videos={videos} />;
    case "personality":
      return <BotMessagePersonality text={text} />;
    case "summarize_memory":
      return <BotMessageMemory text={text} />;
    case "update_metadata":
      return <BotMessageUpdate text={text} />;
    case "delete_topic":
      return <BotMessageDelete text={text} />;
    case "recommend_topics":
    case "dictionary_lookup":
      return <BotMessageLongInfoScroll text={text} />;
    case "get_motivation":
      return <BotMessageMotivate text={text} />;
    case "bot-standard":
      return <BotMessageStandard text={text} />;
    default:
      return <BotMessageDefault text={text} />;
  }
}
