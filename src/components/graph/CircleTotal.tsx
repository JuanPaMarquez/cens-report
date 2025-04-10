import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface CircleTotalProps {
  data?: { label: string; value: number }[];
  colors?: string[];
}

const CircleTotal = ({
  data = [
    { label: "Operativos", value: 10 },
    { label: "Inactivos", value: 20},
    { label: "Fallando", value: 30},
  ],
  colors = ["#1DC1DE", "#45DC20", "#FF5454"], // Colores por defecto

}: CircleTotalProps) => {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const width = 320; // Dimensiones fijas
  const height = 300;

  // Crear escala de colores
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(data.map((d) => d.label))
    .range(colors);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const radius = Math.min(width-40, height-60) / 2;
    const innerRadius = radius * 0.6; // Radio interno para el hueco

    // Calcular el total
    const total = data.reduce((sum, d) => sum + d.value, 0);

    // Crear el generador de gráficos de dona
    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(innerRadius) // Hueco en el centro
      .outerRadius(radius);

    // Seleccionar el SVG y limpiar contenido previo
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Crear el grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${(width+40) / 2}, ${height - radius - 2})`);

    // Dibujar las secciones del gráfico
    g.selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.label) as string)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Agregar el número total en el centro
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text(total);

    // Agregar valores dentro de las secciones
    g.selectAll("text.value")
      .data(pie(data))
      .join("text")
      .attr("class", "value")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text((d) => d.data.value);

    // Crear la leyenda fuera del gráfico
    const legend = svg
      .append("g")
      .attr("transform", `translate(0,0)`); // Posicionar la leyenda    

    legend
      .selectAll(".legend-item")
      .data(data)
      .join("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i) => `translate(0, ${i * 18})`) // Aumentar espaciado vertical
      .call((g) => {
        g.append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", (d) => colorScale(d.label) as string);
    
        g.append("text")
          .attr("x", 20)
          .attr("y", 12)
          .attr("text-anchor", "start")
          .attr("font-size", "12px")
          .text((d) => `${d.label}`);
      });
  }, [data, colorScale]);

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center items-center">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width={`${width}`}
        height={`${height}`}
        className="h-full"
      ></svg>
    </div>
  );
};

export default CircleTotal;