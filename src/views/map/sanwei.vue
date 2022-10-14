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
      // Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
      // const viewer = new Cesium.Viewer('cesiumContainer', {
      //   selectionIndicator: false,
      //   infoBox: false,
      //   animation: false,
      //   baseLayerPicker: false,
      //   timeline: false,
      //   geocoder: false,
      //   homeButton: false,
      //   sceneModePicker: false,
      //   navigationHelpButton: false,
      //   orderIndependentTranslucency: false,
      //   contextOptions: {
      //     webgl: {
      //       alpha: true,
      //       preserveDrawingBuffer: true
      //     }
      //   },
      //   // imageryProvider: new Cesium.UrlTemplateImageryProvider({
      //   //   url: '//www.google.cn/maps/vt?lyrs=s@726&x={x}&y={y}&z={z}',
      //   //   enablePickFeatures: false,
      //   //   maximumLevel: 20
      //   // })
      // });
      //画出中国区域
      // Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTdmMTdmNS00NzZhLTQwOGMtODQwYy1kZjAyMzNiOTg0ZTYiLCJpZCI6MzMwMjQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTc4OTE3ODl9.yqF540oYBpSme38SIPKUP4t14FA6hXCLFHnvOqPf_Fw';
      // var viewer = new Cesium.Viewer('cesiumContainer', {
      //     geocoder:false, //一种地理位置搜索工具，用于显示相机访问的地理位置。默认使用微软的Bing地图。
      //     homeButton:true, //首页位置，点击之后将视图跳转到默认视角。
      //     sceneModePicker:true, //切换2D、3D 和 Columbus View (CV) 模式。
      //     baseLayerPicker:false, //选择三维数字地球的底图（imagery and terrain）。
      //     navigationHelpButton:true, //帮助提示，如何操作数字地球。
      //     animation:false,//控制视窗动画的播放速度。
      //     creditsDisplay:false, //展示商标版权和数据源。
      //     timeline:false, //展示当前时间和允许用户在进度条上拖动到任何一个指定的时间。
      //     fullscreenButton:true, //视察全屏按钮,
      //     terrainProvider: Cesium.createWorldTerrain()//地形
      // });
      // viewer.scene.globe.enableLighting = true;//启用以太阳为光源的地球


      // //var datasource = viewer.dataSources.add(Cesium.GeoJsonDataSource.load("https://geo.datav.aliyun.com/areas_v2/bound/100000.json"));
      // var datasource = viewer.dataSources.add(Cesium.GeoJsonDataSource.load("https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json"));
      // viewer.zoomTo(datasource);
      // let viewer = new Cesium.Viewer('cesiumContainer');
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