import React, { useEffect, useRef, useState } from "react";
import "../styles/graphVisulization.scss";
import { useSave } from "../hooks/useSave";
import * as d3 from "d3";

const GraphVisualization = () => {
  const [stats, setStats] = useState({
    totalNodes: 0,
    densityIndex: 0,
    topCluster: "",
    activeInsights: 0,
  });
  const ref = useRef();
  const { getGraphData } = useSave();

  const fetchData = async () => {
    const res = await getGraphData();
    console.log(res);

    const totalNodes = res.nodes.length;
    const totalLinks = res.links.length;

    const densityIndex =
      totalNodes > 1 ? (2 * totalLinks) / (totalNodes * (totalNodes - 1)) : 0;

    const clusterCount = {};
    res.nodes.forEach((n) => {
      if (n.tags) {
        n.tags.forEach((tag) => {
          clusterCount[tag] = (clusterCount[tag] || 0) + 1;
        });
      }
    });
    const topCluster =
      Object.entries(clusterCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

    const activeInsights = res.nodes.filter(
      (n) =>
        n.createdAt &&
        new Date() - new Date(n.createdAt) < 7 * 24 * 60 * 60 * 1000,
    ).length;

    setStats({ totalNodes, densityIndex, topCluster, activeInsights });

    renderGraph(res);
  };

  const renderGraph = (data) => {
    const width = 1200;
    const height = 800;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 4])
      .filter((event) => {
        return (
          !event.ctrlKey &&
          !event.button &&
          (event.type === "wheel" ||
            event.type === "mousedown" ||
            event.type === "touchstart" ||
            event.type === "touchmove")
        );
      })
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const defaultScale = window.innerWidth < 768 ? 1.8 : 1.4;

    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(defaultScale)
        .translate(-width / 2, -height / 2),
    );

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.links)
          .id((d) => d.id)
          .distance((d) => 220 - (d.strength || 0.5) * 120),
      )
      .force("charge", d3.forceManyBody().strength(-180))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(25))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

    const link = g
      .append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .style("stroke", "#999");

    const node = g
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 8)
      .style("fill", (d) => color(d.group))
      .call(
        d3
          .drag()
          .on("start", dragStart)
          .on("drag", dragging)
          .on("end", dragEnd),
      );

    node.on("mouseover", (event, hoveredNode) => {
      link.style("stroke-opacity", (l) =>
        l.source.id === hoveredNode.id || l.target.id === hoveredNode.id
          ? 1
          : 0.1,
      );

      node.style("opacity", (n) =>
        n.id === hoveredNode.id ||
        data.links.some(
          (l) =>
            (l.source.id === hoveredNode.id && l.target.id === n.id) ||
            (l.target.id === hoveredNode.id && l.source.id === n.id),
        )
          ? 1
          : 0.2,
      );
    });

    node.on("mouseout", () => {
      link.style("stroke-opacity", 0.6);
      node.style("opacity", 1);
    });

    node.on("click", (event, clickedNode) => {
      simulation.alphaTarget(0.3).restart();

      data.nodes.forEach((n) => {
        if (n.id === clickedNode.id) {
          n.fx = width / 2;
          n.fy = height / 2;
        } else {
          n.fx = null;
          n.fy = null;
        }
      });
    });

    const label = g
      .append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text((d) => d.title.slice(0, 20))
      .style("font-size", window.innerWidth < 768 ? 14 : 12)
      .attr("font-size", 10);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x + 10).attr("y", (d) => d.y);
    });

    simulation.on("end", () => {
      const bounds = svg.node().getBBox();
      const parent = svg.node().parentElement;

      const fullWidth = parent.clientWidth;
      const fullHeight = parent.clientHeight;

      const width = bounds.width;
      const height = bounds.height;

      const midX = bounds.x + width / 2;
      const midY = bounds.y + height / 2;

      const scale = 0.85 / Math.max(width / fullWidth, height / fullHeight);

      const translate = [
        fullWidth / 2 - scale * midX,
        fullHeight / 2 - scale * midY,
      ];

      svg
        .transition()
        .duration(750)
        .call(
          d3.zoom().transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale),
        );
    });

    function dragStart(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragging(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnd(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="graph-container">
      <div className="graph-wrapper">
        <div className="graph-grid">
          <svg
            className="graph-svg"
            ref={ref}
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%" }}
          ></svg>
        </div>


        <div className="node-legend">
          <div className="legend-item">
            <div className="dot"></div>
            <span>Nodes</span>
          </div>
          <div className="legend-item">
            <div className="line"></div>
            <span>Relationship</span>
          </div>
        </div>
      </div>

      <div className="graph-footer">
        <div className="stat-card">
          <p className="label">Total Nodes</p>
          <p className="value">{stats.totalNodes}</p>
        </div>
        <div className="stat-card">
          <p className="label">Density Index</p>
          <p className="value">{stats.densityIndex.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="label">Top Cluster</p>
          <p className="value">{stats.topCluster || "-"}</p>
        </div>
        <div className="stat-card active">
          <p className="label">Active Insights</p>
          <div className="active-value">
            <p>{stats.activeInsights} New</p>
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;
