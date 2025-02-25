import { useState } from "react";
import { mockDebts } from "../utils/mockData";

export default function DebtPayoffTool() {
  const [customPayment, setCustomPayment] = useState<number | null>(null);
  const [debts, setDebts] = useState(mockDebts); // Changed to state
  const [selectedDebt, setSelectedDebt] = useState(debts[0]);
  
 // Add new debt handler
 const handleAddDebt = () => {
    const newDebt = {
      id: Date.now().toString(),
      name: "New Debt",
      total: 1000, // Default value
      paid: 0,
      interestRate: 5.0,
      minimumPayment: 25
    };
    
    setDebts(prev => [...prev, newDebt]);
    setSelectedDebt(newDebt); // Auto-select new debt
  };

  const calculateImpact = (paymentAmount: number) => {
    const remainingBalance = selectedDebt.total - selectedDebt.paid;
    const monthlyInterestRate = selectedDebt.interestRate / 100 / 12;

    // Calculate new balance after payment
    const newBalance =
      remainingBalance + remainingBalance * monthlyInterestRate - paymentAmount;

    // Calculate months to pay off with this payment amount
    let monthsToPayOff = 0;
    let currentBalance = newBalance;
    let totalInterestPaid = 0;

    while (currentBalance > 0 && monthsToPayOff < 600) {
      const interest = currentBalance * monthlyInterestRate;
      currentBalance += interest - paymentAmount;
      totalInterestPaid += interest;
      monthsToPayOff++;
    }

    return {
        newBalance: Math.max(0, newBalance).toFixed(2),
      monthsToPayOff,
      totalInterestPaid: totalInterestPaid.toFixed(2),
    };
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPayment(Number(e.target.value));
  };

  const generateCreditImpactMessage = (paymentAmount: number) => {
    if (paymentAmount < selectedDebt.minimumPayment) {
      return `⚠️ Making less than the minimum monthly payment of $${selectedDebt.minimumPayment.toFixed(
        2
      )} may negatively impact your credit score.`;
    } else if (paymentAmount === selectedDebt.minimumPayment) {
      return `✅ Making the minimum monthly payment of $${selectedDebt.minimumPayment.toFixed(
        2
      )} will not hurt your credit score but won't help reduce your debt quickly.`;
    } else if (paymentAmount >= selectedDebt.total - selectedDebt.paid) {
      return `🎉 🎈 Congratulations! 🎈 🎉  Paying off your debt in full will positively impact your credit score and eliminate all future interest payments.`;
    } else {
      return `🎉 Making a payment of $${paymentAmount.toFixed(
        2
      )} (above the minimum) will reduce your debt faster and positively impact your credit score over time.`;
    }
  };

  const impact =
    customPayment && customPayment > 0 ? calculateImpact(customPayment) : null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
 
 {/* Header with Add Button */}
 <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Debt Payoff Tool</h2>
        <button
          onClick={handleAddDebt}
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          + Add
        </button>
      </div>

      {/* Debt Selector */}
      <select
        onChange={(e) =>
          setSelectedDebt(
            debts.find((debt) => debt.id === e.target.value) || debts[0]
          )
        }
        value={selectedDebt?.id}
        className="w-full px-4 py-2 mb-4 border rounded-lg text-black"
      >
        {debts.map((debt) => (
          <option key={debt.id} value={debt.id}>
            {debt.name}
          </option>
        ))}
      </select>

      {/* Debt Details */}
      <p className="text-sm font-bold text-gray-500">
        Total Debt: ${selectedDebt.total.toFixed(2)}
      </p>
      <p className="text-sm text-gray-500">
        Paid Off: ${selectedDebt.paid.toFixed(2)}
      </p>
      <p className="text-sm text-gray-500">
        Remaining Balance: ${(selectedDebt.total - selectedDebt.paid).toFixed(2)}
      </p>
      <p className="text-sm text-gray-500">
        Interest Rate: {selectedDebt.interestRate}%
      </p>
      <p className="text-sm text-red-500">
        Minimum Payment: ${selectedDebt.minimumPayment.toFixed(2)}
      </p>

      {/* Custom Payment Input */}
      <div className="mt-4">
        <label htmlFor="customPayment" className="block text-sm font-medium text-gray-700">
          Enter Payment Amount:
        </label>
        <input
          type="number"
          id="customPayment"
          value={customPayment || ""}
          onChange={handlePaymentChange}
          placeholder={`Minimum: $${selectedDebt.minimumPayment}`}
          className="w-full px-4 py-2 mt-1 border rounded-lg text-black"
        />
      </div>

      {/* Impact Results */}
      {impact && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-green-600">
            New Balance After Payment: ${impact.newBalance}
          </p>
          <p className="text-sm text-blue-600">
            Months to Pay Off: {impact.monthsToPayOff}
          </p>
          <p className="text-sm text-red-600">
            Total Interest Paid: ${impact.totalInterestPaid}
          </p>
        </div>
      )}

      {/* Credit Impact Message */}
      {customPayment && customPayment > 0 && (
        <div className="mt-4 p-4 bg-blue-900 rounded-lg">
          <p>{generateCreditImpactMessage(customPayment)}</p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={() =>
          alert(
            `Make a payment of $${customPayment || selectedDebt.minimumPayment} toward ${
              selectedDebt.name
            }!`
          )
        }
        disabled={!customPayment || customPayment <= 0}
        className={`mt-4 px-4 py-2 w-full text-sm font-medium rounded-lg ${
          customPayment && customPayment > 0
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        } transition-colors`}
      >
        Make a Payment
      </button>
    </div>
  );
}