import React from "react";

// Styles for the heading, positive stock, and negative stock
const headingStyles = {
  fontWeight: "500",
  textAlign: "center",
  color: "rgb(164, 221, 246)",
};
const positiveStockStyles = {
  color: "green",
};
const negativeStockStyles = {
  color: "red",
};

// Define the Stock component
export default function Stock(props) {
  const { data, prevClose } = props;

  // Function to format the date for display
  const getDate = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    return data.heading ? date : newDate;
  };

  // Function to determine the styles for the "Open" stock value
  const getOpenStockStyles = () => {
    if (data.heading || data.open === prevClose) {
      return {}; // Return empty styles if it's a heading or the same as the previous close
    }
    return data.open > prevClose ? positiveStockStyles : negativeStockStyles; // Apply positive or negative styles based on the comparison
  };

  // Function to determine the styles for the "Close" stock value
  const getCloseStockStyles = () => {
    if (data.heading || data.close === data.open) {
      return {}; // Return empty styles if it's a heading or the same as the open value
    }
    return data.close > data.open ? positiveStockStyles : negativeStockStyles; // Apply positive or negative styles based on the comparison
  };

  return (
    <div className="prices" style={data.heading ? headingStyles : {}}>
      <p>{getDate(data.date)}</p>{" "}
      {/* Display the date, formatted based on whether it's a heading */}
      <p style={getOpenStockStyles()}>{data.open}</p>{" "}
      {/* Display the "Open" stock value with appropriate styles */}
      <p style={getCloseStockStyles()}>{data.close}</p>{" "}
      {/* Display the "Close" stock value with appropriate styles */}
    </div>
  );
}
