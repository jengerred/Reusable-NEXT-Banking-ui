import { useState } from "react";
import { mockBills } from "../utils/mockData";
import CountdownTimer from "./CountdownTimer";
import { formatDateDynamic } from "../utils/dateUtils";



// Define the Bill type
interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string | null; // Allow null for canceled bills
}



export default function UpcomingBills() {
  const [bills, setBills] = useState<Bill[]>(mockBills);

  // Handle adding a new bill
  const handleAddBill = () => {
    setBills((prev) => [
      ...prev,
      { 
        id: Date.now().toString(),
        name: "New Bill",
        amount: 50.0,
        dueDate: new Date().toISOString()
      }
    ]);
  };
  

  const handlePayNow = (id: string) => {
    alert(`Bill with ID ${id} has been paid.`);
    // Add payment logic here (e.g., API call)
  };

  // Handle deleting a bill
  const handleDeleteBill = (id: string) => {
    setBills((prev) => prev.filter((bill) => bill.id !== id));
  };

  // Handle editing a bill
  const handleEditBill = (id: string, updatedBill: Partial<Omit<Bill, "id">>) => {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === id ? { ...bill, ...updatedBill } : bill
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
     
     <div className="flex justify-between items-center mb-4">
     <h2 className="text-lg font-semibold text-gray-800"> ⚠️  Upcoming Bills</h2>
      
       {/* Add Bill Button */}
      <button
        onClick={handleAddBill}
        className="mt-2 px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-50">
        + Add 
      </button>
      </div>
     <hr/>
      <ul className="space-y-4 mt-4">
        {bills.map((bill) => (
          <li
            key={bill.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 last:border-none"
          >
            <div>
              <p className="font-medium text-gray-800">{bill.name}</p>
              <p className="text-sm font-bold text-red-500">
  Due Date: {bill.dueDate ? formatDateDynamic(bill.dueDate) : "No due date set"}
</p>
              
              {/* Countdown Timer */}
              <CountdownTimer dueDate={bill.dueDate} />
            
                 {/* Delete and Edit Buttons */}
                 <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleDeleteBill(bill.id)}
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    handleEditBill(bill.id, { name: "Updated Bill", amount: 100.0 })
                  }
                  className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>

       {/* Buttons Section */}
      
       <div className="flex flex-col items-center">
       <p className="text-lg font-semibold text-green-600">${bill.amount.toFixed(2)}</p>
  
              {/* Pay Now Button */}
              <button
                onClick={() => handlePayNow(bill.id)}
                className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Pay Now
              </button>

           
            </div>
          </li>
        ))}
      </ul>

     
    </div>
  );
}