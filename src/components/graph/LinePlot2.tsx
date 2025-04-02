import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

export default function LinePlot({
  data = [
    { x: "2014", y: Math.ceil(Math.random() * 50) },
    { x: "2015", y: Math.ceil(Math.random() * 50) },
    { x: "2016", y: Math.ceil(Math.random() * 50) },
    { x: "2017", y: Math.ceil(Math.random() * 50) },
    { x: "2018", y: Math.ceil(Math.random() * 50) },
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
        setDimensions({
          width: width || 600, // Valor predeterminado si width es 0
          height: height || 200, // Valor predeterminado si height es 0
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

    // Crear escalas
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.x)) // Usar los labels como dominio
      .range([marginLeft, width - marginRight])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y) as number])
      .range([height - marginBottom, marginTop]);

    const line = d3
      .line<{ x: string; y: number }>()
      .x((d) => x(d.x)!)
      .y((d) => y(d.y));

    // Seleccionar el SVG y limpiar contenido previo
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Dibujar líneas horizontales en el fondo
    svg
      .append("g")
      .attr("class", "grid-lines")
      .selectAll("line")
      .data(y.ticks(5)) // Dividir en 5 líneas horizontales
      .join("line")
      .attr("x1", marginLeft)
      .attr("x2", width - marginRight)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "#ADADAD") // Color de las líneas
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4"); // Líneas punteadas

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
      .attr("stroke-width", 3)
      .attr("d", line);

    // Dibujar puntos
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.x)!)
      .attr("cy", (d) => y(d.y))
      .attr("r", 12) // Aumentar el radio de los puntos
      .attr("fill", "steelblue")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Agregar etiquetas con valores dentro de los puntos
    svg
      .selectAll("text.value")
      .data(data)
      .join("text")
      .attr("class", "value")
      .attr("x", (d) => x(d.x)!)
      .attr("y", (d) => y(d.y) + 4) // Centrar el texto dentro del punto
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "white") // Cambiar el color del texto a blanco para contraste
      .text((d) => (Number.isInteger(d.y) ? d.y : d.y.toFixed(2))); // Mostrar sin decimales si es entero
  }, [dimensions, data, marginBottom, marginLeft, marginRight, marginTop]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ height: "100%", width: "100%" }} // Asegurar que ocupe todo el espacio del padre
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ height: "300px", width: "100%" }} // Asegurar que el SVG ocupe todo el espacio
      ></svg>
    </div>
  );
}