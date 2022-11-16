<template>
  <div class="hello">
    <el-tag type="danger" @click="jump('/tiandi')">天地图</el-tag>
    <el-tag type="success" @click="jump('/sanwei')">三维地图</el-tag>
    <el-tag type="info" @click="jump('/map')">勾选显示不同区域面三维地图</el-tag>
    <el-tag type="warning" @click="jump('/complete')">三维地图</el-tag>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    jump(state){
      this.$router.push(state);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-tag{
  margin-right: 20px;
}
</style>
