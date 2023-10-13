import React from "react";
import { useState, useEffect } from "react";
import Stock from "./stock";
import { Circle } from "better-react-spinkit";

// Define the Base component
export default function Base() {
  // State variables
  const [data, setData] = useState([]); // Stores the data retrieved from the API
  const [page, setPage] = useState(1); // Current page number
  const [currentData, setCurrentData] = useState([]); // Data for the current page
  const [maxPages, setMaxPages] = useState(0); // Maximum number of pages
  const perPage = 7; // Number of results per page
  const offset = (page - 1) * perPage; // Calculate the offset based on the current page
  const baseUrl =
    "https://f68370a9-1a80-4b78-b83c-8cb61539ecd6.mock.pstmn.io/api/v1/get_market_datas"; // Base URL for the API
  const stock = "AAPL"; // Stock symbol to fetch
  const sort = "ASC"; // Sorting order for the data
  const apiUrl = `${baseUrl}?symbols=${stock}&limit=${perPage}&offset=${offset}&sort=${sort}`; // Complete API URL

  // useEffect to fetch data from the API when the component mounts
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setData(result.data.reverse()); // Reverse the data and store it
        setCurrentData(
          result.data.slice(
            (page - 1) * perPage,
            (page - 1) * perPage + perPage
          )
        ); // Set the current page's data
        setMaxPages(Math.round(result.pagination.total / perPage)); // Calculate the maximum number of pages
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array means this effect runs only once, on component mount

  // useEffect to update currentData when the page changes
  useEffect(() => {
    setCurrentData(
      data.slice((page - 1) * perPage, (page - 1) * perPage + perPage)
    ); // Update the currentData when the page changes
  }, [page]); // This effect depends on the 'page' state variable

  const baseCard = () => (
    <div className="Base">
      <div className="Stock">
        {/* Stock component header */}
        <Stock
          id="stock"
          data={{
            date: "Date",
            open: "Open",
            close: "Close",
            volume: "Volume",
            heading: true,
          }}
        />
        {currentData ? (
          // Map through the currentData and render Stock components
          currentData.map((data, index) => {
            const prevClose =
              index >= 1
                ? currentData[Math.max(index - 1, 0)].close
                : data.open;
            return <Stock key={index} data={data} prevClose={prevClose} />;
          })
        ) : (
          <></>
        )}
      </div>
      <div className="bottom-nav">
        {/* Navigation buttons for moving between pages */}
        <button
          className={page === 1 ? "Button-blocked Button" : "Button"}
          onClick={() => setPage(Math.max(page - 1, 1))}
        >
          Prev
        </button>
        <p>
          Page {page} of {maxPages}
        </p>
        <button
          className={page === maxPages ? "Button-blocked Button" : "Button"}
          onClick={() => setPage(Math.min(maxPages, page + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <>
      {currentData && currentData.length ? (
        baseCard()
      ) : (
        <div className="circleWrapper">
          <Circle color="white" margin="0 auto" size={100} />
        </div>
      )}
    </>
  );
}
