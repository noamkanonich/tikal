import React, { useState } from "react";
import "./BarChart.css";

function BarChart(props) {
  const [population, setPopulation] = useState(props.planets);
  const maxPopulation = 500;
  const chartHeight = 500;
  const barWidth = 100;
  const barMargin = 50;
  const numberofBars = population.length;
  const chartWidth = numberofBars * (barWidth + barMargin);

  const calculateHighestPopulation = (population) =>
    population.reduce((acc, cur) => {
      const { population } = cur;
      return population > acc ? population : acc;
    }, 0);

  const [highestPopulation, setHighestPopulation] = useState(
    calculateHighestPopulation(population)
  );

  return (
    <>
      <p className="legend">
        <span className="expense">Home World</span>
        <span className="highest-expense">Highest Population</span>
      </p>

      <Chart height={chartHeight} width={chartWidth}>
        {population.map((data, index) => {
          const barHeight =
            data.population > 100000000
              ? data.population / 10000000
              : data.population / 250000;
          return (
            <Bar
              key={data.id}
              x={index * (barWidth + barMargin)}
              y={(chartHeight - barHeight - 20) * 0.8}
              width={barWidth}
              height={data.population}
              HomeWorldName={data.name}
              highestPopulation={highestPopulation}
            />
          );
        })}
      </Chart>
    </>
  );
}

const Chart = ({ children, width, height }) => (
  <div className="chart">
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {children}
    </svg>
  </div>
);

const Bar = ({ x, y, width, height, HomeWorldName, highestPopulation }) => (
  <>
    <rect
      x={x + 10}
      y={y}
      width={width}
      height={475 - y}
      fill={"grey"}
      fill={highestPopulation === height ? `rgb(103,72,70)` : `grey`}
    />
    <text x={x + 10 + width / 2} y={y - 16} dominant-baseline="middle" text-anchor="middle" fill="yellow">
      {height}
    </text>    
    <text x={x + 10 + width / 2} y={495} dominant-baseline="middle" text-anchor="middle" fill="yellow">
      {HomeWorldName}
    </text>
  </>
);

export default BarChart;
