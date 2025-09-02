
import React from 'react';
import { CheckIcon } from '../components/icons';

interface SubscriptionPageProps {
  onBack: () => void;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onBack }) => {
    const benefits = [
        "Unlimited daily bets",
        "Early access to AI predictions",
        "Exclusive game analysis from our model",
        "Access to all player props",
        "Priority customer support"
    ];

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 text-blue-400 hover:text-blue-300">
        &larr; Back
      </button>
      <div className="bg-gray-800 border border-lime-500/40 rounded-xl p-8 text-center shadow-2xl shadow-lime-500/10">
        <h2 className="text-4xl font-bold mb-2 text-lime-400">Go Unlimited</h2>
        <p className="text-gray-300 text-lg mb-8">Unlock the full power of our AI and gain your edge.</p>
        
        <div className="text-left my-10 space-y-4">
            {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                    <CheckIcon className="h-6 w-6 text-lime-400 mr-3"/>
                    <span className="text-gray-200">{benefit}</span>
                </div>
            ))}
        </div>

        <div className="mb-4">
            <p className="text-5xl font-bold">$29.99<span className="text-xl font-normal text-gray-400">/month</span></p>
        </div>

        <button className="w-full py-4 rounded-lg font-bold text-lg bg-lime-500 text-gray-900 hover:bg-lime-400 transition-all duration-300 shadow-lg shadow-lime-500/30 transform hover:scale-105">
            Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
