function daysAndMonthsSinceTimestamp(timestamp) {
  // Create a Date object from the timestamp string
  const timestampDate = new Date(timestamp);

  // Get today's date
  const today = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = today.getTime() - timestampDate.getTime();

  // Calculate days
  const daysSpent = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  // Calculate months (consider incomplete months as 1 month)
  const monthsSpent = Math.floor(daysSpent / 30) + (daysSpent % 30 > 0 ? 1 : 0);

  // Return an object with days and months
  return daysSpent > 365 ? Math.round(daysSpent / 365) + ' years agp' : (daysSpent > 30 ? monthsSpent + ' months ago' : daysSpent + ' days ago')
}

console.log(daysAndMonthsSinceTimestamp('2024-07-01 22:44:18'))