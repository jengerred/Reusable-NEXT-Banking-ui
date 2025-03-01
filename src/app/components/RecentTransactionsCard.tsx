import { mockTransactions } from "../utils/mockData";

export default function RecentTransactionsCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">💳 Recent Transactions</h2>
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
  )
}