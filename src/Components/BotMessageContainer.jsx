import BotMessageDefault from "./BotMessageDefault";
import BotMessageDictionary from "./BotMessageDefinition";
import BotMessageMemory from "./BotMessageMemory";
import BotMessagePersonality from "./BotMessagePersonality";
import BotMessageStandard from "./BotMessageStandard";

export default function BotMessageContainer({ text, type }) {  
  switch (type) {
    case "personality":
      return <BotMessagePersonality text={text} />;
    case "summarize_memory":
      return <BotMessageMemory text={text} />;
    case "dictionary_lookup":
      return <BotMessageDictionary text={text} />;
    case "bot-standard":
      return <BotMessageStandard text={text} />;
    default:
      return <BotMessageDefault text={text} />;
  }
}
