import { useState, useEffect } from "react";

interface CountdownTimerProps {
  dueDate: string | null; // The due date in ISO format
}

export default function CountdownTimer({ dueDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (!dueDate || isNaN(new Date(dueDate).getTime())) {
      setTimeLeft("No Due Date");
      return;
    }

    const calculateTimeLeft = () => {
      const currentDate = new Date();
      const targetDate = new Date(dueDate);
      const timeDiff = targetDate.getTime() - currentDate.getTime();

      if (timeDiff <= 0) {
        setTimeLeft("Past Due");
        return;
      }

      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      if (daysLeft > 7) {
        const weeksLeft = Math.ceil(daysLeft / 7);
        setTimeLeft(`${weeksLeft} week${weeksLeft > 1 ? "s" : ""}`);
      } else {
        setTimeLeft(`${daysLeft} day${daysLeft > 1 ? "s" : ""}`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60 * 1000); // Update every minute

    return () => clearInterval(timer); // Cleanup on unmount
  }, [dueDate]);

  return (
    <p className="text-sm text-blue-500 flex items-center gap-1">
      {timeLeft ? (
        <>
          <span role="img" aria-label="timer">
          ⏱️ Time Left:
          </span>
          {timeLeft}
        </>
      ) : (
        "No Due Date"
      )}
    </p>
  );
}