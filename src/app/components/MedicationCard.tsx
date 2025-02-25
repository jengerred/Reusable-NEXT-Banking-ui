import { mockMedications } from "../utils/mockData";
import { formatDateDynamic } from "../utils/dateUtils";
import CountdownTimer from "./CountdownTimer";
import { useState } from "react";


export default function MedicationCard() {

    const [medications, setMedications] = useState(mockMedications);

    const handleAddMedication = () => {
      const newMedication = { // Fixed variable name
        id: Date.now().toString(),
        name: "New Medication",
        price: 19.99,
        refillDate: "2025-03-15",
      };
      setMedications((prev) => [...prev, newMedication]);
    };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-800"> 💊  Medications</h2>
        {/* Add New Subscription Button */}
        <button
            onClick={handleAddMedication}
            className="mt-4 px-4 py-2 w-50 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        + Add 
        </button>
      </div>
        <hr/>
      <ul className="space-y-4 mt-4">
      {medications.map((medication) => (
          <li
            key={medication.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 last:border-none"
          >
            <div>
                <>
              <p className="font-medium text-gray-800">{medication.name}</p>
              <p className="text-sm font-bold text-red-500">
                Refill Date: {formatDateDynamic(medication.refillDate)}
              </p>
              <CountdownTimer dueDate={medication.refillDate} />
              </>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-green-600">
                ${medication.price.toFixed(2)}
              </p>
              <button
                onClick={() => alert(`Refill ${medication.name} medication!`)}
                className="mt-2 px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-50">
                Refill
              </button>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
}