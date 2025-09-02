
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { SparklesIcon } from '../components/icons';

const AIAnalystView: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'model',
            text: "Hello! I'm your AI Betting Analyst. Ask me anything about this week's games, players, or prop bets to get a data-driven edge."
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const getMockResponse = (message: string): string => {
        message = message.toLowerCase();
        if (message.includes("pacheco")) {
            return `Analyzing Isiah Pacheco's rushing prop...\n\n**Key Points:**\n- **Volume:** He has averaged over 20 carries in the last 3 games, indicating he is a focal point of the offense.\n- **Matchup:** The Ravens' run defense, while stout overall, has been susceptible to physical runners, ranking 15th in yards after contact allowed.\n- **Game Script:** The AI projects a close game, which means the Chiefs are unlikely to abandon the run. A positive game script for Kansas City would heavily favor his 'Over'.\n\n**Conclusion:** The 'Over' on his rushing yards prop of 87.5 seems favorable. This is why the model assigns it a high confidence score of 92%.`;
        }
        if (message.includes("safest bet")) {
            return `The AI model identifies **Derrick Henry Over 0.5 Rushing Touchdowns** as one of the highest probability bets this week.\n\n**Reasoning:**\n1. Henry leads the NFL in carries inside the 5-yard line, giving him maximum opportunity.\n2. The Chiefs' goal-line defense has allowed a rushing TD in 4 of their last 5 contests.\n\nThis combination of high usage in scoring situations and a favorable defensive matchup gives it a 95% confidence score. While no bet is a guarantee, the data strongly supports this position.`;
        }
        if (message.includes("mahomes") && message.includes("jackson")) {
            return `Comparing passing yard props for Mahomes and Jackson:\n\n**Patrick Mahomes (Line: 2.5 TDs):**\n- He has a strong history against the Ravens, often finding success through creative plays.\n- The AI gives his 'Over' an 88% confidence score, noting that the Ravens' secondary has shown some vulnerability in recent weeks.\n\n**Lamar Jackson (Line: 65.5 Rush Yds):**\n- His rushing ability is a key part of the Ravens' offense, and he has exceeded this line in 60% of games this season.\n- The Chiefs' defense is primarily geared to stop the pass, which can create running lanes for a mobile QB.\n\n**Verdict:** Both are strong plays, but the AI gives a slight edge to Jackson's rushing prop due to the defensive matchup.`;
        }
        return `I can certainly help with that. To give you the best analysis, could you please ask about a specific player, game, or statistic? For example:\n\n- "Compare passing yard props for Mahomes and Jackson."\n- "What do you think about Travis Kelce's receptions line?"`;
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // In a real app, you would call the Gemini API here.
            // For this demo, we simulate the API call and response.
            await new Promise(resolve => setTimeout(resolve, 1500));
            const aiResponseText = getMockResponse(userMessage.text);
            const modelMessage: ChatMessage = { role: 'model', text: aiResponseText };
            setMessages(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting to my analysis engine. Please try again in a moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const QuickPromptButton: React.FC<{ text: string }> = ({ text }) => (
        <button
          onClick={() => setInput(text)}
          className="px-3 py-1.5 bg-gray-700/60 border border-gray-600 rounded-full text-sm text-gray-300 hover:bg-gray-600/80 hover:border-blue-500 transition-all"
        >
          {text}
        </button>
    );

    const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
        const isModel = message.role === 'model';
        // A simple markdown-to-JSX parser for bold and lists
        const formattedText = message.text.split('\n').map((line, i) => {
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return <li key={i} className="ml-4">{line.substring(2)}</li>;
            }
            const parts = line.split('**');
            return <p key={i}>{parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}</p>;
        });

        return (
            <div className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xl lg:max-w-2xl px-5 py-3 rounded-2xl ${isModel ? 'bg-gray-700/70 rounded-bl-none' : 'bg-blue-600/80 rounded-br-none'}`}>
                    <div className="text-white whitespace-pre-wrap">{formattedText}</div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col h-[75vh] bg-gray-800/60 border border-gray-700 rounded-xl shadow-2xl shadow-black/20">
            <header className="flex items-center p-4 border-b border-gray-700 flex-shrink-0">
                <SparklesIcon className="w-8 h-8 text-yellow-300 mr-3" />
                <div>
                    <h2 className="text-xl font-bold text-blue-400">AI Analyst</h2>
                    <p className="text-sm text-gray-400">Your personal sports betting consultant</p>
                </div>
            </header>
            
            <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                {messages.map((msg, index) => <MessageBubble key={index} message={msg} />)}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xl lg:max-w-2xl px-5 py-3 rounded-2xl bg-gray-700/70 rounded-bl-none">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-700 flex-shrink-0">
                <div className="flex justify-center items-center gap-2 mb-3 flex-wrap">
                    <QuickPromptButton text="What's the safest bet?" />
                    <QuickPromptButton text="Why is the AI high on Pacheco?" />
                    <QuickPromptButton text="Compare Mahomes and Jackson" />
                </div>
                <form onSubmit={handleSendMessage} className="flex space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about a player or prop bet..."
                        className="w-full bg-gray-900/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        disabled={isLoading}
                        aria-label="Chat input"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIAnalystView;
