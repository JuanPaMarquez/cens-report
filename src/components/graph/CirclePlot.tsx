import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

export default function CirclePlot({
  data = [
    { label: "Operativos", value: Math.ceil(Math.random() * 100) },
    { label: "Inactivos", value: Math.ceil(Math.random() * 100) },
    { label: "Fallando", value: Math.ceil(Math.random() * 100) },
  ],
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const color = d3
    .scaleOrdinal<string>(["#79FF58", "#54C9FF", "#FF5954"])
    .domain(data.map((d) => d.label))

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
      .attr("font-size", "12px")
      .attr("fill", "black")
      .text((d) => d.data.value);
  }, [dimensions, data, color]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-row-reverse items-center relative md:pt-10">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        width="90%"
        height="90%"
      ></svg>
      <div className="flex flex-col flex-wrap justify-center mt-4 absolute left-0 top-0">
        {data.map((d, i) => (
          <div key={i} className="flex mr-4 ">
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: color(d.label) }}
            ></div>
            <span className="text-[10px]">{d.label}</span>
          </div>)
        )}
      </div>
    </div>
  );
}