import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Lock, Image as ImageIcon, CheckCheck, MoreVertical, X } from 'lucide-react';
import { providers } from '../data';

type Message = {
  id: string;
  senderId: string; // 'user' or provider id
  text?: string;
  image?: string;
  timestamp: string;
  read?: boolean;
};

export default function MessagesView() {
  const [activeChat, setActiveChat] = useState(providers[0].id);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    [providers[0].id]: [
      { id: '1', senderId: providers[0].id, text: `Hi there! I saw your plumbing request. I can help with that today.`, timestamp: '10:30 AM', read: true },
      { id: '2', senderId: 'user', text: `Great! I have a leaking pipe under the sink.`, timestamp: '10:32 AM', read: true },
    ],
    [providers[1].id]: [
      { id: '3', senderId: providers[1].id, text: `Hello, confirm your address for tomorrow's electrical check?`, timestamp: 'Yesterday', read: true },
    ]
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeProvider = providers.find(p => p.id === activeChat);
  const currentMessages = messages[activeChat] || [];

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages]);

  const handleSend = () => {
    if (!inputText.trim() && !selectedImage) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: inputText.trim() || undefined,
      image: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));

    setInputText('');
    setSelectedImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex h-full w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      
      {/* Sidebar: Chat List */}
      <div className="w-full md:w-[320px] shrink-0 border-r border-slate-200 flex flex-col bg-slate-50/50 hidden md:flex">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-xl font-bold text-slate-900">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto hide-scrollbar p-2 space-y-1">
          {providers.slice(0, 5).map(provider => {
            const isActive = activeChat === provider.id;
            const lastMessage = messages[provider.id]?.[messages[provider.id].length - 1];
            
            return (
              <button
                key={provider.id}
                onClick={() => setActiveChat(provider.id)}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-indigo-50 border border-indigo-100 shadow-sm' 
                    : 'hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                  </div>
                  {provider.availability === 'open' && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className={`text-[15px] truncate ${isActive ? 'font-bold text-indigo-900' : 'font-semibold text-slate-900'}`}>
                      {provider.name}
                    </h4>
                    {lastMessage && (
                      <span className="text-[11px] text-slate-400 shrink-0 ml-2">{lastMessage.timestamp}</span>
                    )}
                  </div>
                  <p className={`text-[13px] truncate ${isActive ? 'text-indigo-600 font-medium' : 'text-slate-500'}`}>
                    {lastMessage ? (lastMessage.image ? '📸 Image attached' : lastMessage.text) : 'Start a conversation'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50 relative">
        {/* Chat Header */}
        {activeProvider && (
          <div className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-sm relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 hidden md:block">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                  <img src={activeProvider.image} alt={activeProvider.name} className="w-full h-full object-cover" />
                </div>
                {activeProvider.availability === 'open' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{activeProvider.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{activeProvider.verified ? 'Verified Professional' : 'Professional'}</p>
              </div>
            </div>
            
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Chat Scroll Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-50/80 border border-amber-200/50 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <p className="text-xs font-medium text-amber-700">Messages are end-to-end encrypted. No one outside of this chat can read them.</p>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {currentMessages.map((msg, idx) => {
              const isUser = msg.senderId === 'user';
              
              return (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1 max-w-[85%] ${isUser ? 'ml-auto' : 'mr-auto'}`}
                >
                  <div className={`relative px-4 py-3 shadow-sm ${
                    isUser 
                      ? 'bg-indigo-600 text-white rounded-[20px] rounded-br-[4px]' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-[20px] rounded-bl-[4px]'
                  }`}>
                    {msg.image && (
                      <div className="mb-2 rounded-xl overflow-hidden max-w-[240px]">
                        <img src={msg.image} alt="Attached" className="w-full h-auto object-cover" />
                      </div>
                    )}
                    {msg.text && (
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="text-[11px] font-medium text-slate-400">{msg.timestamp}</span>
                    {isUser && msg.read && (
                      <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          {/* Image Preview Area */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="relative inline-block"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-black/70 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-3">
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageUpload}
              className="hidden" 
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-12 h-12 shrink-0 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              title="Attach image"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message..."
                className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 transition-all resize-none min-h-[52px] max-h-[120px]"
                rows={1}
                style={{ overflowY: inputText.split('\n').length > 1 ? 'auto' : 'hidden' }}
              />
            </div>

            <button 
              onClick={handleSend}
              disabled={!inputText.trim() && !selectedImage}
              className="w-12 h-12 shrink-0 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center transition-colors shadow-sm"
              title="Send message"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
