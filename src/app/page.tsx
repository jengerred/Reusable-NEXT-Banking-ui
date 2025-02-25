"use client";
import { useState } from 'react';
import { mockUser, mockTransactions } from "./utils/mockData";
import dynamic from "next/dynamic";
import SubscriptionCard from './components/SubscriptionCard';
import UpcomingBills from "./components/UpcomingBills";
import MedicationCard from "./components/MedicationCard";
import DebtPayoffTool from "./components/DebtPayoffTool";
import SavingsGoalCard from "./components//SavingsGoalCard";
import Wallet from "./components/Wallet";

const SpendingChart = dynamic(() => import("./components/SpendingChart"), { ssr: false });

interface DashboardProps {
  user?: { name: string; email?: string };
}

export default function Dashboard({ user = mockUser }: DashboardProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cards = [
    { title: "Upcoming Bills", emoji: "📅", component: <UpcomingBills /> },
    { title: "Subscriptions", emoji: "🔄", component: <SubscriptionCard /> },
    { title: "Medications", emoji: "💊", component: <MedicationCard /> },
    { title: "Debt Payoff", emoji: "💸", component: <DebtPayoffTool /> },
    { title: "Savings Goal", emoji: "🎯", component: <SavingsGoalCard /> },
    { title: "Spending Trends", emoji: "📊", component: (
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Spending Trends</h2>
        <SpendingChart />
      </div>
    ) },
    // New Recent Transactions card
    { title: "Recent Transactions", emoji: "💳", component: <RecentTransactionsCard /> },
  ];

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-gray-900 to-blue-900 text-white p-6 w-screen space-y-8">
     <h1 className="text-left sm:text-left text-4xl font-bold text-gray-200 mb-8">
        NextBanking 
      </h1>
      <h2 className="text-sm text-gray-300 mt-4 mb-2">{user.name}'s dashboard</h2>
    

      {/* First Row: Only Wallet remains */}
      <div className="flex justify-center items-start"> {/* Changed to flex container */}
      <div className="w-full lg:max-w-2xl"> 
        <Wallet />
      </div>
      </div>

      {/* Second Row: All interactive cards including new Recent Transactions */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-6 justify-center">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() => setActiveCard(activeCard === card.title ? null : card.title)}
              className={`w-40 h-40 rounded-full bg-black text-white hover:bg-gray-800 transition-colors text-lg font-medium flex flex-col items-center justify-center p-4 ${
                activeCard === card.title ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              <span className="text-3xl mb-2">{card.emoji}</span>
              <span className="text-sm text-center leading-tight">{card.title}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="w-full max-w-2xl">
            {activeCard && cards.find(card => card.title === activeCard)?.component}
          </div>
        </div>
      </div>

      <footer className="mt-auto text-center text-sm text-gray-400 pt-12">
        <p>© {new Date().getFullYear()} SecureBank. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Use</a>
          <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

// New standalone Recent Transactions component
function RecentTransactionsCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Transactions</h2>
      <ul className="space-y-3">
        {mockTransactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center border-b pb-2 last:border-none"
          >
            <div>
              <p className="font-medium text-gray-800">{transaction.description}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <span className={`text-lg font-semibold ${
              transaction.amount > 0 ? "text-green-600" : "text-red-600"
            }`}>
              {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}