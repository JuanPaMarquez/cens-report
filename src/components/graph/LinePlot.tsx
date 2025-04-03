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

    if (validData.length === 0) {
      console.error("No valid data available for rendering.");
      return;
    }

    const x = d3.scalePoint<string>()
      .domain(validData.map((d) => d.label))
      .range([marginLeft, width - marginRight])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(validData, (d) => d.value) ?? 0])
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

    // Removed unused 'labels' variable

    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    function updateElements() {
      circles
        .attr("cx", (d) => x(d.label) ?? 0)
        .attr("cy", (d) => y(d.value))
        .style("display", (d) => (x(d.label) === undefined ? "none" : "block")); // Ocultar puntos fuera del dominio

      const labelGroups = pointsGroup.selectAll("g.label-group")
        .data(validData)
        .join("g")
        .attr("class", "label-group")
        .attr("transform", (d) => `translate(${x(d.label) ?? 0}, ${y(d.value) - 15})`)
        .style("display", (d) => (x(d.label) === undefined ? "none" : "block")); // Ocultar etiquetas fuera del dominio

      labelGroups.selectAll("rect")
        .data((d) => [d])
        .join("rect")
        .attr("x", (d) => -(d.value.toFixed(2).toString().length * 6) / 2) // Centrar el rectángulo
        .attr("y", -10)
        .attr("width", (d) => d.value.toFixed(2).toString().length * 6) // Ajustar el ancho según el texto
        .attr("height", 20)
        .attr("fill", "white")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("rx", 4); // Bordes redondeados

      labelGroups.selectAll("text")
        .data((d) => [d])
        .join("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text((d) => (Number.isInteger(d.value) ? d.value : d.value.toFixed(2))); // Mostrar máximo dos decimales si no es entero
    }

    const brush = d3.brushX()
      .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
      .on("end", (event) => {
        const selection = event.selection;
        if (!selection) return;

        const [x0, x1] = selection;
        const newDomain = validData.filter(d => {
          const pos = x(d.label);
          return pos !== undefined && pos >= x0 && pos <= x1;
        }).map(d => d.label);

        if (newDomain.length === 0) return;

        x.domain(newDomain);
        xAxisGroup.transition().duration(1000).call(d3.axisBottom(x));
        linePath.datum(validData.filter(d => newDomain.includes(d.label)))
          .transition().duration(1000)
          .attr("d", line);

        updateElements();

        // Quitar el cuadro gris del brushing
        chartArea.select<SVGGElement>(".brush").call(brush.move, null);
      });

    chartArea.append("g")
      .attr("class", "brush")
      .call(brush);

    svg.on("dblclick", () => {
      x.domain(validData.map(d => d.label));
      xAxisGroup.transition().call(d3.axisBottom(x));
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
