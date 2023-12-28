// Function to format a date string
export const formatDateStr = (dateStr) => {
  // Check if the date string is empty or undefined
  if (!dateStr || dateStr.length == 0) {
    // If so, return an empty string
    return "";
  }

  // Assuming the date string has a format of YYYYMMDD
  // Extract the year, month, and day from the date string
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  // Return the formatted date string with the year, month, and day separated by "年", "月", and "日" respectively
  return `${year}年${month}月${day}日`;
};