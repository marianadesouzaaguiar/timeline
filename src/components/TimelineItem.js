import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const TimelineItem = ({ item, xScale, yPosition, laneHeight, updateItemName, updateItemDates }) => {
  const itemRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const itemX = xScale(new Date(item.start));
  const itemWidth = xScale(new Date(item.end)) - itemX;
  const displayWidth = Math.max(itemWidth, 20);

  // Comportamento de arrastar
  useEffect(() => {
    const handleDrag = d3.drag()
      .on("start", () => {
        d3.select(itemRef.current).raise().style("stroke", "black");
      })
      .on("drag", (event) => {
        const newStartX = event.x;
        d3.select(itemRef.current).attr("x", newStartX);
      })
      .on("end", (event) => {
        d3.select(itemRef.current).style("stroke", null);
        const newStartX = event.x;
        const newStart = xScale.invert(newStartX);
        const newEnd = xScale.invert(newStartX + itemWidth);

        updateItemDates(item.id, d3.timeFormat("%Y-%m-%d")(newStart), d3.timeFormat("%Y-%m-%d")(newEnd));
      });

    d3.select(itemRef.current).call(handleDrag);
  }, [item, xScale, itemWidth, updateItemDates]);

  // Lógica de edição inline
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    updateItemName(item.id, e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const tooltipText = `${item.name}\n${item.start} - ${item.end}`;

  return (
    <g transform={`translate(0, ${yPosition})`} className="timeline-item-group">
      <rect
        ref={itemRef}
        x={itemX}
        y={5}
        width={displayWidth}
        height={laneHeight - 10}
        className="timeline-item-rect"
        rx="5"
        ry="5"
        title={tooltipText}
        onDoubleClick={handleDoubleClick} // Usar double-click para evitar conflito
      />
      {isEditing ? (
        <foreignObject x={itemX + 5} y={5} width={displayWidth - 10} height={laneHeight - 10}>
          <input
            type="text"
            value={item.name}
            onChange={handleTextChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="timeline-item-input"
          />
        </foreignObject>
      ) : (
        <text
          x={itemX + 8}
          y={laneHeight / 2}
          className="timeline-item-text"
          alignmentBaseline="middle"
          onClick={handleDoubleClick}
          style={{ cursor: "text", pointerEvents: "auto" }}
        >
          {item.name}
        </text>
      )}
    </g>
  );
};

export default TimelineItem;