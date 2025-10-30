import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getBookings } from '../../services/travelerApi';
import './AIChatbot.css';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! I\'m your AI Travel Concierge. I can help you with:\n\n• Day-by-day trip itineraries\n• Restaurant recommendations (dietary filters available)\n• Activity suggestions and points of interest\n• Packing lists\n• Your current bookings\n\nJust tell me your plans! Example: "Plan a 3-day trip to San Francisco, vegan, 2 kids"'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationContext, setConversationContext] = useState({});
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
                    // Filter only ACCEPTED bookings
                    const acceptedBookings = bookingsRes.data.bookings.filter(b => b.status === 'accepted');
                    
                    if (acceptedBookings.length === 0) {
                        setMessages(prev => [...prev, {
                            role: 'assistant',
                            content: 'You don\'t have any accepted bookings yet. Would you like to search for properties to book?'
                        }]);
                    } else {
                        let bookingInfo = `You have ${acceptedBookings.length} accepted booking(s):\\n\\n`;
                        acceptedBookings.forEach((b, idx) => {
                            bookingInfo += `${idx + 1}. ${b.property_name}\\n`;
                            bookingInfo += `   Location: ${b.location}\\n`;
                            bookingInfo += `   Dates: ${new Date(b.start_date).toLocaleDateString()} - ${new Date(b.end_date).toLocaleDateString()}\\n`;
                            bookingInfo += `   Guests: ${b.guests}\\n`;
                            bookingInfo += `   Total: $${b.total_price}\\n\\n`;
                        });
                        bookingInfo += 'Would you like me to plan an itinerary for any of these trips?';
                        
                        // Store ACCEPTED bookings in context for future reference
                        setConversationContext({
                            ...conversationContext,
                            lastBookings: acceptedBookings,
                            lastAction: 'show_bookings'
                        });
                        
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
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
            
            // Try to extract location and dates from the message for better context
            const messageText = input.trim();
            const booking_context = {};
            
            // Check if user is referring to their recent booking
            if ((userQuery.includes('my booking') || userQuery.includes('that place') || 
                 userQuery.includes('there') || userQuery.includes('same place') ||
                 userQuery.includes('recent booking') || userQuery.includes('my reservation') ||
                 (userQuery.includes('based on') && conversationContext.lastBookings)) && 
                conversationContext.lastBookings && conversationContext.lastBookings.length > 0) {
                // Use the most recent booking location
                const recentBooking = conversationContext.lastBookings[0];
                booking_context.location = recentBooking.location;
                booking_context.start_date = recentBooking.start_date;
                booking_context.end_date = recentBooking.end_date;
            } else {
                // Extract location if mentioned (more flexible patterns)
                const locationMatch = messageText.match(/(?:to|in|for)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
                if (locationMatch) {
                    booking_context.location = locationMatch[1];
                }
                
                // If user just mentioned a city name after showing bookings, use it
                if (!booking_context.location && conversationContext.lastBookings) {
                    const cityMatch = messageText.match(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/);
                    if (cityMatch) {
                        booking_context.location = cityMatch[1];
                    }
                }
            }
            
            const response = await axios.post(
                `${API_URL}/api/traveler/ai-concierge`,
                { 
                    message: messageText,
                    booking_context: Object.keys(booking_context).length > 0 ? booking_context : undefined,
                    conversation_history: messages.slice(-4).map(m => ({ role: m.role, content: m.content }))
                },
                { withCredentials: true }
            );

            const assistantMessage = {
                role: 'assistant',
                content: response.data.response || 'I apologize, I couldn\'t process that request.'
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('AI chat error:', error);
            console.error('Error details:', error.response?.data || error.message);
            const errorMessage = {
                role: 'assistant',
                content: error.response?.data?.message || 'Sorry, I\'m having trouble connecting right now. Please try again later.'
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
        'Plan a 3-day trip to San Francisco, vegan, 2 kids',
        'Find vegan restaurants in Los Angeles',
        'What should I pack for a beach vacation?'
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
                {isOpen ? '×' : 'Chat'}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <div className="d-flex align-items-center">
                            <div className="ai-avatar">AI</div>
                            <div>
                                <h6 className="mb-0">Travel Assistant</h6>
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
                                {msg.role === 'assistant' && <div className="message-avatar">AI</div>}
                                <div className="message-content">
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message assistant-message">
                                <div className="message-avatar">AI</div>
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
                            {loading ? '...' : 'Send'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatbot;
