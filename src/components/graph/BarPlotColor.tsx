/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from "d3";
import { useRef, useEffect } from "react";

interface BarPlotColorProps {
  data?: Array<{
    label: string; // Texto del eje X
    value: number; // Valor del elemento
    category: string; // Categoría para asignar colores
  }>;
}

export default function BarPlotColor({
  data = [
    { label: "Enero", value: 30, category: "Ventas" },
    { label: "Febrero", value: 50, category: "Marketing" },
    { label: "Marzo", value: 20, category: "Ventas" },
    { label: "Abril", value: 40, category: "Soporte" },
    { label: "Mayo", value: 60, category: "Marketing" },
    { label: "junio", value: 60, category: "Marketing" },
    { label: "julio", value: 60, category: "Soporte" },
    { label: "agosto", value: 60, category: "Ventas" },
  ],
}: BarPlotColorProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      renderChart();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [data]);

  const renderChart = () => {
    if (!containerRef.current || !svgRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const margin = { top: 70, right: 30, bottom: 50, left: 120 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Crear escala de colores basada en las categorías
    const categories = Array.from(new Set(data.map((d) => d.category))); // Categorías únicas
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(categories)
      .range(d3.schemeSet2); // Paleta de colores

    // Crear escalas
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([height, 0]);

    // Seleccionar el SVG y limpiar contenido previo
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Crear el grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Dibujar barras
    g.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d) => xScale(d.label)!)
    .attr("y", (d) => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.value))
    .attr("fill", (d) => colorScale(d.category) as string);

    // Agregar etiquetas de valores encima de las barras
    g.selectAll(".bar-label")
    .data(data)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", (d) => xScale(d.label)! + xScale.bandwidth() / 2) // Centrar el texto en la barra
    .attr("y", (d) => yScale(d.value) - 5) // Posicionar encima de la barra
    .attr("text-anchor", "middle") // Centrar el texto horizontalmente
    .attr("font-size", "12px")
    .attr("fill", "black")
    .text((d) => d.value); // Mostrar el valor

    // Agregar ejes
    g.append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .attr("class", "y-axis");

    g.append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate(0,${height})`)
      .attr("class", "x-axis")
      .selectAll("text") // Rotar los textos del eje X
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "-0.6em");

    // Crear la leyenda
    const legend = svg
      .append("g")

    legend
      .selectAll(".legend-item")
      .data(categories.sort((a, b) => b.length - a.length))
      .join("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i) => `translate(0, ${i * 15})`) // Alinear verticalmente
      .call((g) => {
        g.append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", (category) => colorScale(category) as string);

        g.append("text")
          .attr("x", 20)
          .attr("y", 12)
          .attr("text-anchor", "start")
          .attr("font-size", "10px")
          .text((category) => category);
      });
  };

  useEffect(() => {
    renderChart();
  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-80">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}