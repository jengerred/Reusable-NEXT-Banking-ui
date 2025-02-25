import { mockSavingsGoal } from "../utils/mockData";

export default function SavingsGoalCard() {
 const progress = (mockSavingsGoal.current / mockSavingsGoal.target) * 100;

 return (
    <>
 {/* Savings Goal Card */}
 <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-center mb-4">
     <h2 className="text-lg font-semibold text-gray-800">🐷💰 Savings Goal</h2>
 
                 <button
                    onClick={() => alert("Add Savings Goal functionality coming soon!")}
                    className="mt-2 px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-50">
                                    + Add 
                </button>
            </div>
            <hr/>

        <p className="mt-4 text-lg font-semibold text-blue-600">{mockSavingsGoal.name}: ${mockSavingsGoal.target.toFixed(2)}</p>

    {/* Goal Details */}
        <div className="mt-4 space-y-2">
            <p className="text-sm text-green-600">
            <strong>🏆 Achieved:</strong> ${mockSavingsGoal.current.toFixed(2)}
            </p>

       {/* Progress Bar */}
            <div className="relative w-full bg-gray-200 rounded-full h-8 mt-4">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    style={{ width: `${progress}%` }}> 
                </div>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                    {progress.toFixed(0)}%
                </span>
            </div>
        </div>
            <p className="text-sm text-red-600 text-right ml-auto pt-2">
            <strong>Remaining:</strong> ${(mockSavingsGoal.target - mockSavingsGoal.current).toFixed(2)}
            </p>
                             
           
        </div>
        </>
 );
 }