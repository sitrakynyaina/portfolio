import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, X, Bot, Sparkles, User, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function CareerAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "ai",
      text: "Hello! I am Landry's virtual agent. Feel free to query me about: his experience, skills, or more information.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/career-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP connection to virtual assistant failed.");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.text || "I was unable to retrieve a response. Please try again or query Landry directly.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error("AI twin call failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "Communications node offline. Please ask your questions directly using the Contact form, or email Landry at landrysitrak@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "initial",
        sender: "ai",
        text: "System restarted. Probe me about Landry's architectural strategies, tech stacks, or contact channels.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Widget Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 hover:text-white hover:border-teal-400 hover:bg-slate-800 hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.25)] duration-300 transition-all flex items-center gap-2 font-mono text-xs ${isOpen ? "rotate-90 md:rotate-0" : ""}`}
        aria-label="Toggle Career Assistant Panel"
        id="advisor-float-btn"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden md:inline font-bold tracking-wider">CHAT</span>
      </button>

      {/* Floating Terminal Drawer */}
      {isOpen && (
        <div
          id="advisor-terminal-drawer"
          className="fixed bottom-24 right-6 w-[calc(100vw-48px)] sm:w-[400px] h-[480px] bg-[#090a0f] border border-slate-800/80 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-50 flex flex-col font-mono overflow-hidden animate-fadeIn"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-slate-950/80 border-b border-slate-900">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-300 tracking-wider">AGENT</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                title="Restart Connection"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close terminal"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Console log Viewport */}
          <div className="flex-grow p-5 overflow-y-auto overflow-x-hidden flex flex-col gap-4 text-xs bg-slate-950/50">
            {messages.map((msg) => {
              const isAI = msg.sender === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1.5 max-w-[85%] ${isAI ? "self-start text-left" : "self-end text-right"}`}
                >
                  {/* Sender Metadata */}
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-semibold uppercase tracking-wider justify-start">
                    {isAI ? (
                      <>
                        <Bot className="w-3 h-3 text-teal-500" />
                        <span>Advisor Console</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 text-cyan-500" />
                        <span>Remote Guest</span>
                      </>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  {/* Bubble content */}
                  <div
                    className={`p-3 rounded-xl border leading-relaxed break-words font-sans text-sm ${
                      isAI
                        ? "bg-slate-900/60 border-slate-800/80 text-slate-300"
                        : "bg-teal-500/10 border-teal-500/20 text-teal-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Ingestion Loading Indicator */}
            {isLoading && (
              <div className="self-start text-left max-w-[85%] flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-semibold uppercase tracking-widest">
                  <Bot className="w-3 h-3 text-teal-500 animate-spin" />
                  <span>Processing input matrices...</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/40 text-slate-500 italic font-sans text-xs flex items-center gap-1.5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Terminal Input Command Line */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 p-3 bg-slate-950 border-t border-slate-900"
          >
            <span className="text-teal-500 select-none text-xs font-bold pl-1 font-mono">&gt;</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about stack, architecture, rate..."
              disabled={isLoading}
              className="flex-grow bg-transparent text-slate-200 text-xs focus:outline-none placeholder-slate-650 disabled:opacity-40 font-mono"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-slate-950 disabled:opacity-20 transition-all font-mono"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
