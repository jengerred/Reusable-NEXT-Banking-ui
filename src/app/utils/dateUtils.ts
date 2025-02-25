export function formatDateDynamic(dateStr: string): string {
    if (!dateStr) return "Invalid Date";
  
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return "Invalid Date"; // Handle invalid dates
  
    const day = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const month = dateObj.toLocaleDateString("en-US", { month: "long" });
    const date = dateObj.getDate();
  
    // Add ordinal suffix to the date
    const ordinalSuffix = (n: number) => {
      if (n > 3 && n < 21) return "th"; // Covers 4th-20th
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
  
    return `${day}, ${month} ${date}${ordinalSuffix(date)}`;
  }
  