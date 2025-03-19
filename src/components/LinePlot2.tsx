import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

export default function LinePlot({
  data = [
    { x: 0, y: Math.random() * 50 },
    { x: 1, y: Math.random() * 50 },
    { x: 2, y: Math.random() * 50 },
    { x: 3, y: Math.random() * 50 },
    { x: 4, y: Math.random() * 50 },
  ],
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Usar ResizeObserver para actualizar las dimensiones del contenedor
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
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
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const { width, height } = dimensions;

    // Crear escalas
    const x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y) as number])
      .range([height - marginBottom, marginTop]);

    const line = d3
      .line<{ x: number; y: number }>()
      .x((_, i) => x(i))
      .y((d) => y(d.y));

    // Seleccionar el SVG y limpiar contenido previo
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Agregar ejes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    // Dibujar la línea
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Dibujar puntos
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (_, i) => x(i))
      .attr("cy", (d) => y(d.y))
      .attr("r", 4)
      .attr("fill", "white")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5);
  }, [dimensions, data, marginBottom, marginLeft, marginRight, marginTop]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>
    </div>
  );
}