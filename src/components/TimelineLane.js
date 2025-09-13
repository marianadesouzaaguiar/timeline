// src/components/TimelineLane.js
import React from "react";
import TimelineItem from "./TimelineItem";

const TimelineLane = ({ items, scale, laneIndex }) => {
  return (
    <div className="timeline-lane" style={{ position: "relative", height: "40px" }}>
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
          scale={scale}
          laneIndex={laneIndex}
        />
      ))}
    </div>
  );
};

export default TimelineLane;
