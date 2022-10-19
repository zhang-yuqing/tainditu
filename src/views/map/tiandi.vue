<template>
  <div class="sanWei">
    <!-- 天地图demo -->
    <div id="cesiumContainer" class="map"></div>
    <div class="selectCon">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change.native="switchTab">
        <el-radio-button label="sc">寿昌江</el-radio-button>
        <el-radio-button label="wulong">乌龙溪</el-radio-button>
        <el-radio-button label="laocun">涝村溪</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 视频弹窗 -->
		<div class="videoCon" v-if="isVideo">
      <div class="close"><i class="el-icon-close pointer" @click="isVideo = false"></i></div>
      <video :preload="preload" height="150px" width="260px" align="center" :controls="true"  :autoplay="autoplay">
          <source :src="videoSrc" type="video/mp4">
      </video>
    </div>
    <!-- 信息筛选 -->
    <div class="infoCon">
      <el-checkbox-group v-model="type" size="medium" @change="selectTypeFunc">
        <el-checkbox v-for="(item,i) in selectMapPoint" :key="i" :label="item.text" name="type">
          <span class="icon"><img :src="item.icon" alt=""></span>
          <span>{{item.text}}</span>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="textInfo" v-if="isShowInfo">
      <div class="close"><i class="el-icon-close pointer" @click="isShowInfo = false"></i></div>
      信息弹框
    </div>
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
//视频监控点
import laoXiCamera from './components/allPoints/laoXiCamera.json';
import shouChangCamera from './components/allPoints/shouChangCamera.json';
import wuLongCamera from './components/allPoints/wuLongCamera.json';
//污水处理厂数据
import sewage from './components/allPoints/sewage.json';
//流域基础信息和大同镇、航头镇、寿昌镇
import daTongZhen from './components/areaPoints/datongzhen.json';
import hangTouZhen from './components/areaPoints/hangtouzhen.json';
import shouChangZhen from './components/areaPoints/shouchang.json';
export default {
  name: "tianDiView",
  data() {
    return {
      cesiumAsset:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYzViYmQ2OC01YjBhLTRiMmItYWQzZi1kYjZkM2M0OTk4NjIiLCJpZCI6MTEwOTY4LCJpYXQiOjE2NjU2MzgxMTd9.YEUwoqjdDuG6OzbZ561HgRNShNjhnvg0Cay3pHTaf8c",
      tiandituTk:"13279a30017fa4105bcd5315ccd135d9",
      subdomains:['0','1','2','3','4','5','6','7'],
      viewer:"",
      Cesium:'',
      areaPoints:[],
      allPoint:[],
      tabPosition:'sc',
      cameraObj:[
        {cameraPoints:[]},//劳溪
        {cameraPoints:[]},//寿昌
        {cameraPoints:[]},//乌龙
      ],
      videoSrc:"https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1663655544809-city.mp4",
      preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      autoplay: '',
      isVideo:false,
      isShowInfo:false,
      type:[],
      selectMapPoint:[
        {text:"流域基础信息",icon:require('./components/Icon/point.png'),state:false,points:[]},
        {text:"污水处理厂",icon:require('./components/Icon/point.png'),state:false,points:[]},
        {text:"视频监控",icon:require('./components/Icon/camera.png'),state:false,points:[]},
      ],
      basicInfo:[],
    }
  },
  mounted(){
    this.initPointFunc();
    this.maoInit();
    // 
    //图标点击事件
    var handler = new this.cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    handler.setInputAction((click) => {
      var pick = this.viewer.scene.pick(click.position);
      //选中某模型   pick选中的对象
      console.log(pick)
      if(pick && pick.id){
        // alert(pick.id._code);
        console.log(pick.id._id)
        if(pick.id._id.indexOf('sc_') == 0 || pick.id._id.indexOf('wl_') == 0 || pick.id._id.indexOf('lx_') == 0) this.isVideo = true;
        if(pick.id._id.indexOf('sewage_') == 0) console.log(11111111), this.isShowInfo = true;
      }
    }, this.cesium.ScreenSpaceEventType.LEFT_CLICK  );

    //视频监控点位
    this.cameraObj.forEach(item => {
      item.cameraPoints.forEach( val => {
        this.selectMapPoint[2].points.push({point:[val.lng, val.lat],id:val.id});
      })
    });

    // 鼠标移入自定义弹出框
    // var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((movement) =>{
        let haveEn = this.viewer.scene.pick(movement.endPosition);
        haveEn == undefined ? "" : this.isShowAreaScopeInfo(haveEn.id._id);
        // if(viewer.scene.pickPositionSupported && Cesium.defined(haveEn) && haveEn.id !== ' '){
        //     clearAlpha();
        //     if(haveEn.id.polygon !== undefined){
        //         var haveEnsNow = haveEn.id.polygon._material._color.getValue();
        //         haveEnsNow.alpha = 1;
        //         haveEn.id.polygon._material._color.setValue(haveEnsNow);
        //     }
        // }
    },this.cesium.ScreenSpaceEventType.MOUSE_MOVE);
  },
  methods: {
    //加载并初始化point
    initPointFunc(){
      this.lngLatPoint('sc',shoucang.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('min',pointsOne.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('min',pointsTwo.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('min',pointsThree.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('min',pointsFour.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('min',pointsFive.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('min',pointsSix.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('min',pointsSeven.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('min',pointsEight.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('wulong',wulong.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('laocun',laocun.ObjItems[0].Object.ObjectDetail.Latlng);
      this.lngLatPoint('areaPoints',areaPoints.ObjItems[0].Object.ObjectDetail.Latlng);
      // 勾选区域
      this.lngLatPoint('daTongZhen',daTongZhen.ObjItems[0].Object.ObjectDetail.Latlng,new this.cesium.Color.fromCssColorString('#e02433').withAlpha(0.5),"大同镇");
      this.lngLatPoint('hangTouZhen',hangTouZhen.ObjItems[0].Object.ObjectDetail.Latlng,new this.cesium.Color.fromCssColorString('#24bde0').withAlpha(0.5),"航头镇");
      this.lngLatPoint('shouChangZhen',shouChangZhen.ObjItems[0].Object.ObjectDetail.Latlng,new this.cesium.Color.fromCssColorString('#e0c024').withAlpha(0.5),"寿昌镇");
      this.cameraPointsFunc('sewage',sewage.ObjItems);
      this.cameraPointsFunc("lx",laoXiCamera.ObjItems);
      this.cameraPointsFunc("sc",shouChangCamera.ObjItems);
      this.cameraPointsFunc("wl",wuLongCamera.ObjItems);
    },
    //鼠标移入显示的信息
    isShowAreaScopeInfo(id){
      if(id == "daTongZhen" || id == "hangTouZhen" ||id == "shouChangZhen"){
        console.log("显示"+id+"信息")
      }
    },
    //选中触发事件
    selectTypeFunc(){
      this.selectMapPoint.forEach(item => {
        item.state = false;
        if(item.text !== "流域基础信息"){
          this.type.forEach(val => {
            if(item.text == val){
              item.state = true;
            }
          })
          if(item.state){
            if(item.points.length != 0){
              item.points.forEach(val => {
                var ids = this.viewer.entities.getById(val.id);
                this.viewer.entities.remove(ids);
                this.addIconMarker([val.point[0], val.point[1]],val.id,item.text);
              })
            }
            return;
          }
          if(item.points.length != 0){
            item.points.forEach((temp) => {
              var ids = this.viewer.entities.getById(temp.id);
              this.viewer.entities.remove(ids);
            })
          }
        }
      })
      //基本信息面积覆盖
      if(this.type.includes('流域基础信息')){
        this.addScope();
      }else{
        this.basicInfo.forEach(item => {
          var tempId = this.viewer.entities.getById(item.id);
          this.viewer.entities.remove(tempId);
        })
      };
    },
    maoInit(){
      let Cesium = this.cesium;
      Cesium.Ion.defaultAccessToken = this.cesiumAsset;
      this.viewer = new Cesium.Viewer('cesiumContainer',{
        animation:false,       //动画
        homeButton:false,       //home键
        geocoder:false,         //地址编码
        baseLayerPicker:false, //图层选择控件
        timeline:false,        //时间轴
        fullscreenButton:true, //全屏显示
        infoBox:false,         //点击要素之后浮窗
        sceneModePicker:false,  //投影方式  三维/二维
        navigationInstructionsInitiallyVisible:false, //导航指令
        navigationHelpButton:false,     //帮助信息
        selectionIndicator:false, // 选择
        scene3DOnly: true,              // 每个几何实例将只能以3D渲染以节省GPU内存
        sceneMode: 3,                   // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
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
          destination: Cesium.Cartesian3.fromDegrees(119.224120, 29.360818, 60000),
          orientation: {
              heading :  Cesium.Math.toRadians(348.4202942851978),
              pitch : Cesium.Math.toRadians(-89.74026687972041),
              roll : Cesium.Math.toRadians(0)
          },
          complete:function callback() {
              // 定位完成之后的回调函数
              // console.log("中国")
          }
      });
      this.initLineFunc();
      this.switchTab();
    },
    
    addIconMarker(position,id,type) {
      let Cesium = this.cesium;
      this.viewer.entities.add({
        name: "",
        id: id,
        position: Cesium.Cartesian3.fromDegrees(position[0], position[1], 70.79132996761848),
        billboard: {
          image: type == '视频监控' ? require('./components/Icon/camera.png') : require('./components/Icon/point.png'),
          scale: 0.1,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset : new Cesium.Cartesian3( 0, 10 ),   //偏移量
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    },
    
    //河流切换
    switchTab(){
      var arr=[];
      this.allPoint.forEach(item => {
        if(item.name == "sc" || item.name == "wulong" || item.name == "laocun"){
          arr.push({name:item.name,data:item.data});
        }
      })
      arr.forEach(item => {
        this.viewer.entities.remove(this.viewer.entities.getById(item.name));
        if(item.name == this.tabPosition){
          this.paintingLine(item.name,item.data,5,new this.cesium.Color.fromCssColorString('#27a531'));
        }else{
          this.paintingLine(item.name,item.data,4,new this.cesium.Color.fromCssColorString('#1D8FE1'));
        }
      })
      // this.selectTypeFunc();
    },
    initLineFunc(){
      let Cesium = this.cesium;
      this.allPoint.forEach((item,i) => {
        if(item.name == "min"){
          this.paintingLine(item.name+'_'+i,item.data,1,new Cesium.Color.fromCssColorString('#1D8FE1'));
        }else if(item.name == "sc"){
          this.paintingLine(item.name,item.data,5,new Cesium.Color.fromCssColorString('#1D8FE1'));
        }else{
          this.paintingLine(item.name,item.data,3,new Cesium.Color.fromCssColorString('#1D8FE1'));
        }
      })
      this.paintingArea(this.areaPoints);
      

    },
    addScope(){
      this.basicInfo.forEach(item => {
        this.setAreaScope(item.id,item.data,item.areaColor,item.name)
      })
    },
    // 设置区域范围
    setAreaScope(id,data,areaColor,name){
      let redPolygon = this.viewer.entities.add({
        id:id,
        name : 'Wyoming',
        polygon : {
          hierarchy:this.cesium.Cartesian3.fromDegreesArray(data),
          height : 0,
          material : areaColor,
          outline : true,
          outlineColor : this.cesium.Color.BLACK
        }
      });
      let polyPositions = redPolygon.polygon.hierarchy.getValue(this.cesium.JulianDate.now()).positions;
      let polyCenter = this.cesium.BoundingSphere.fromPoints(polyPositions).center;//中心点
      polyCenter = this.cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
      redPolygon.position = polyCenter;
      redPolygon.label={
          // position:
          text:name,
          color : this.cesium.Color.fromCssColorString('#000'),
          font:'32px',
          showBackground : false,
          scale : 1,
          horizontalOrigin : this.cesium.HorizontalOrigin.CENTER,
          verticalOrigin : this.cesium.VerticalOrigin.LEFT,
          disableDepthTestDistance : 1000.0,
          pixelOffset:new this.cesium.Cartesian3(60,50),
          eyeOffset: new this.cesium.Cartesian3(0, 0, -550),
      };
      this.viewer.zoomTo(this.viewer.entities);
    },
    
    //划线
    paintingLine(ids,data,wid,color){
      this.viewer.entities.add({
        id:ids,
        polyline: {
          positions: this.cesium.Cartesian3.fromDegreesArray(data),// fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。 
          width: wid, // 宽度
          material:color,// 线的颜色
          zIndex: 10,// 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
          show: true// 是否显示
        }
      });
      this.viewer.entities._id = ids;
    },
    //外围线
    paintingArea(data){
      this.viewer.entities.add({
        polyline: {
          positions: this.cesium.Cartesian3.fromDegreesArray(data),// fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。 
          width: 10, // 宽度
          material: new this.cesium.Color.fromCssColorString('#23624b').withAlpha(0.3), // 线的颜色
          zIndex: 20,// 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
          show: true // 是否显示
        }
      });
      this.viewer.entities.add({
        polyline: {
          positions: this.cesium.Cartesian3.fromDegreesArray(data),// fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。 
          width: 7,// 宽度
          material:new this.cesium.Color.fromCssColorString('#23624b').withAlpha(0.2),// 线的颜色
          zIndex: 15,// 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
          show: true // 是否显示
        }
      });
      this.viewer.entities.add({
        polyline: {
          positions: this.cesium.Cartesian3.fromDegreesArray(data),// fromDegrees返回给定的经度和纬度值数组（以度为单位），该数组由Cartesian3位置组成。 
          width: 4,// 宽度
          material:new this.cesium.Color.fromCssColorString('#23624b').withAlpha(0.9),// 线的颜色
          zIndex: 2,// 线的顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
          show: true // 是否显示
        }
      });
    },
    //经纬度点
    lngLatPoint(type,data,color,name){
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
      if(type == "daTongZhen" || type == "hangTouZhen" || type == "shouChangZhen"){
        this.basicInfo.push({id:type,data:obj,areaColor:color,name});
        return;
      }
      if(type != "areaPoints"){
        this.allPoint.push({name:type,data:obj});
      }else {
        this.areaPoints = obj;
      }
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
    //监控点经纬度数据处理
    cameraPointsFunc(type,data){
      let obj = [];
      data.forEach((item,i)=>{
        let lng = item.Object.ObjectDetail.Lng;
        let lat = item.Object.ObjectDetail.Lat;
        const { dt_lng,dt_lat } = this.gaoDtMap(lng,lat);
        obj.push({lng:dt_lng,lat:dt_lat,id:type + "_"+i});
      })
      switch(type){
        case "lx":
          this.cameraObj[0].cameraPoints = obj;
          break;
        case "sc":
          this.cameraObj[1].cameraPoints = obj;
          break;
        case "wl":
          this.cameraObj[2].cameraPoints = obj;
          break;
        case "sewage":
          obj.forEach( val => {
            this.selectMapPoint[1].points.push({point:[val.lng, val.lat],id:val.id});
          })
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
  .selectCon{
    position: absolute;
    top: 50px;
    right: 10px;
    width: 280px;
    z-index: 10010;
  }
  .videoCon{
    position: absolute;
    top: 10%;
    width: 50%;
    height: 60%;
    background: white;
    left: 25%;
    video{
      width: 100%;
      height: 93%;
    }
    
  }
  .infoCon{
    position: absolute;
    bottom: 50px;
    right: 25%;
    width: 200px;
    // height: 400px;
    font-size: 22px;
    background: #1d8fe163;
    padding: 10px 20px;
    .icon{
      width: 20px;
      height: 20px;
      img{
        width: 20px;
        height: 15px;
      }
    }
  }
  .textInfo{
    position: absolute;
    top: 150px;
    left: 45%;
    width: 200px;
    height: 500px;
    background-color: aquamarine;
  }
  .close{
    text-align: right;
    font-size: 30px;
    font-weight: bold;
  }
}
:deep(.el-checkbox__label){
  font-size: 18px;
  color: aliceblue;
}
:deep(.el-checkbox__inner){
  width: 18px;
  height: 18px;
}
:deep(.el-checkbox){
  float: left;
  height: 30px;
  line-height: 30px;
}
:deep(.el-checkbox__inner::after){
  width: 6px !important;
  height: 10px !important;
}
</style>