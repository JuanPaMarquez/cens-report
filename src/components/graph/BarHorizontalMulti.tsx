/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

interface BarHorizontalMultiProps {
  data?: Array<{
    category: string;
    values: Array<{ label: string; value: number }>;
  }>;
  colors?: string[];
}

const BarHorizontalMulti: React.FC<BarHorizontalMultiProps> = ({
  data = [
    {
      category: "Category 1",
      values: [
        { label: "Value 1", value: 30 },
        { label: "Value 2", value: 50 },
        { label: "Value 3", value: 20 },
        { label: "Value 4", value: 10 },
      ],
    },
    {
      category: "Category 2",
      values: [
        { label: "Value 1", value: 40 },
        { label: "Value 2", value: 60 },
        { label: "Value 3", value: 30 },
        { label: "Value 4", value: 10 },
      ],
    },
    {
      category: "Category 3",
      values: [
        { label: "Value 1", value: 20 },
        { label: "Value 2", value: 80 },
        { label: "Value 3", value: 40 },
        { label: "Value 4", value: 10 },
      ],
    },
  ],
  colors = d3.schemeObservable10,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selected, setSelected] = useState<string>("Todos");

  // Calcular los datos filtrados globalmente
  const filteredData = useMemo(() => {
    console.log("entro")
    return selected === "Todos"
      ? data
      : data.filter((d) => d.values.some((value) => value.label === selected && value.value > 0));
  }, [selected, data]);

  console.log("Selected:", selected);
  console.log("Filtered Data:", filteredData);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        const height = filteredData.length * 80 + 200; // Ajustar la altura según la cantidad de categorías y espacio para la leyenda
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [filteredData]);    

  useEffect(() => {
    if (!dimensions.width || !dimensions.height || data.length === 0) return;
  
    const { width, height } = dimensions;
    const margin = { top: 100, right: 30, bottom: 50, left: 100 }; // Espacio adicional para la leyenda
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
  
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const y0 = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.category))
      .range([0, innerHeight])
      .padding(0.2);
  
    const y1 = d3
      .scaleBand()
      .domain(filteredData[0]?.values.map((d) => d.label) || [])
      .range([0, y0.bandwidth()])
      .padding(0.1);
  
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d3.max(d.values, (v) => v.value)) || 0])
      .nice()
      .range([0, innerWidth]);
  
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(filteredData.flatMap((d) => d.values.map((v) => v.label)))
      .range(colors as string[]);
  
    // Tooltip
    const tooltip = d3.select(tooltipRef.current);
  
    // Leyenda
    const legend = svg
      .append("g")
      .attr("transform", `translate(${margin.left - 80}, 0)`); // Posicionar la leyenda al lado izquierdo del gráfico
  
    legend
      .selectAll(".legend-item")
      .data(data[0]?.values.map((d, i) => ({ label: d.label, color: colors[i] })) || [])
      .join("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i) => `translate(0, ${i * 15})`) // Posicionar cada elemento verticalmente
      .call((g) => {
        g.append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", (d) => d.color);
  
        g.append("text")
          .attr("x", 20)
          .attr("y", 12)
          .attr("text-anchor", "start")
          .attr("font-size", "10px")
          .text((d) => d.label);
      });
  
    // Ejes
    g.append("g")
      .call(d3.axisLeft(y0))
      .attr("class", "y-axis");
  
    g.append("g")
      .call(d3.axisBottom(x).ticks(5))
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "x-axis");
  
    // Dibujar barras
    const groups = g
      .selectAll(".group")
      .data(filteredData)
      .join("g")
      .attr("class", "group")
      .attr("transform", (d) => `translate(0,${y0(d.category)})`);
  
    groups
      .selectAll("rect")
      .data((d) => d.values)
      .join("rect")
      .attr("y", (d) => y1(d.label)!)
      .attr("x", 0.5)
      .attr("width", (d) => x(d.value))
      .attr("height", y1.bandwidth())
      .attr("fill", (d) => colorScale(d.label) as string)
      .on("mouseover", (_, d) => {
        tooltip
          .style("opacity", 1)
          .html(`Dato: ${d.label}`); // Mostrar el texto de la leyenda
      })
      .on("mousemove", (event) => {
        const containerBounds = containerRef.current?.getBoundingClientRect();
        if (containerBounds) {
          tooltip
            .style("left", `${event.clientX - containerBounds.left + 10}px`)
            .style("top", `${event.clientY - containerBounds.top - 20}px`);
        }
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  
    // Etiquetas de valores
    groups
      .selectAll("text")
      .data((d) => d.values)
      .join("text")
      .attr("y", (d) => y1(d.label)! + y1.bandwidth() / 2)
      .attr("x", (d) => x(d.value) + 5)
      .attr("alignment-baseline", "middle")
      .attr("font-size", "10px")
      .text((d) => d.value);
  }, [dimensions, colors, selected, data]);

  return (
    <div ref={containerRef} className="w-full h-auto relative">
      <select
        className="absolute text-sm top-2 right-2 p-1 rounded text-right"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="Todos">Todas las categorías</option>
        {Array.from(new Set(data.flatMap((d) => d.values.map((value) => value.label)))).map(
          (label) => (
        <option key={label} value={label}>
          {label}
        </option>
          )
        )}
      </select>
      <div
        ref={tooltipRef}
        className="absolute bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none"
        style={{ position: "absolute" }}
      ></div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMinYMin meet"
        className="w-full h-full"
      ></svg>
    </div>
  );
};

export default BarHorizontalMulti;