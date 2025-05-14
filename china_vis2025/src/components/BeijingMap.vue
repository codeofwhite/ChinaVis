<!-- BeijingMap.vue -->
<template>
  <svg ref="mapSvg" width="800" height="600"></svg>
</template>

<script>
import * as d3 from "d3";

export default {
  props: ["mapData", "colorScaleConfig"],
  emits: ["area-clicked"], // 向父组件发出点击事件
  data() {
    return {
      svg: null,
      projection: null,
      path: null,
      colorScale: null,
      beijingFeatures: null,
    };
  },
  async mounted() {
    this.svg = d3.select(this.$refs.mapSvg);
    const geoJson = await d3.json(
      "./beijing_geojson_filer/北京市区geojson地图文件/北京.json"
    );
    this.beijingFeatures = geoJson.features;
    this.initMap();
    this.drawMap();
  },
  methods: {
    initMap() {
      this.projection = d3.geoIdentity().reflectY(true).fitSize([800, 600], {
        type: "FeatureCollection",
        features: this.beijingFeatures,
      });
      this.path = d3.geoPath().projection(this.projection);
      this.colorScale = d3
        .scaleLinear()
        .domain(this.colorScaleConfig.domain)
        .range(this.colorScaleConfig.range);
      this.svg.append("g").attr("class", "map-layer");
    },
    drawMap() {
      const mapLayer = this.svg.select(".map-layer");
      const dataMap = new Map(
        this.mapData.map((item) => [item.name, item.value])
      );

      const areas = mapLayer
        .selectAll("path")
        .data(this.beijingFeatures, (d) => d.properties.name);

      areas
        .enter()
        .append("path")
        .attr("d", this.path)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .on("click", (event, d) => {
          this.$emit("area-clicked", d.properties.name);
        })
        .merge(areas)
        .attr("fill", (d) => {
          const val = dataMap.get(d.properties.name);
          return val !== undefined ? this.colorScale(val) : "#ccc";
        });

      areas.exit().remove();

      // 区域名称标注
      const labels = mapLayer
        .selectAll("text")
        .data(this.beijingFeatures, (d) => d.properties.name);
      labels
        .enter()
        .append("text")
        .attr("x", (d) => this.projection(d.properties.centroid)[0])
        .attr("y", (d) => this.projection(d.properties.centroid)[1])
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text((d) => d.properties.name)
        .merge(labels);
    },
  },
};
</script>
