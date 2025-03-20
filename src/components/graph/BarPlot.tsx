import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface BarPlotProps {
  data?: { label: string; value: number }[];
  colors?: string[];
}

const BarPlot = ({
  data = [
    { label: "one", value: Math.ceil(Math.random() * 10) },
    { label: "two", value: Math.ceil(Math.random() * 10) },
    { label: "three", value: Math.ceil(Math.random() * 10) },
    { label: "example", value: Math.ceil(Math.random() * 10) },
    { label: "label", value: Math.ceil(Math.random() * 10) },
  ], // Datos por defecto
  colors = ["#79FF58", "#54C9FF", "#FF5954"], // Colores por defecto
}: BarPlotProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(data.map((d) => d.label))
    .range(colors);

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

    // Ajustar márgenes para maximizar el área del gráfico
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Crear escalas
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.1); // Reducir el padding para que las barras ocupen más espacio

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Seleccionar el SVG y limpiar contenido previo
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Crear el grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Dibujar ejes
    g.append("g")
      .call(d3.axisLeft(yScale))
      .attr("class", "y-axis");

    g.append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("class", "x-axis")
      .selectAll("text")
      .style("text-anchor", "middle");

    // Dibujar barras
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label) || 0)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", (d) => colorScale(d.label) as string);

    // Agregar etiquetas de valores
    g.selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", (d) => (xScale(d.label) || 0) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.value);
  }, [data, dimensions, colorScale]);

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
};

export default BarPlot;