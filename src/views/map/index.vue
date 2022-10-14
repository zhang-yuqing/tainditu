<template>
  <div class="mapWorld">
    <!-- 天地图demo -->
    <div id="mapWorld" class="map"></div>
    <div class="selectCon">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change="switchTab">
        <el-radio-button label="s">寿昌江</el-radio-button>
        <el-radio-button label="w">乌龙溪</el-radio-button>
        <el-radio-button label="l">涝村溪</el-radio-button>
      </el-radio-group>
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
export default {
  name: "MapWorld",
  data() {
    return {
      map: {},
      allPointsData:[],
      tabPosition:"s",
      // cesiumAsset:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYzViYmQ2OC01YjBhLTRiMmItYWQzZi1kYjZkM2M0OTk4NjIiLCJpZCI6MTEwOTY4LCJpYXQiOjE2NjU2MzgxMTd9.YEUwoqjdDuG6OzbZ561HgRNShNjhnvg0Cay3pHTaf8c"
    }
  },
  mounted() {
      // let script = document.createElement('script')
      // script.type = 'text/javascript'
      // script.src = 'http://api.tianditu.gov.cn/api?v=4.0&tk=13279a30017fa4105bcd5315ccd135d9'
      // document.body.appendChild(script);
      this.load();
      this.switchTab();
      
  },
  methods: {
    // 初始化天地图
    // initTdtMap(){
    //   this.tdtMap = new T.Map(this.tdtMapDivID)
    //   this.tdtMap.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12)
    // },
    
      load() {
        // const init = new Promise((resolve, reject) => {
        //     if(window.T) {
        //         // console.log('地图初始化成功')
        //         resolve(window.T)
        //         reject('error')
        //     }
        // })
        // init.then(T => {
        //     this.map = new T.Map('mapWorld');
        //     this.map.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12);
        //     //允许鼠标滚轮缩放地图
        //     this.map.enableScrollWheelZoom();
        // })
        // 劳村、寿昌两条溪流
      // this.initSurface(this.map, laocun.ObjItems[0].Object.ObjectDetail.Latlng);
      // this.initSurface(this.map, wulong.ObjItems[0].Object.ObjectDetail.Latlng);
      //创建线对象
      // let data = null;
      // data = shoucang.ObjItems[0].Object.ObjectDetail.Latlng;
      // // console.log(data)
      // if(data != null){
      //   let line = new window.T.Polyline(data);
      //   console.log(line);
      // }
      // this.initSurface(allPoint.ObjItems[0].Object.ObjectDetail.Latlng);
      // let lineOne = new window.T.Polyline(allPoint.ObjItems[0].Object.ObjectDetail.Latlng);
      // //向地图上添加线
      // this.map.addOverLay(lineOne);
      // let lineTwo = new window.T.Polyline(wulong.ObjItems[0].Object.ObjectDetail.Latlng);
      // //向地图上添加线
      // this.map.addOverLay(lineTwo);
      let imageURL = "http://t0.tianditu.gov.cn/img_w/wmts?" + "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" + "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=13279a30017fa4105bcd5315ccd135d9";
      //创建自定义图层对象
      let lay = new window.T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18});
      let config = {layers: [lay]};
      //初始化地图对象
      this.map = new window.T.Map("mapWorld", config);
      //向地图上添加线
      // this.map.addOverLay(line);
      

      // this.initSurface(shoucang.ObjItems[0].Object.ObjectDetail.Latlng);
      // this.initSurface(this.allPointsData);
      // this.initSurface(allPoint.ObjItems[0].Object.ObjectDetail.Latlng)
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
      this.map.centerAndZoom(new window.T.LngLat(119.224120, 29.360818), 12);
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
      // let line = new window.T.Polyline(obj, {
      //     color: "cyan",
      //     weight: 15,
      //     opacity: 0.4,
      //     fillColor: "#FFFFFF",
      //     fillOpacity: 0.5
      // });
      // this.map.addOverLay(line);
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
.mapWorld{
  width: 100%;
  height: 100%;
  position: relative;
  .map{
    width: 100%;
    height: 100%;
    // background-color: aquamarine;
  }
  .selectCon{
    position: absolute;
    top: 50px;
    right: 10px;
    width: 280px;
    z-index: 10010;
  }
}
</style>