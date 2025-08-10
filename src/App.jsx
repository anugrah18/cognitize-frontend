import cognitizeLogo from './assets/cognitize-logo.png';
import ChatPane from './Components/ChatPane';
import WelcomeScreen from './Components/WelcomeScreen';
import { useSelector } from 'react-redux';

export default function App() {
  const userName = useSelector((state) => state.chat.userName);

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <header className="h-20 flex justify-center items-center px-10">
        <div className="flex items-center gap-6">
          <img src={cognitizeLogo} alt="Cognitize Logo" className="h-16 w-auto" />
          <h1 className="text-6xl font-normal text-cyan-600 select-none">Cognitize</h1>
        </div>
      </header>

      {userName ? <ChatPane /> : <WelcomeScreen />}
    </div>
  );
}
