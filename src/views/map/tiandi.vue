<template>
  <div class="sanWei">
    <!-- 天地图demo -->
    <div id="cesiumContainer" class="map"></div>
  </div>
</template>

<script>
//引入所有的溪流point
import pointsOne from './components/allPoints/1.json';
import pointsTwo from './components/allPoints/2.json';
import pointsThree from './components/allPoints/3.json';
import pointsFour from './components/allPoints/4.json';
import pointsFive from './components/allPoints/5.json';
import pointsSix from './components/allPoints/6.json';
import pointsSeven from './components/allPoints/7.json';
import pointsEight from './components/allPoints/8.json';
//项目中三条溪流point
import shoucang from './components/shoucang.json'; // 寿昌江
import wulong from './components/wulong.json'; // 乌龙江
import laocun from './components/laocun.json'; // 涝村江
//引入绘制面point
import areaPoints from './components/allPoints/area.json';
export default {
  name: "tianDiView",
  data() {
    return {
      cesiumAsset:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYzViYmQ2OC01YjBhLTRiMmItYWQzZi1kYjZkM2M0OTk4NjIiLCJpZCI6MTEwOTY4LCJpYXQiOjE2NjU2MzgxMTd9.YEUwoqjdDuG6OzbZ561HgRNShNjhnvg0Cay3pHTaf8c",
      tiandituTk:"13279a30017fa4105bcd5315ccd135d9",
      subdomains:['0','1','2','3','4','5','6','7'],
      viewer:"",
      Cesium:'',
      shouchang:[],
      pointsOne:[],
      pointsTwo:[],
      pointsThree:[],
      pointsFour:[],
      pointsFive:[],
      pointsSix:[],
      pointsSeven:[],
      pointsEight:[],
      wulong:[],
      laocun:[],
      areaPoints:[],
    }
  },
  mounted(){
    this.lngLatPoint('sc',shoucang.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('pointsOne',pointsOne.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('pointsTwo',pointsTwo.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('pointsThree',pointsThree.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('pointsFour',pointsFour.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('pointsFive',pointsFive.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('pointsSix',pointsSix.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('pointsSeven',pointsSeven.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('pointsEight',pointsEight.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('wulong',wulong.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('laocun',laocun.ObjItems[0].Object.ObjectDetail.Latlng);
    this.lngLatPoint('areaPoints',areaPoints.ObjItems[0].Object.ObjectDetail.Latlng);
    this.maoInit();
  },
  methods: {
    maoInit(){
      const _that = this;
      let Cesium = this.cesium;
      Cesium.Ion.defaultAccessToken = this.cesiumAsset;
      this.viewer = new Cesium.Viewer('cesiumContainer',{
        animation:false,       //动画
        homeButton:true,       //home键
        geocoder:true,         //地址编码
        baseLayerPicker:false, //图层选择控件
        timeline:false,        //时间轴
        fullscreenButton:true, //全屏显示
        infoBox:true,         //点击要素之后浮窗
        sceneModePicker:true,  //投影方式  三维/二维
        navigationInstructionsInitiallyVisible:false, //导航指令
        navigationHelpButton:false,     //帮助信息
        selectionIndicator:false, // 选择
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          //影像底图
          url: "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="+this.tiandituTk,
          subdomains: this.subdomains,
          layer: "tdtImgLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",//使用谷歌的瓦片切片方式
          show: true
        })
      });
      this.viewer._cesiumWidget._creditContainer.style.display = "none";  // 隐藏cesium ion
      this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({   
        //影像注记
        url: "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk="+this.tiandituTk,
        subdomains: this.subdomains,
        layer: "tdtCiaLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: true
      }));

      // 将三维球定位到中国 17850000
      this.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(119.224120, 29.360818, 100000),
          orientation: {
              heading :  Cesium.Math.toRadians(348.4202942851978),
              pitch : Cesium.Math.toRadians(-89.74026687972041),
              roll : Cesium.Math.toRadians(0)
          },
          complete:function callback() {
              // 定位完成之后的回调函数
              console.log("中国")
              // _that.load();
            
          }
      });
      // this.viewer.entities.add({
      //   polyline: {
      //     // fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。 
      //     positions: Cesium.Cartesian3.fromDegreesArray(this.shouchang),
      //     // 宽度
      //     width: 2,
      //     // 线的颜色
      //     material: Cesium.Color.WHITE,
      //     // 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
      //     zIndex: 10,
      //     // 是否显示
      //     show: true
      //   }
      // });
      // this.viewer.entities.add({
      //   polyline: {
      //     // fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。 
      //     positions: Cesium.Cartesian3.fromDegreesArray(this.pointsOne),
      //     // 宽度
      //     width: 2,
      //     // 线的颜色
      //     material: Cesium.Color.WHITE,
      //     // 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
      //     zIndex: 10,
      //     // 是否显示
      //     show: true
      //   }
      // });
      this.paintingLine(this.shouchang,5);
      this.paintingLine(this.wulong,3);
      this.paintingLine(this.laocun,3);
      this.paintingLine(this.pointsOne,1);
      this.paintingLine(this.pointsTwo,1);
      this.paintingLine(this.pointsThree,1);
      this.paintingLine(this.pointsFour,1);
      this.paintingLine(this.pointsFive,1);
      this.paintingLine(this.pointsSix,5);
      this.paintingLine(this.pointsSeven,1);
      this.paintingLine(this.pointsEight,1);
      this.paintingLine(this.areaPoints,8);
      // Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
      // const viewer = new Cesium.Viewer('cesiumContainer', {
      // selectionIndicator: false,
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
      // });

      // viewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
    },
    //划线
    paintingLine(data,wid){
      this.viewer.entities.add({
        polyline: {
          // fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。 
          positions: this.cesium.Cartesian3.fromDegreesArray(data),
          // 宽度
          width: wid,
          // 线的颜色
          material: this.cesium.Color.WHITE,
          // 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
          zIndex: 10,
          // 是否显示
          show: true
        }
      });
    },
    //经纬度点
    lngLatPoint(type,data){
      let arrO = [], arrJ = [], lng,lat,obj=[];
      data.forEach((item,i)=>{
          if(i%2){
            lng = item;
            arrO.push(item);
            const { dt_lng,dt_lat } = this.gaoDtMap(lng,lat);
            obj.push(dt_lng,dt_lat);
          }else{
            lat = item;
            arrJ.push(item);
          }
      })
      switch(type){
        case "sc":
          this.shouchang = obj;
          break;
        case "pointsOne":
          this.pointsOne = obj;
          break;
        case "pointsTwo":
          this.pointsTwo = obj;
          break;
        case "pointsThree":
          this.pointsThree = obj;
          break;
        case "pointsFour":
          this.pointsFour = obj;
          break;
        case "pointsFive":
          this.pointsFive = obj;
          break;
        case "pointsSix":
          this.pointsSix = obj;
          break;
        case "pointsSeven":
          this.pointsSeven = obj;
          break;
        case "pointsEight":
          this.pointsEight = obj;
          break;
        case "wulong":
          this.wulong = obj;
          break;
        case "laocun":
          this.laocun = obj;
          break;
        case "areaPoints":
          this.areaPoints = obj;
          break;
      }
    },
     
    aryJoinAry(ary,ary2) {
      var minLength;
      let itemArys = [];
      let itemAry = [];
      //先拿到两个数组中长度较短的那个数组的长度
      if(ary.length>ary2.length){
          minLength=ary2.length;
      }
      else{
          minLength=ary.length;
      }
      //将两个数组中较长的数组记录下来
      var longAry=arguments[0].length>arguments[1].length?arguments[0]:arguments[1];
      //循环范围为较短的那个数组的长度
      for (var i = 0; i < minLength; i++) {
          //将数组放入临时数组中
          itemAry.push(ary[i]);
          itemAry.push(ary2[i])
      }
      itemArys.push(itemAry.concat(longAry.slice(minLength)))

      //itemAry和多余的新数组拼接起来并返回。
      return itemAry.concat(longAry.slice(minLength));
    },
    load() {
      console.log("加载绘画数据")
      // let imageURL = "http://t0.tianditu.gov.cn/img_w/wmts?" + "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" + "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=13279a30017fa4105bcd5315ccd135d9";
      // //创建自定义图层对象
      // let lay = new window.T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18});
      // let config = {layers: [lay]};
      // //初始化地图对象
      // this.map = new window.T.Map("mapWorld", config);
      //绘制区域面
      this.drawSurface(areaPoints.ObjItems[0].Object.ObjectDetail.Latlng);

      //添加溪流
      this.initSurface("line",pointsOne.ObjItems[0].Object.ObjectDetail.Latlng,1,"#1D8FE1");
      this.initSurface("line",pointsTwo.ObjItems[0].Object.ObjectDetail.Latlng,1,"#1D8FE1");
      this.initSurface("line",pointsThree.ObjItems[0].Object.ObjectDetail.Latlng,1,"#1D8FE1");
      this.initSurface("line",pointsFour.ObjItems[0].Object.ObjectDetail.Latlng,1,"#1D8FE1");
      this.initSurface("line",pointsFive.ObjItems[0].Object.ObjectDetail.Latlng,1,"#1D8FE1");
      this.initSurface("line",pointsSix.ObjItems[0].Object.ObjectDetail.Latlng,1,"#1D8FE1");
      this.initSurface("line",pointsSeven.ObjItems[0].Object.ObjectDetail.Latlng,1,"#1D8FE1");
      this.initSurface("line",pointsEight.ObjItems[0].Object.ObjectDetail.Latlng,1,"#1D8FE1");
      this.initSurface("line",shoucang.ObjItems[0].Object.ObjectDetail.Latlng,5,"#1D8FE5");
      this.initSurface("line",wulong.ObjItems[0].Object.ObjectDetail.Latlng,5,"#1D8FE1");
      this.initSurface("line",laocun.ObjItems[0].Object.ObjectDetail.Latlng,5,"#1D8FE1");
      //设置显示地图的中心点和级别
      // this.map.centerAndZoom(new window.T.LngLat(119.224120, 29.360818), 12);
      //允许鼠标滚轮缩放地图
      this.map.enableScrollWheelZoom();
    },
    // 经纬度转天地图纬度
    gaoDtMap(gd_lon,gd_lat) {
      var PI = 3.14159265358979324 * 3000.0 / 180.0;
      var x = gd_lon, y = gd_lat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * PI);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * PI);
      var dt_lng  = z * Math.cos(theta) - 0.005;
      var dt_lat  = z * Math.sin(theta) + 0.0028;
      return {
        dt_lng: dt_lng,
        dt_lat: dt_lat
      };
    },
    // 河流
    initSurface(type,arr,wid,color) {
      let obj = [], lng,lat;
      arr.forEach((item,i) => {
        if(i%2){
          lng = item;
          // const { dt_lng,dt_lat } = this.gaoDeToBaidu(lng,lat);
          // obj.push(new window.T.Polyline(dt_lng,dt_lat));
          const { dt_lng,dt_lat } = this.gaoDtMap(lng,lat);
          obj.push(new window.T.LngLat(dt_lng,dt_lat));
          // obj.push(new window.T.LngLat(lng,lat));
        }else{
          lat = item;
        }
      })
      let line = new window.T.Polyline(obj, {
          color: color,
          weight: wid,
          opacity: 0.8,
          fillColor: "#FFFFFF",
          fillOpacity: 0.9
      });
      this.map.addOverLay(line);
    },
    //绘制面
    drawSurface(arr){
      let obj = [], lng,lat;
      arr.forEach((item,i) => {
        if(i%2){
          lng = item;
          const { dt_lng,dt_lat } = this.gaoDtMap(lng,lat);
          obj.push(new window.T.LngLat(dt_lng,dt_lat));
        }else{
          lat = item;
        }
      })
      // 边界线
      // eslint-disable-next-line no-undef
      var border = new window.T.Polyline(obj, {
        color: '#22E1FF',
        weight: 25,
        opacity: 0.3,
      });
      this.map.addOverLay(border);
      
      // eslint-disable-next-line no-undef
      var border1 = new window.T.Polyline(obj, {
        color: '#1D8FE1',
        weight: 20,
        opacity: 0.2,
      });
      this.map.addOverLay(border1);

      // eslint-disable-next-line no-undef
      var border2 = new window.T.Polyline(obj, {
        color: '#1D8FE1',
        weight: 10,
        opacity: 0.9,
      });
      this.map.addOverLay(border2);
    },
    switchTab(){
      this.initSurface("line",shoucang.ObjItems[0].Object.ObjectDetail.Latlng,5,"#1D8FE5");
      this.initSurface("line",wulong.ObjItems[0].Object.ObjectDetail.Latlng,5,"#1D8FE1");
      this.initSurface("line",laocun.ObjItems[0].Object.ObjectDetail.Latlng,5,"#1D8FE1");
      switch(this.tabPosition){
        case "s":
          this.initSurface("line",shoucang.ObjItems[0].Object.ObjectDetail.Latlng,5,"red");
          break;
        case "l":
          this.initSurface("line",laocun.ObjItems[0].Object.ObjectDetail.Latlng,5,"red");
          break;
        case "w":
          this.initSurface("line",wulong.ObjItems[0].Object.ObjectDetail.Latlng,5,"red");
          break;
      }
      
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