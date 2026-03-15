import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; // Đừng quên: npm install axios
import "./ChatBot.css";

const defaultSuggestions = ["Trà xanh giảm cân", "Trà đen pha sữa", "Trà thảo mộc ngủ ngon", "Combo quà Tết", "Cách pha trà chuẩn"];

// ⚠️ QUAN TRỌNG: THAY BẰNG API KEY THỰC TẾ CỦA BẠN ⚠️
const GEMINI_API_KEY = "AIzaSyBY1KU9Th5R3CgAFDytvrKrCM6pky8jZOA";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  // Bỏ currentTopic vì AI sẽ tự quản lý context
  const messagesEndRef = useRef(null);

  const toggleOpen = () => {
    if (!open) {
      setOpen(true);
      setShowWelcome(true);
      setMessages([]);
      setInput("");
    } else {
      setOpen(false);
    }
  };

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { if (open) scrollToBottom(); }, [messages, open, isTyping]);

  // ====================== HÀM GỌI GEMINI API ======================
  const fetchAIResponse = async (userText, currentMessages) => {
    // 1. Chuẩn bị lịch sử trò chuyện (Chuyển format của bạn sang format của Gemini)
    // Cắt bớt lịch sử, giữ lại khoảng 6 tin nhắn gần nhất để tránh gửi dữ liệu quá dài
    const recentMessages = currentMessages.slice(-6); 
    const history = recentMessages.map(msg => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // 2. Định hình nhân vật (System Prompt) - ĐÂY LÀ LINH HỒN CỦA BOT
    const systemInstruction = `
      Bạn là trợ lý ảo chăm sóc khách hàng độc quyền của thương hiệu trà bảo vệ sức khỏe Medi-Tea. 
      Quy tắc bắt buộc:
      1. Luôn luôn xưng hô là "Medi-Tea". Tuyệt đối không xưng là "tôi", "mình", "AI", hay "trợ lý ảo".
      2. Luôn gọi khách hàng là "${userName}" (nếu có) hoặc "bạn".
      3. Trả lời ngắn gọn, thân thiện, lịch sự và luôn có biểu tượng cảm xúc (emoji) phù hợp.
      4. Về kiến thức trà: Medi-Tea chuyên cung cấp Trà Xanh (giảm cân, thanh lọc), Trà Đen (tỉnh táo, pha trà sữa), Trà Thảo Mộc (ngủ ngon, không caffeine), và các Combo Quà Tết. Giá tham khảo từ 199.000đ - 399.000đ.
      5. Xử lý câu hỏi ngoài luồng (thời tiết, code, chính trị...): Trả lời cực kỳ ngắn gọn (1 câu), tỏ thái độ vui vẻ, sau đó BẮT BUỘC phải khéo léo bẻ lái, dẫn dắt câu chuyện quay về việc giới thiệu hoặc tư vấn các sản phẩm trà của Medi-Tea.
    `;

    // 3. Đóng gói dữ liệu gửi đi
    const requestBody = {
      system_instruction: { parts: { text: systemInstruction } },
      contents: [...history, { role: "user", parts: [{ text: userText }] }]
    };

    // 4. Gửi Request tới Google
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      // Trích xuất câu trả lời từ Response
      const aiText = response.data.candidates[0].content.parts[0].text;
      return aiText;
    } catch (error) {
      console.error("Lỗi gọi Gemini API:", error);
      return `Dạ, hệ thống của Medi-Tea đang bận một chút để ủ trà. ${userName || "Bạn"} vui lòng thử lại sau vài giây nhé! 🍵`;
    }
  };

  const handleStartChat = () => {
    const name = input.trim();
    if (!name) return;
    setUserName(name);
    setShowWelcome(false);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages([{
        sender: "bot",
        text: `Chào ${name}! Medi-Tea rất vui được hỗ trợ bạn hôm nay 🍵 Bạn muốn tìm hiểu về dòng trà nào ạ?`,
        suggestions: defaultSuggestions
      }]);
      setIsTyping(false);
    }, 600);
  };

  const handleSend = async (quickText) => {
    // Lấy text từ button gợi ý hoặc ô input
    const msgText = typeof quickText === "string" ? quickText.trim() : input.trim();
    if (!msgText) return;

    // Hiển thị tin nhắn của user ngay lập tức
    const newMessages = [...messages, { sender: "user", text: msgText }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Gọi API của Gemini
    const aiReplyText = await fetchAIResponse(msgText, messages);

    // Hiển thị tin nhắn trả về của Bot
    setMessages(prev => [...prev, { 
        sender: "bot", 
        text: aiReplyText, 
        // Vẫn giữ lại gợi ý để người dùng dễ thao tác
        suggestions: defaultSuggestions 
    }]);
    setIsTyping(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showWelcome) handleStartChat();
      else handleSend();
    }
  };

  return (
    <>
      <div className="chatbot-fab-wrapper">
        {!open && (
          <div className="chatbot-speech-bubble">
            <span className="chatbot-speech-text">Xin chào, tôi có thể giúp gì được cho bạn ạ 🍵</span>
          </div>
        )}
        <div className={`chatbot-fab ${open ? "is-open" : ""}`} onClick={toggleOpen}>
          {open ? "✕" : <img src="/images/linhvat.png" alt="Medi-Tea" className="chatbot-fab-img" />}
        </div>
      </div>

      <div className={`chatbot-window ${open ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-header-avatar"><img src="/images/linhvat.png" alt="Medi-Tea" className="chatbot-avatar-img" /></div>
            <div className="chatbot-header-text">
              <strong>Medi-Tea Bot</strong>
              <span>Trợ lý trà</span>
            </div>
          </div>
          <button className="chatbot-close" onClick={toggleOpen}>✕</button>
        </div>

        {showWelcome && (
          <div className="welcome-screen">
            <div className="welcome-avatar"><img src="/images/linhvat.png" alt="Medi-Tea" className="welcome-avatar-img" /></div>
            <div className="welcome-text">Vui lòng nhập tên của bạn</div>
            <input
              type="text"
              className="welcome-input"
              placeholder="Nhập tên của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="welcome-btn" onClick={handleStartChat} disabled={!input.trim()}>
              BẮT ĐẦU
            </button>
          </div>
        )}

        {!showWelcome && (
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                <div className="chat-bubble">{msg.text}</div>
                {msg.sender === "bot" && msg.suggestions && (
                  <div className="quick-replies">
                    {msg.suggestions.map((s, i) => (
                      <button key={i} className="quick-btn" onClick={() => handleSend(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg bot">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {!showWelcome && (
          <div className="chatbot-input">
            <div className="chatbot-input-wrap">
              <input
                type="text"
                placeholder="Nhập câu hỏi về trà..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
            </div>
            <button className="chatbot-send" onClick={() => handleSend()} disabled={!input.trim()}>
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;