import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import { assignLanes } from "./utils/assignLanes";
import initialItems from "./timelineItems";
import TimelineItem from "./components/TimelineItem";
import "./index.css";

// Constantes de layout
const width = 1000;
const margin = { top: 20, right: 20, bottom: 40, left: 20 };
const laneHeight = 60;

function App() {
  const [timelineItems, setTimelineItems] = useState(initialItems);
  const [zoomLevel, setZoomLevel] = useState(1);
  const svgRef = useRef();
  const xAxisRef = useRef();

  // Processamento de dados
  const itemsWithLanes = assignLanes(timelineItems);
  const allDates = timelineItems.flatMap(item => [new Date(item.start), new Date(item.end)]);
  const startDate = d3.min(allDates);
  const endDate = d3.max(allDates);

  const svgHeight = margin.top + margin.bottom + (itemsWithLanes.length * laneHeight) + 20;

  // Escala D3
  const xScale = d3.scaleTime()
    .domain([startDate, new Date(endDate.getTime() * zoomLevel)])
    .range([margin.left, width - margin.right]);

  // Efeito para renderizar o eixo e as grades
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(0)
      .tickFormat(d3.timeFormat("%b %d, %Y"));

    // Renderiza o eixo X
    d3.select(xAxisRef.current)
      .call(xAxis)
      .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Renderiza as linhas de grade verticais
    svg.selectAll(".grid-line").remove();
    svg.append("g")
      .attr("class", "grid-line")
      .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
      .call(xAxis.tickSize(-(svgHeight - margin.top - margin.bottom)).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-dasharray", "2,2");

  }, [xScale, svgHeight, zoomLevel]);

  // Funções de atualização de estado
  const updateItemName = (id, newName) => {
    setTimelineItems(items =>
      items.map(item =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const updateItemDates = (id, newStart, newEnd) => {
    setTimelineItems(items =>
      items.map(item =>
        item.id === id ? { ...item, start: newStart, end: newEnd } : item
      )
    );
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="timeline-container">
      <h2>Airtable Timeline</h2>
      <div className="controls">
        <button onClick={() => setZoomLevel(zoomLevel * 1.2)}>+</button>
        <button onClick={() => setZoomLevel(zoomLevel * 0.8)}>-</button>
        <button onClick={resetZoom}>Resetar Zoom</button>
      </div>
      <svg ref={svgRef} width={width} height={svgHeight}>
        <g className="timeline-lanes">
          {itemsWithLanes.map((lane, laneIndex) => (
            <React.Fragment key={`lane-${laneIndex}`}>
              <rect
                x={margin.left}
                y={margin.top + (laneIndex * laneHeight)}
                width={width - margin.left - margin.right}
                height={laneHeight}
                fill={laneIndex % 2 === 0 ? "#f9f9f9" : "#ffffff"}
              />
              {lane.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  xScale={xScale}
                  yPosition={margin.top + (laneIndex * laneHeight)}
                  laneHeight={laneHeight}
                  updateItemName={updateItemName}
                  updateItemDates={updateItemDates}
                />
              ))}
            </React.Fragment>
          ))}
        </g>
        <g ref={xAxisRef} className="x-axis" />
      </svg>
    </div>
  );
}

export default App;