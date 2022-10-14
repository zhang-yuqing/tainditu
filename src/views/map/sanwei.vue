<template>
  <div class="sanWei">
    <!-- 天地图demo -->
    <div id="cesiumContainer" class="map"></div>
  </div>
</template>

<script>
export default {
  name: "tianDiView",
  data() {
    return {}
  },
  mounted(){
    this.maoInit();
  },
  methods: {
    maoInit(){
      let Cesium = this.cesium
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
      const viewer = new Cesium.Viewer('cesiumContainer', {
        selectionIndicator: false,
        infoBox: false,
        animation: false,
        baseLayerPicker: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true,
            preserveDrawingBuffer: true
          }
        },
        // imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //   url: '//www.google.cn/maps/vt?lyrs=s@726&x={x}&y={y}&z={z}',
        //   enablePickFeatures: false,
        //   maximumLevel: 20
        // })
      });

      // let viewer = new Cesium.Viewer('cesiumContainer');
      viewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
    },
  }
}
</script>

<style lang="less" scoped>
.sanWei{
  width: 100%;
  height: 100%;
  position: relative;
  .map{
    width: 100%;
    height: 100%;
    background-color: aquamarine;
  }
}
</style>