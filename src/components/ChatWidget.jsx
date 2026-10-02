"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { processUserMessage } from "@/lib/chatbot";

let messageCounter = 0;
function createMsgId(prefix) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

export default function ChatWidget() {
  const { timetable, rooms, faculty } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "m-init",
      sender: "bot",
      text: "Hello! 👋 I'm your **SmartSchedule Campus Assistant**.\n\nAsk me about upcoming lectures, room telemetry, or faculty schedules.",
      suggestions: [
        "Next Machine Learning lecture in Room 204?",
        "Is Lab-302 free?",
        "Show Dr. Shah's schedule",
        "How many rooms are active?"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Handle sending a message
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: createMsgId("user"),
      sender: "user",
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate thinking delay (~800ms)
    setTimeout(() => {
      const response = processUserMessage(query, {
        timetable,
        rooms,
        faculty
      });

      const botMsg = {
        id: createMsgId("bot"),
        sender: "bot",
        text: response.text,
        link: response.link,
        suggestions: response.suggestions
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to render bold markdown and newlines
  const renderMessageContent = (text) => {
    if (!text) return null;
    const lines = text.split("\n");

    return lines.map((line, lIdx) => {
      // Parse markdown bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lIdx} className="block min-h-[1.25em]">
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("*") && part.endsWith("*")) {
              return (
                <em key={pIdx} className="italic">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <div className="no-print">
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            aria-label="Open SmartSchedule Assistant"
          >
            {/* Subtle pulsing background ring */}
            <span className="absolute -inset-1 rounded-full bg-indigo-500 opacity-30 animate-ping pointer-events-none" />
            <MessageCircle className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 top-20 sm:top-auto sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-96 sm:h-[580px] z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                {/* Online indicator dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-700" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight">
                  SmartSchedule Assistant
                </h4>
                <p className="text-[11px] text-indigo-150 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online &bull; Campus AI
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                      isUser
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none"
                    }`}
                  >
                    {renderMessageContent(msg.text)}

                    {/* Optional embedded link */}
                    {msg.link && (
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <Link
                          href={msg.link}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                        >
                          <span>Open Timetable</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.suggestions.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(chip)}
                          className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200/70 rounded-full shadow-2xs hover:border-indigo-400 transition-colors text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 max-w-[70px] bg-white rounded-2xl rounded-tl-none border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Bar */}
          <div className="px-3 py-1.5 bg-slate-100/90 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-600">
            <span className="shrink-0 font-semibold text-slate-400">Quick:</span>
            <button
              type="button"
              onClick={() => handleSendMessage("When is the next Machine Learning lecture in Room 204?")}
              className="shrink-0 hover:text-indigo-600 hover:underline"
            >
              ML in Rm-204?
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleSendMessage("Is Lab-302 free?")}
              className="shrink-0 hover:text-indigo-600 hover:underline"
            >
              Lab-302 free?
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleSendMessage("Show Dr. Shah's schedule")}
              className="shrink-0 hover:text-indigo-600 hover:underline"
            >
              Dr. Shah schedule
            </button>
          </div>

          {/* Chat Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about rooms, faculty, or classes..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-600/20"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
