// src/components/Timeline.js
import React from "react";
import { assignLanes } from "../utils/assignLanes";
import { createDateScale } from "../utils/scale";
import TimelineLane from "./TimelineLane";

const Timeline = ({ items, width = 800 }) => {
  if (!items || items.length === 0) return <p>No items to display</p>;

  // Descobre data mínima e máxima
  const minDate = items.reduce(
    (min, item) => (new Date(item.start) < new Date(min) ? item.start : min),
    items[0].start
  );
  const maxDate = items.reduce(
    (max, item) => (new Date(item.end) > new Date(max) ? item.end : max),
    items[0].end
  );

  // Cria a escala
  const scale = createDateScale(minDate, maxDate, width);

  // Organiza os itens em lanes
  const lanes = assignLanes(items);

  return (
    <div
      className="timeline"
      style={{
        position: "relative",
        width: `${width}px`,
        border: "1px solid #ddd",
        padding: "10px",
      }}
    >
      {lanes.map((lane, i) => (
        <TimelineLane key={i} items={lane} scale={scale} laneIndex={i} />
      ))}
    </div>
  );
};

export default Timeline;
