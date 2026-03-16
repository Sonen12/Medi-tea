import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ChatBot from "./components/chatbot/ChatBot";
import TeaMixerFloat from "./components/Game/TeaMixerFloat";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <ChatBot />
      <TeaMixerFloat />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
