const DateFormatter = (motokoTime: number) => {
  // Convert nanoseconds to milliseconds
  let motokoTimeInMilliseconds = motokoTime / 1e6;

  // Create a JavaScript Date object
  let jsDate = new Date(motokoTimeInMilliseconds);

  // Format the date as needed
  return jsDate.toLocaleString();
};

export default DateFormatter;
