import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function CirclePlot({
  data = [
    { label: "Operativos", value: Math.ceil(Math.random() * 100) },
    { label: "Inactivos", value: Math.ceil(Math.random() * 100) },
    { label: "Fallando", value: Math.ceil(Math.random() * 100) },
  ],
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Memorizar la escala de colores
  const color = d3
    .scaleOrdinal<string>()
    .domain(data.map((d) => d.label))
    .range(d3.schemeSet1);

  useEffect(() => {
    const width = 250; // Dimensiones fijas
    const height = 300;
    const radius = Math.min(width, height) / 2;

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

    // Crear el grupo principal
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

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
  }, [data, color]);

  return (
    <div className="w-full h-100 flex flex-row-reverse items-center relative md:pt-10">
      <svg
        ref={svgRef}
        viewBox="0 0 250 300"
        width="250"
        height="300"
      ></svg>
      <div className="flex flex-col flex-wrap justify-center mt-4 absolute left-0 top-0">
        {data.map((d, i) => (
          <div key={i} className="flex mr-4">
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: color(d.label) }}
            ></div>
            <span className="text-[10px]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}