/**
 * Gets all the dates from Monday to Sunday of the week given an ISO date string.
 * @param {string} currentWeekISO - The ISO format date string for the start of the week (Monday).
 * @returns {string[]} - An array of ISO date strings for the week.
 */

export function getWeekDates(currentWeekISO: string) {
  const startDate = new Date(currentWeekISO); // Create a Date object from the input ISO string
  const weekDates = [];

  // Loop from Monday (0) to Sunday (6)
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i); // Add i days to the start date
    weekDates.push(date.toISOString().split("T")[0]); // Push the date in ISO format (YYYY-MM-DD)
  }

  return weekDates;
}
