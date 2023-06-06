import React from 'react';

import { CSVLink } from "react-csv";

const data = [
  { name: "Ahmed", age: 30, address: "New York" },
  { name: "John", age: 32, address: "San Francisco" },
];

function ExcelFile() {
  return (
    <div>
      <CSVLink data={data} filename={"my-file.csv"}>
        Download me
      </CSVLink>
    </div>
  );
}

export default ExcelFile;