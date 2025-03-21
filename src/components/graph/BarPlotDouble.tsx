import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface BarPlotDoubleProps {
  data?: { label: string; value1: number; value2: number }[];
  colors?: [string, string];
}

export default function BarPlotDouble({
  data = [
    { label: "A", value1: 30, value2: 50 },
    { label: "B", value1: 80, value2: 40 },
    { label: "C", value1: 45, value2: 60 },
    { label: "D", value1: 60, value2: 70 },
  ],
  colors = ["#1daade", "#45DC20"], // Colores por defecto
}: BarPlotDoubleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Usar ResizeObserver para actualizar las dimensiones del contenedor
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        const height = width * 0.6; // Relación de aspecto 3:2
        setDimensions({ width, height });
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
    if (!data || data.length === 0 || dimensions.width === 0) return;

    const { width, height } = dimensions;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Crear escalas
    const x0 = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain(["value1", "value2"])
      .range([0, x0.bandwidth()])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.value1, d.value2)) || 0])
      .nice()
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal<string>().domain(["value1", "value2"]).range(colors);

    // Seleccionar el SVG y limpiar contenido previo
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Crear el grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Dibujar ejes
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .attr("class", "y-axis");

    g.append("g")
      .call(d3.axisBottom(x0))
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "x-axis");

    // Dibujar barras
    g.selectAll<SVGGElement, { label: string; value1: number; value2: number }>(".group")
      .data(data)
      .join("g")
      .attr("class", "group")
      .attr("transform", (d) => `translate(${x0(d.label)},0)`)
      .selectAll<SVGRectElement, { key: string; value: number }>("rect")
      .data((d) => [
        { key: "value1", value: d.value1 },
        { key: "value2", value: d.value2 },
      ])
      .join("rect")
      .attr("x", (d) => x1(d.key) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => innerHeight - y(d.value))
      .attr("fill", (d) => colorScale(d.key) as string);

    // Agregar etiquetas de valores
    g.selectAll<SVGGElement, { label: string; value1: number; value2: number }>(".group")
      .selectAll<SVGTextElement, { key: string; value: number }>("text")
      .data((d) => [
        { key: "value1", value: d.value1 },
        { key: "value2", value: d.value2 },
      ])
      .join("text")
      .attr("x", (d) => (x1(d.key) || 0) + x1.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "black")
      .text((d) => d.value);
  }, [data, dimensions, colors]);

  return (
    <div ref={containerRef} className="w-full h-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMinYMin meet"
        className="w-full h-full"
      ></svg>
    </div>
  );
}