import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NodeMap = ({ nodes }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Simple SVG canvas setup
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous
    
    const width = 600;
    const height = 300;
    
    svg.attr("width", width).attr("height", height);
    
    // Background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#050505")
      .attr("rx", 10);
      
    // Draw Nodes
    nodes.forEach((node, i) => {
        const x = (i + 1) * (width / (nodes.length + 1));
        const y = height / 2 + (Math.random() - 0.5) * 100;
        
        // Ping circle
        svg.append("circle")
           .attr("cx", x)
           .attr("cy", y)
           .attr("r", 5)
           .attr("fill", node.status === 'Active' ? '#22c55e' : '#eab308');
           
        // Label
        svg.append("text")
           .attr("x", x)
           .attr("y", y + 20)
           .attr("fill", "#666")
           .attr("font-size", "10px")
           .attr("text-anchor", "middle")
           .text(node.name || node.location);
    });
    
  }, [nodes]);

  return <svg ref={svgRef} className="rounded-xl border border-[#222] w-full" />;
};

export default NodeMap;
