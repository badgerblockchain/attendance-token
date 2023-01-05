import React from "react";

export default function DateResolver({ randomDate }) {
  console.log("the date passed was" + randomDate);
  const date = new Date(randomDate * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedTime = `${month}/${day}/${year}`;

  return <p>{formattedTime}</p>;
}
