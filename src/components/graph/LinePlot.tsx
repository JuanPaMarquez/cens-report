import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

export default function LinePlot({
  data = [
    { label: "2014", value: Math.ceil(Math.random() * 50) },
    { label: "2015", value: Math.ceil(Math.random() * 50) },
    { label: "2016", value: Math.ceil(Math.random() * 50) },
    { label: "2017", value: Math.ceil(Math.random() * 50) },
    { label: "2018", value: Math.ceil(Math.random() * 50) },
    { label: "2019", value: Math.ceil(Math.random() * 50) },
    { label: "2020", value: Math.ceil(Math.random() * 50) },
    { label: "2021", value: Math.ceil(Math.random() * 50) },
    { label: "2022", value: Math.ceil(Math.random() * 50) },
    { label: "2023", value: Math.ceil(Math.random() * 50) },
    { label: "2024", value: Math.ceil(Math.random() * 50) },
    { label: "2025", value: Math.ceil(Math.random() * 50) },
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

    // Validar datos y filtrar valores inválidos
    const validData = data.filter(
      (d) => typeof d.value === "number" && !isNaN(d.value) && typeof d.label === "string"
    );

    if (validData.length === 0) {
      console.error("No valid data available for rendering.");
      return;
    }

    // Crear escalas
    const yMax = d3.max(validData, (d) => d.value) as number;
    const yMin = d3.min(validData, (d) => d.value) as number;
    const yPadding = (yMax - yMin) * 0.2; // Agregar un 20% de margen superior e inferior

    const x = d3
      .scalePoint()
      .domain(validData.map((d) => d.label)) // Usar los labels como dominio
      .range([marginLeft, width - marginRight])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([yMin - yPadding, yMax + yPadding]) // Ajustar el dominio con el margen
      .range([height - marginBottom, marginTop]);

    const line = d3
      .line<{ label: string; value: number }>()
      .x((d) => x(d.label)!)
      .y((d) => y(d.value));

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
      .call(d3.axisBottom(x))
      .selectAll("text") // Seleccionar los labels del eje X
      .attr("transform", "translate(-8,2), rotate(-45)") // Rotar -45 grados
      .style("text-anchor", "end"); // Alinear el texto al final

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

    // Dibujar la línea
    svg
      .append("path")
      .datum(validData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Dibujar puntos
    svg
      .selectAll("circle")
      .data(validData)
      .join("circle")
      .attr("cx", (d) => x(d.label)!)
      .attr("cy", (d) => y(d.value))
      .attr("r", 6) // Reducir el radio de los puntos
      .attr("fill", "steelblue")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Agregar etiquetas con valores dentro de un fondo blanco
    svg
      .selectAll("g.value-label")
      .data(validData)
      .join("g")
      .attr("class", "value-label")
      .attr("transform", (d) => `translate(${x(d.label)}, ${y(d.value) - 15})`) // Posicionar encima del punto
      .call((g) => {
        g.append("rect") // Fondo blanco
          .attr("x", -15)
          .attr("y", -10)
          .attr("width", 30)
          .attr("height", 20)
          .attr("fill", "white")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("rx", 4); // Bordes redondeados

        g.append("text") // Texto del valor
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("font-size", "10px")
          .attr("font-weight", "bold")
          .attr("fill", "steelblue")
          .text((d) => (Number.isInteger(d.value) ? d.value : d.value.toFixed(2))); // Mostrar sin decimales si es entero
      });
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