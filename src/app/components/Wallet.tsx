import { useState } from 'react';


interface Card {
  id: string;
  issuer: string; // e.g., 'Visa', 'Mastercard'
  last4: string;
  balance: number;
  currency: string;
  cashBalance?: number;
}

export default function Wallet()  {
  const [cards, setCards] = useState<Card[]>([
    { id: '1', issuer: 'Visa', last4: '4321', balance: 2450.75, currency: 'USD' },
    { id: '2', issuer: 'Mastercard', last4: '8765', balance: 1750.0, currency: 'USD', cashBalance: 250.0 },
    { id: '3', issuer: 'Amex', last4: '3165', balance: 750.0, currency: 'USD', cashBalance: 130.0 },
  ]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0); // Default to the first card
  const [newCashAmount, setNewCashAmount] = useState('');

  const totalBalance = cards.reduce((sum, card) => sum + card.balance + (card.cashBalance || 0), 0);

  const addCash = (cardId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? { ...card, cashBalance: (card.cashBalance || 0) + Number(newCashAmount) }
          : card
      )
    );
    setNewCashAmount('');
  };

  // Define colors for each card
  const cardColors = ['from-blue-700 to-blue-500', 'from-green-700 to-green-500', 'from-red-700 to-red-500'];

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full mx-auto">
      {/* Total Balance */}
      <div className="mb-8">
        <h1 className="text-5xl text-gray-300  font-bold">Your Wallet</h1>
        <h2 className="text-sm text-gray-300 mt-4 mb-2">Total Available</h2>
        <p className="text-4xl font-bold text-green-600">${totalBalance.toFixed(2)}</p>
      </div>

      {/* Card Headers */}
      <div>
        {cards.map((card, index) =>
          selectedCardIndex !== index ? ( // Only show headers for non-selected cards
            <button
              key={card.id}
              onClick={() => setSelectedCardIndex(index)}
              className={`w-full h-16 bg-gradient-to-br ${
                cardColors[index % cardColors.length]
              } text-white rounded-lg shadow-[-5px_-5px_10px_grey,-5px_-5px_5px_grey] flex items-center justify-between px-6`}
            >
              {/* Header Content */}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{card.issuer}</span>
                <span className="text-sm font-bold text-black">${card.balance.toFixed(2)}</span>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                {card.issuer === 'Visa' ? '💳' : '🏦'}
              </div>
            </button>
          ) : null
        )}
      </div>

      {/* Selected Card */}
    {/* Selected Card */}
{/* Selected Card */}
<div
  className={`relative w-full bg-gradient-to-br ${
    cardColors[selectedCardIndex % cardColors.length]
  } p-4 sm:p-6 rounded-lg shadow-[-5px_-5px_10px_grey,-5px_-5px_5px_grey]`}
>
  {/* Card Header */}
  <div className="flex justify-between items-start mb-4">
    <div>
      <span className="text-sm text-gray-300">{cards[selectedCardIndex].issuer}</span>
      <p className="text-xl text-black font-bold mt-2">
        ${(cards[selectedCardIndex].balance + (cards[selectedCardIndex].cashBalance || 0)).toFixed(2)}
      </p>
    </div>
    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
      {cards[selectedCardIndex].issuer === 'Visa' ? '💳' : '🏦'}
    </div>
  </div>

  {/* Card Details - Always Stacked */}
  <div className="space-y-4">
    <div>
      <span className="text-xs text-gray-300">Card Number</span>
      <p className="text-lg text-black">•••• {cards[selectedCardIndex].last4}</p>
    </div>
    </div>
    </div>

    {/* Send/Request Section */}
    <div className="mt-4 flex flex-col gap-2">
      <input
        type="number"
        value={newCashAmount}
        onChange={(e) => setNewCashAmount(e.target.value)}
        placeholder="Amount"
        className="w-full bg-white/10 rounded-lg px-3 py-2 text-sm"
      />
      <button
        onClick={() => addCash(cards[selectedCardIndex].id)}
        className="w-full text-gray-400 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/30 transition-colors"
      >
        Send/Request
      </button>
    </div>
 

 {/* Add New Card Button */}
 <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-sm mt-4">
        + Add New Card
      </button>
  
</div>
  );
}