import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function CirclePlot({
  data = [
    { label: "Operativos", value: Math.ceil(Math.random() * 100) },
    { label: "Inactivos", value: Math.ceil(Math.random() * 100) },
    { label: "Fallando", value: Math.ceil(Math.random() * 100) },
  ],
  colors = d3.schemeSet1,
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const width = 320; // Dimensiones fijas
  const height = 300;

  // Memorizar la escala de colores
  const color = d3
    .scaleOrdinal<string>()
    .domain(data.map((d) => d.label))
    .range(d3.schemeSet1);

  useEffect(() => {
    const radius = Math.min(width-40, height-70) / 2;

    // Crear el generador de gráficos de torta
    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0) // Gráfico de torta completo (sin agujero)
      .outerRadius(radius);

    // Seleccionar el SVG y limpiar contenido previo
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(colors);

    // Crear el grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${(width + 40) / 2}, ${height - radius - 2})`);

    // Dibujar las secciones del gráfico
    g.selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label) as string)
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Agregar etiquetas
    g.selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("fill", "white")
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
      .attr("transform", (_, i) => `translate(0, ${i * 15})`) // Aumentar espaciado vertical
      .call((g) => {
        g.append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", (d) => colorScale(d.label) as string);
    
        g.append("text")
          .attr("x", 20)
          .attr("y", 12)
          .attr("text-anchor", "start")
          .attr("font-size", "14px")
          .text((d) => `${d.label}`);
      });
    
  }, [data, colors, color]);

  return (
    <div className="w-full h-full flex justify-center relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width={`${width}`}
        height={`${height}`}
        className="h-70"
      ></svg>
    </div>
  );
}