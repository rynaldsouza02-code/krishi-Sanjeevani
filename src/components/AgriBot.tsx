"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Globe, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  recommendedActions?: string[];
}

interface AgriBotProps {
  language: "en" | "kn";
}

export const AgriBot: React.FC<AgriBotProps> = ({ language }) => {
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [userApiKey, setUserApiKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("agri-gemini-key");
    if (savedKey) setUserApiKey(savedKey);
  }, []);

  const handleSaveApiKey = (key: string) => {
    setUserApiKey(key);
    localStorage.setItem("agri-gemini-key", key);
  };

  const quickPrompts = language === "kn" ? [
    "ಅಡಿಕೆ ಕೊಳೆ ರೋಗ (ಮಹಳಿ) ಔಷಧ ಏನು?",
    "ರಾಗಿ ಬೆಂಕಿ ರೋಗ ತಡೆಗಟ್ಟುವುದು ಹೇಗೆ?",
    "ಕೃಷಿ ಭಾಗ್ಯ 90% ಸಬ್ಸಿಡಿ ಅರ್ಜಿ ಹೇಗೆ?",
    "ಮಣ್ಣಿನ NPK ಮತ್ತು pH ಪರೀಕ್ಷೆ ಉಚಿತವೇ?",
    "ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ಬೆಳೆ ಮಾರುಕಟ್ಟೆ ದರ"
  ] : [
    "Arecanut Fruit Rot (Koleroga) spray?",
    "Ragi Blast Disease resistant seeds?",
    "Krishi Bhagya Drip Irrigation 90% Subsidy?",
    "Ideal soil NPK & pH for Paddy?",
    "Today's APMC Mandi rates in Karnataka"
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: language === "kn"
        ? "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ AI ಸಹಾಯಕ (Google Gemini AI). ಬೆಳೆ ಶಿಫಾರಸು, ಎಲೆ ರೋಗ, ಮಣ್ಣಿನ ಸಾರಜನಕ (NPK) ಮತ್ತು ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಯಾವುದನ್ನಾದರೂ ಉಚಿತವಾಗಿ ಕೇಳಿ!"
        : "Greetings! I am AgriBot powered by Google Gemini AI. Ask me anything about crop leaf diseases, Karnataka soil NPK health, organic remedies, or government schemes in English or Kannada (ಕನ್ನಡ)!",
      timestamp: new Date().toLocaleTimeString(),
      recommendedActions: quickPrompts
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputMsg;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/agribot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: textToSend, 
          language,
          customApiKey: userApiKey
        })
      });
      const data = await res.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString(),
        recommendedActions: data.recommendedActions
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-agri-600" />
            <span>AgriBot AI Conversational Advisory</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
            24/7 AI Agri Assistant supporting English and Kannada (ಕನ್ನಡ).
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold">
          🤖 Gemini LLM Knowledge Engine
        </span>
      </div>

      {/* Chat Interface Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-[75vh] sm:h-[580px] max-h-[580px] overflow-hidden">
        
        {/* Top Chat Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md overflow-hidden p-0.5">
              <img src="/logo.png" alt="AgriBot Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white block">AgriBot Assistant</span>
              <span className="text-[10px] text-agri-700 dark:text-agri-400 font-bold">Online • Ready for queries</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="password"
              placeholder="Gemini API Key (Optional)..."
              value={userApiKey}
              onChange={(e) => handleSaveApiKey(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-agri-500 w-44"
            />
            <div className="text-xs text-slate-600 dark:text-slate-300 font-bold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "kn" ? "ಕನ್ನಡ" : "English"}</span>
            </div>
          </div>

        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "bot" && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden p-0.5 shadow-sm">
                  <img src="/logo.png" alt="AgriBot Logo" className="w-full h-full object-cover rounded-md" />
                </div>
              )}

              <div className={`max-w-[80%] space-y-2 ${m.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-agri-600 text-white font-semibold rounded-tr-none shadow-md shadow-agri-600/10"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium rounded-tl-none shadow-sm"
                }`}>
                  {m.text}
                </div>

                {/* Suggested Follow-up Action Chips */}
                {m.recommendedActions && m.recommendedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.recommendedActions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(act)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-agri-800 dark:text-agri-300 border border-emerald-300 dark:border-emerald-700 font-semibold transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <span>{act}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block px-1">{m.timestamp}</span>
              </div>

              {m.sender === "user" && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-emerald-700 dark:text-emerald-400 animate-pulse" />
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-agri-600 animate-ping"></span>
                <span>AgriBot is typing response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
          <input
            type="text"
            placeholder={language === "kn" ? "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ..." : "Ask your agricultural question here..."}
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:border-agri-500 placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-agri-600/20"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>

      </div>

    </div>
  );
};
