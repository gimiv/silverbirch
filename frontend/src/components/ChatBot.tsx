import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        text: "Hi there! 👋 I'm your Scale Health wellness assistant. safely recover from your injury? I can help you find the right specialist or schedule a consultation.",
        sender: 'bot',
        timestamp: new Date()
    }
];

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI delay and response
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateResponse(userMsg.text),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('schedule') || lowerInput.includes('book') || lowerInput.includes('appointment')) {
            return "I'd love to help you get started! You can book a free discovery call using the scheduler on this page. It takes just a few minutes.";
        }
        if (lowerInput.includes('price') || lowerInput.includes('cost')) {
            return "Most of our initial consultations are covered by insurance! During your discovery call, we can verify your coverage and discuss any out-of-pocket costs.";
        }
        if (lowerInput.includes('pain') || lowerInput.includes('back') || lowerInput.includes('neck')) {
            return "I'm sorry to hear you're in pain. Our specialists are experts in musculoskeletal recovery. A quick assessment call would be the best first step to relief.";
        }
        if (lowerInput.includes('offer') || lowerInput.includes('discount')) {
            return "Since you're coming from Dr. Ho, you're eligible for a complimentary wellness partner session! Use the scheduler to claim it.";
        }
        return "That's a great question. Our wellness partners can provide more specific details tailored to your needs. Would you like to schedule a quick chat with one of them?";
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-brand-primary hover:bg-brand-dark'
                    } text-white`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up h-[500px]">
                    {/* Header */}
                    <div className="bg-brand-primary p-4 text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">Scale Assistant</h4>
                            <p className="text-xs text-brand-secondary/80 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Online Now
                            </p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-brand-secondary text-brand-primary'
                                        }`}>
                                        {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                        ? 'bg-brand-primary text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-brand-secondary text-brand-primary flex items-center justify-center">
                                        <Bot size={16} />
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                        <Loader2 size={16} className="animate-spin text-brand-primary" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-sm transition-all text-gray-900 placeholder-gray-500 bg-white"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="p-2 bg-brand-primary text-white rounded-full hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
