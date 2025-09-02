
import React from 'react';
import { USER, SUBSCRIPTION, BILLING_HISTORY } from '../constants';
import { View } from '../types';

interface AccountViewProps {
    onNavigate: (view: View) => void;
}

const AccountView: React.FC<AccountViewProps> = ({ onNavigate }) => {

    const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-400 mb-4">{title}</h3>
            {children}
        </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-100">My Account</h2>
        <p className="text-gray-400 mt-2">Manage your subscription and billing details.</p>
      </header>

      <Card title="User Profile">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <p className="text-lg"><span className="font-semibold">Name:</span> {USER.name}</p>
                <p className="text-lg"><span className="font-semibold">Email:</span> {USER.email}</p>
            </div>
            <button 
                onClick={() => alert("Logged out! (This is a demo)")}
                className="mt-4 sm:mt-0 bg-red-600/80 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-500 transition-colors duration-300"
            >
                Log Out
            </button>
        </div>
      </Card>
      
      <Card title="Subscription Status">
        {SUBSCRIPTION.status === 'Unlimited' ? (
            <div>
                <p className="text-2xl font-bold text-lime-400 mb-2">Unlimited Plan</p>
                <p className="text-gray-300">Your subscription is active and will renew on {SUBSCRIPTION.renewalDate}.</p>
            </div>
        ) : (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <p className="text-2xl font-bold text-yellow-400 mb-2">Free Plan</p>
                    <p className="text-gray-300">You are currently on the free plan. Purchase bets individually.</p>
                </div>
                <button 
                    onClick={() => onNavigate(View.SUBSCRIPTION)}
                    className="mt-4 sm:mt-0 bg-lime-600 text-white px-6 py-2 rounded-md font-bold hover:bg-lime-500 transition-colors duration-300 shadow-lg shadow-lime-600/20"
                >
                    Upgrade to Unlimited
                </button>
            </div>
        )}
      </Card>
      
      <Card title="Billing History">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b-2 border-gray-600">
                    <tr>
                        <th className="p-2 text-sm font-semibold text-gray-400">Date</th>
                        <th className="p-2 text-sm font-semibold text-gray-400">Description</th>
                        <th className="p-2 text-sm font-semibold text-gray-400 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {BILLING_HISTORY.map(item => (
                        <tr key={item.id} className="border-b border-gray-700 last:border-0">
                            <td className="p-3">{item.date}</td>
                            <td className="p-3">{item.description}</td>
                            <td className="p-3 font-mono text-right">{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>

    </div>
  );
};

export default AccountView;
