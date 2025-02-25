

export const mockUser = {
    name: "Demo User",
    email: "demo@bankapp.com",
    accountNumber: "****-****-1234",
  };
  
  export const mockTransactions = [
    { id: "1", description: "Allowance Deposit", amount: 50.0, date: "2025-02-25" },
    { id: "2", description: "Netflix Subscription", amount: -15.99, date: "2025-02-24" },
  ];
  
  export const mockSavingsGoal = {
    target: 1000,
    current: 650,
    name: "New Laptop",
  };
  
  export const mockSubscriptions = [
    { id: "1", name: "Netflix", status: "Current", amount: 15.99, dueDate: "2025-03-01" },
    { id: "2", name: "Spotify", status: "Current", amount: 9.99, dueDate: "2025-03-05" },
    { id: "3", name: "Hulu", status: "Canceled", amount: 11.99, dueDate: null },
  ];
  
  export const mockBills = [
    { id: "1", name: "Electricity", amount: 120.5, dueDate: "2025-03-01" },
    { id: "2", name: "Water", amount: 45.0, dueDate: "2025-03-05" },
    { id: "3", name: "Internet", amount: 60.0, dueDate: "2025-03-10" },
  ];
  
  export const mockMedications = [
      { id: "1", name: "Insulin", price: 65.99, refillDate: "2025-03-01" },
      { id: "2", name: "Albuterol Inhaler", price: 39.99, refillDate: "2025-03-05" },
      { id: "3", name: "Allegra", price: 17.99, refillDate: "2025-03-10" },
    ];
  
    export const mockDebts = [
      {
        id: "1",
        name: "Credit Card",
        total: 5000,
        paid: 1500,
        interestRate: 18.99,
        minimumPayment: 200,
      },
      {
        id: "2",
        name: "Car Loan",
        total: 15000,
        paid: 4000,
        interestRate: 4.5,
        minimumPayment: 350,
      },
    ];
    