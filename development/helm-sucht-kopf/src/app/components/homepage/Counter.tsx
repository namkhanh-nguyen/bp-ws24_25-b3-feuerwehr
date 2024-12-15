"use client";

import React from "react";
import CountUp from "react-countup";

export default function Counter({
  number,
  title,
}: {
  number: number;
  title: string;
}) {
  return (
    <div className="counter">
      <CountUp
        duration={4.5}
        end={number}
        separator="."
        className="counter-number"
      />
      <hr />
      <span className="counter-title">{title}</span>
    </div>
  );
}
