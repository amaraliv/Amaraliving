import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MessageSquare, X, Send, RotateCcw, Sparkles, User, ChevronRight, GripHorizontal } from 'lucide-react';
import { getBotResponse, WELCOME_MESSAGE, QUICK_ACTIONS } from '../../data/chatbotData';
import radhikkaDp from '../../assets/people/Radhikka_DP.png';

/**
 * Format current timestamp for chat message bubbles (e.g. "10:45 AM")
 */
const getFormattedTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Amara Living Luxury Chatbot Component - Light Mode Aesthetic
 * Features isolated scrolling (no page scroll leakage) & draggable header.
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // Initial state includes welcome message and quick action buttons
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: WELCOME_MESSAGE,
      timestamp: getFormattedTime(),
      showQuickActions: true,
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const dragControls = useDragControls();

  // Auto-scroll to bottom of chat history on new messages or typing state
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input on desktop/tablet when opened
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping, isOpen]);

  // Toggle chat modal
  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (!hasOpened) {
      setHasOpened(true);
    }
  };

  // Process sending a user message
  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text || !text.trim() || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulated bot typing response with 1-second delay
    setTimeout(() => {
      const responseText = getBotResponse(userMessage.text);
      const botReply = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: getFormattedTime(),
        showQuickActions: false,
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle Quick Action chip click
  const handleQuickActionClick = (actionText) => {
    handleSendMessage(actionText);
  };

  // Handle Keydown (Enter to send)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset chat to initial state
  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: WELCOME_MESSAGE,
        timestamp: getFormattedTime(),
        showQuickActions: true,
      },
    ]);
    setIsTyping(false);
  };

  // Stop scroll propagation to background page
  const handleScrollContainerWheel = (e) => {
    e.stopPropagation();
  };

  const handleScrollContainerTouch = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* ─── Light Mode Floating Chat Trigger Button ───
          Positioned directly above the WhatsApp icon (fixed bottom-24 right-6) */}
      <div className="fixed bottom-24 right-6 z-[9999] flex flex-col items-end">
        {/* Tooltip banner when unopened */}
        {!hasOpened && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mb-2.5 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/95 border border-[#C8102E]/40 text-[#2A2A2A] text-[11px] font-medium tracking-wide shadow-lg backdrop-blur-md select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E] animate-pulse" />
            <span>Chat with Anika</span>
          </motion.div>
        )}

        <motion.button
          onClick={handleToggleOpen}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#FFFDF9] via-[#F4F2EC] to-[#EAE4D6] text-[#2A2A2A] border border-[#C8102E]/60 shadow-[0_10px_25px_-5px_rgba(200,16,46,0.35),0_0_20px_rgba(200,16,46,0.2)] transition-all duration-300 group"
          aria-label={isOpen ? 'Close Chatbot' : 'Open Anika Chatbot'}
          aria-expanded={isOpen}
        >
          {/* Subtle animated gold ping ring */}
          <span className="absolute inset-0 rounded-full border border-[#C8102E]/40 animate-ping opacity-30" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-[#2A2A2A]" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageSquare className="w-6 h-6 text-[#C8102E] fill-[#C8102E]/20 group-hover:fill-[#C8102E]/40 transition-colors" />
                {/* Active indicator dot */}
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#C8102E] border-2 border-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ─── Light Mode Glassmorphism Chat Window Modal ───
          Includes drag controls & isolated scroll container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0.05}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={handleScrollContainerWheel}
            onTouchMove={handleScrollContainerTouch}
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-24 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-[9999] w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] max-h-[82vh] flex flex-col rounded-3xl overflow-hidden bg-[#FAF8F5]/95 backdrop-blur-xl border border-[#C8102E]/40 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.18),0_0_35px_rgba(200,16,46,0.15)] font-body text-[#2A2A2A] overscroll-contain"
          >
            {/* Header Bar - Draggable handle */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="relative px-5 py-3.5 bg-gradient-to-r from-[#F4F1EA] via-[#ECE7DC] to-[#F4F1EA] border-b border-[#C8102E]/25 flex items-center justify-between shrink-0 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C8102E]/50 shadow-sm shrink-0">
                  <img src={radhikkaDp} alt="Anika" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <h3
                    className="text-base font-medium tracking-wide text-[#2A2A2A] flex items-center gap-1.5"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    Anika
                    <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
                  </h3>
                  <p className="text-[11px] text-[#666666] tracking-wider uppercase font-medium">
                    Furniture • Granite • Tiles
                  </p>
                </div>
              </div>

              {/* Action Buttons & Drag indicator */}
              <div className="flex items-center gap-1">
                <div title="Drag chat window" className="p-1 text-[#666666]/50 hover:text-[#2A2A2A] cursor-grab">
                  <GripHorizontal className="w-4 h-4" />
                </div>
                <button
                  onClick={handleClearChat}
                  onPointerDown={(e) => e.stopPropagation()}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="p-1.5 rounded-full text-[#666666] hover:text-[#2A2A2A] hover:bg-black/5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleOpen}
                  onPointerDown={(e) => e.stopPropagation()}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-1.5 rounded-full text-[#666666] hover:text-[#2A2A2A] hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body - Isolated Scroll Messages Container */}
            <div
              ref={chatContainerRef}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={handleScrollContainerWheel}
              onTouchMove={handleScrollContainerTouch}
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 bg-[#FAFAF7] scrollbar-thin scrollbar-thumb-[#C8102E]/20"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    {msg.sender === 'user' ? (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border bg-[#2A2A2A] border-[#2A2A2A] text-white">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#C8102E]/40 shadow-xs">
                        <img src={radhikkaDp} alt="Radhikka" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#C8102E] to-[#C8102E] text-white font-medium rounded-tr-none shadow-md'
                          : 'bg-white border border-[#E5E0D5] text-[#2A2A2A] rounded-tl-none shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span
                        className={`block text-[9px] mt-1.5 text-right ${
                          msg.sender === 'user' ? 'text-white/80' : 'text-[#888888]'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </motion.div>

                  {/* Predefined Quick Actions Chips (Shown below bot welcome) */}
                  {msg.showQuickActions && msg.sender === 'bot' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="pl-9 pr-2 pt-1"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-[#666666] mb-2 font-semibold">
                        Suggested Queries:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_ACTIONS.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleQuickActionClick(action)}
                            className="group flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] bg-white hover:bg-[#F4F1EA] border border-[#DDD8CD] hover:border-[#C8102E] text-[#2A2A2A] hover:text-[#C8102E] transition-all duration-200 shadow-sm active:scale-95 font-medium"
                          >
                            <span>{action}</span>
                            <ChevronRight className="w-3 h-3 text-[#C8102E] group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing Indicator dots */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#C8102E]/40">
                    <img src={radhikkaDp} alt="Radhikka" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white border border-[#E5E0D5] px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
                    <span
                      className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#F4F1EA] border-t border-[#C8102E]/20 flex items-center gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about products, granite, tiles, delivery..."
                className="flex-1 bg-white text-[#2A2A2A] text-xs px-4 py-3 rounded-xl border border-[#DDD8CD] focus:border-[#C8102E] focus:outline-none placeholder-[#888888] transition-all shadow-inner"
                aria-label="Type your message"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 rounded-xl bg-[#C8102E] hover:bg-[#C8102E] text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-md flex items-center justify-center shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
