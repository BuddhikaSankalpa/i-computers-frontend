import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { X, Send, Sparkles } from 'lucide-react';

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    const userMsg = { role: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setPrompt('');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    setMessages(prev => [...prev, { role: 'bot', text: response }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Local keyframes for the reactor-ring spin + glow pulse */}
      <style>{`
        @keyframes qp-spin { to { transform: rotate(360deg); } }
        @keyframes qp-pulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
      `}</style>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full grid place-items-center group"
        >
          {/* rotating gradient ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #00E5FF, #A855F7, #00E5FF)',
              animation: 'qp-spin 4s linear infinite',
            }}
          />
          {/* inner core */}
          <span className="absolute inset-[3px] rounded-full bg-[#050816] group-hover:scale-95 transition-transform" />
          <Sparkles size={22} className="relative text-[#00E5FF]" style={{ filter: 'drop-shadow(0 0 6px #00E5FF)' }} />
          {/* ambient glow */}
          <span className="absolute -inset-2 rounded-full bg-[#00E5FF]/20 blur-xl -z-10" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="w-80 h-[28rem] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, rgba(5,8,22,0.98), rgba(10,6,26,0.98))',
            border: '1px solid transparent',
            backgroundImage:
              'linear-gradient(180deg, rgba(5,8,22,0.98), rgba(10,6,26,0.98)), linear-gradient(135deg, #00E5FF55, #A855F755)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 0 40px -10px #A855F740',
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-[#00E5FF]"
                style={{ boxShadow: '0 0 8px #00E5FF', animation: 'qp-pulse 2s ease-in-out infinite' }}
              />
              <span className="text-[11px] tracking-[0.15em] font-mono text-[#00E5FF]/90 uppercase">
                Quantum_AI :: online
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4">
            {messages.length === 0 && (
              <p className="text-white/30 font-mono text-xs leading-relaxed">
                {'>'} ask about builds, parts, or compatibility
              </p>
            )}
            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="flex justify-end">
                  <span
                    className="max-w-[80%] px-3 py-2 rounded-xl rounded-tr-sm text-[#050816] font-medium"
                    style={{ background: 'linear-gradient(135deg, #00E5FF, #7dd3fc)' }}
                  >
                    {m.text}
                  </span>
                </div>
              ) : (
                <div key={i} className="flex">
                  <div className="max-w-[85%] pl-3 border-l-2 border-[#A855F7]/60">
                    <p className="text-white/90">{m.text}</p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10">
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-full pl-4 pr-1.5 py-1.5 border border-white/10 focus-within:border-[#00E5FF]/50 focus-within:shadow-[0_0_0_3px_rgba(0,229,255,0.1)] transition-all">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
                placeholder="Ask me..."
              />
              <button
                onClick={handleSend}
                disabled={!prompt.trim()}
                className="w-8 h-8 grid place-items-center rounded-full text-[#050816] disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                style={{ background: 'linear-gradient(135deg, #00E5FF, #A855F7)' }}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotWidget;