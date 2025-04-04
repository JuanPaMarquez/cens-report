import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

interface DataPoint {
  label: string;
  value: number;
}

interface LinePlotProps {
  data?: DataPoint[];
  color?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export default function LinePlot({
  data = [
    { label: "2014", value: Math.ceil(Math.random() * 50) },
    { label: "2015", value: Math.ceil(Math.random() * 50) },
    { label: "2016", value: Math.ceil(Math.random() * 50) },
    { label: "2017", value: Math.ceil(Math.random() * 50) },
    { label: "2018", value: Math.ceil(Math.random() * 50) },
    { label: "2019", value: Math.ceil(Math.random() * 50) },
    { label: "2020", value: Math.ceil(Math.random() * 50) },
    { label: "2021", value: Math.ceil(Math.random() * 50) },
    { label: "2022", value: Math.ceil(Math.random() * 50) },
    { label: "2023", value: Math.ceil(Math.random() * 50) },
    { label: "2024", value: Math.ceil(Math.random() * 50) },
    { label: "2025", value: Math.ceil(Math.random() * 50) },
  ],
  color = "#ADADAD",
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: LinePlotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({
          width: width || 600,
          height: height || 200,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const { width, height } = dimensions;
    const validData = data.filter((d): d is DataPoint =>
      typeof d.value === "number" && !isNaN(d.value) && typeof d.label === "string"
    );

    const x = d3.scalePoint<string>()
      .domain(validData.map((d) => d.label))
      .range([marginLeft, width - marginRight])
      .padding(0.5);

    const yValues = validData.map(d => d.value);
    const yMin = d3.min(yValues) ?? 0;
    const yMax = d3.max(yValues) ?? 100;
    const yPadding = (yMax - yMin) * 0.2 || 10;

    const y = d3.scaleLinear()
      .domain([yMin - yPadding, yMax + yPadding])
      .nice()
      .range([height - marginBottom, marginTop]);

    const line = d3.line<DataPoint>()
      .x((d) => x(d.label) ?? 0)
      .y((d) => y(d.value));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const chartArea = svg.append("g");

    const linePath = chartArea.append("path")
      .datum(validData)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("d", line);

    const pointsGroup = chartArea.append("g").attr("class", "points");

    const circles = pointsGroup.selectAll("circle")
      .data(validData)
      .enter().append("circle")
      .attr("r", 4)
      .attr("fill", color);

    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    xAxisGroup.selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("x", -6)
      .attr("y", 7)
      .attr("dy", ".35em");

    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    function updateElements() {
      circles
        .attr("cx", (d) => x(d.label) ?? 0)
        .attr("cy", (d) => y(d.value))
        .style("display", (d) => (x(d.label) === undefined ? "none" : "block"));

      const labelGroups = pointsGroup.selectAll("g.label-group")
        .data(validData)
        .join("g")
        .attr("class", "label-group")
        .attr("transform", (d) => `translate(${x(d.label) ?? 0}, ${y(d.value) - 15})`)
        .style("display", (d) => (x(d.label) === undefined ? "none" : "block"));

      labelGroups.selectAll("rect")
        .data((d) => [d])
        .join("rect")
        .attr("x", (d) => -(d.value.toFixed(2).toString().length * 6) / 2)
        .attr("y", -10)
        .attr("width", (d) => d.value.toFixed(2).toString().length * 6)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("rx", 4);

      labelGroups.selectAll("text")
        .data((d) => [d])
        .join("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text((d) => (Number.isInteger(d.value) ? d.value : d.value.toFixed(2)));
    }

    const brush = d3.brushX()
      .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
      .on("end", (event) => {
        const selection = event.selection;
        if (!selection) return;

        const [x0, x1] = selection;
        const newData = validData.filter(d => {
          const pos = x(d.label);
          return pos !== undefined && pos >= x0 && pos <= x1;
        });

        if (newData.length === 0) return;

        const newDomain = newData.map(d => d.label);
        x.domain(newDomain);

        const newYValues = newData.map(d => d.value);
        const newMin = d3.min(newYValues) ?? 0;
        const newMax = d3.max(newYValues) ?? 100;
        const newPadding = (newMax - newMin) * 0.2 || 10;
        y.domain([newMin - newPadding, newMax + newPadding]).nice();

        xAxisGroup.transition().duration(1000).call(d3.axisBottom(x));
        xAxisGroup.selectAll("text")
          .attr("transform", "rotate(-45)")
          .attr("text-anchor", "end")
          .attr("x", -5)
          .attr("y", 0)
          .attr("dy", ".35em");

        yAxisGroup.transition().duration(1000).call(d3.axisLeft(y));

        linePath.datum(newData)
          .transition().duration(1000)
          .attr("d", line);

        updateElements();
        chartArea.select<SVGGElement>(".brush").call(brush.move, null);
      });

    chartArea.append("g")
      .attr("class", "brush")
      .call(brush);

    svg.on("dblclick", () => {
      x.domain(validData.map(d => d.label));
      y.domain([yMin - yPadding, yMax + yPadding]).nice();

      xAxisGroup.transition().call(d3.axisBottom(x));
      xAxisGroup.selectAll("text")
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end")
        .attr("x", -5)
        .attr("y", 0)
        .attr("dy", ".35em");

      yAxisGroup.transition().call(d3.axisLeft(y));

      linePath.datum(validData)
        .transition()
        .attr("d", line);

      updateElements();
    });

    updateElements();
  }, [dimensions, data, color, marginBottom, marginLeft, marginRight, marginTop]);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ height: "100%", width: "100%" }}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} style={{ height: "300px", width: "100%" }}></svg>
    </div>
  );
}
