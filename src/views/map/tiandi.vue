<template>
  <div class="mapWorld">
    <!-- 天地图demo -->
    <div id="mapWorld" class="map"></div>
  </div>
</template>

<script>
export default {
  name: "tianDiView",
  data() {
    return {}
  },
  methods: {}
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
    background-color: aquamarine;
  }
}
</style>