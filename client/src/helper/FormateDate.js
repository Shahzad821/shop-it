export const formateDate = (datetime) => {
  const createdAt = new Date(datetime);

  const dateString = createdAt.toLocaleDateString("en-CA"); // 'en-CA' gives "2024-12-23"
  return dateString;
};
export const convertToTargetDateFormat = (inputDate) => {
  // Parse the input ISO date string into a JavaScript Date object
  const originalDate = new Date(inputDate);

  // Adjust the target date to the same year, month, and day as the input date, but set the time to 10:30 AM
  const targetDate = new Date(originalDate);
  targetDate.setHours(10, 30, 0, 0); // Set the time to 10:30 AM

  // Format the target date to the desired format "October 1, 2023, 10:30 AM"
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Return the formatted date
  return targetDate.toLocaleString("en-US", options);
};
