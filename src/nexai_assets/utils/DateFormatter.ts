const DateFormatter = (motokoTime: number) => {
  // Convert nanoseconds to milliseconds
  let motokoTimeInMilliseconds = motokoTime / 1e6;

  // Create a JavaScript Date object
  let jsDate = new Date(motokoTimeInMilliseconds);

  // Format the date as needed
  return jsDate.toLocaleString();
};

export default DateFormatter;

export const loadingMessages: string[] = [
  "Gathering answers from docs",
  "Collating responses",
  "Analyzing data",
  "Fetching relevant information",
  "Processing your request",
  "Consulting knowledge base",
  "Retrieving data from servers",
  "Interpreting your query",
  "Compiling responses",
  "Verifying information",
  "Connecting to data sources",
  "Sorting through data",
  "Assessing relevant documents",
  "Summarizing information",
  "Looking up details",
  "Performing analysis",
  "Sifting through knowledge base",
  "Fetching AI insights",
  "Generating response",
  "Finalizing answer",
];
