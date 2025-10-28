import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getBookings } from '../../services/travelerApi';
import './AIChatbot.css';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m your AI travel assistant. I can help you with booking questions, show your current bookings, and answer travel queries. How can I help you today?'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const userQuery = input.toLowerCase();
        setInput('');
        setLoading(true);

        try {
            // Check if user is asking about their bookings
            if (userQuery.includes('my booking') || userQuery.includes('my reservation') || 
                userQuery.includes('current booking') || userQuery.includes('show booking') ||
                userQuery.includes('what booking') || userQuery.includes('booking status')) {
                
                // Fetch actual bookings
                const bookingsRes = await getBookings();
                if (bookingsRes.data.success && bookingsRes.data.bookings) {
                    const bookings = bookingsRes.data.bookings;
                    
                    if (bookings.length === 0) {
                        setMessages(prev => [...prev, {
                            role: 'assistant',
                            content: 'You don\'t have any bookings yet. Would you like to search for properties to book?'
                        }]);
                    } else {
                        let bookingInfo = `You have ${bookings.length} booking(s):\\n\\n`;
                        bookings.forEach((b, idx) => {
                            bookingInfo += `${idx + 1}. **${b.property_name}**\\n`;
                            bookingInfo += `   📍 ${b.location}\\n`;
                            bookingInfo += `   📅 ${new Date(b.start_date).toLocaleDateString()} - ${new Date(b.end_date).toLocaleDateString()}\\n`;
                            bookingInfo += `   👥 ${b.guests} guest(s)\\n`;
                            bookingInfo += `   💰 $${b.total_price}\\n`;
                            bookingInfo += `   Status: ${b.status.toUpperCase()}\\n\\n`;
                        });
                        bookingInfo += 'You can view more details in the "My Bookings" page.';
                        
                        setMessages(prev => [...prev, {
                            role: 'assistant',
                            content: bookingInfo
                        }]);
                    }
                    setLoading(false);
                    return;
                }
            }

            // Otherwise, use AI endpoint
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await axios.post(
                `${API_URL}/api/traveler/ai-concierge`,
                { message: userQuery },
                { withCredentials: true }
            );

            const assistantMessage = {
                role: 'assistant',
                content: response.data.response || 'I apologize, I couldn\'t process that request.'
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('AI chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, I\'m having trouble connecting right now. Please try again later.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickQuestions = [
        'Show my bookings',
        'How do I book a property?',
        'Can I modify my booking dates?',
        'How do I contact the host?'
    ];

    const handleQuickQuestion = (question) => {
        setInput(question);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className={`ai-chat-button ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="AI Assistant"
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <div className="d-flex align-items-center">
                            <div className="ai-avatar">🤖</div>
                            <div>
                                <h6 className="mb-0">AI Travel Assistant</h6>
                                <small className="text-muted">Always here to help</small>
                            </div>
                        </div>
                        <button
                            className="btn-close btn-close-white"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
                            >
                                {msg.role === 'assistant' && <div className="message-avatar">🤖</div>}
                                <div className="message-content">
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message assistant-message">
                                <div className="message-avatar">🤖</div>
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length === 1 && (
                        <div className="quick-questions">
                            <small className="text-muted">Quick questions:</small>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                {quickQuestions.map((q, idx) => (
                                    <button
                                        key={idx}
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleQuickQuestion(q)}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="ai-chat-input">
                        <textarea
                            className="form-control"
                            placeholder="Ask me anything about your travel plans..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows="2"
                            disabled={loading}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                        >
                            {loading ? '...' : '➤'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatbot;