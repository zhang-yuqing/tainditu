<template>
  <div class="indexHome">
    <el-container style="height:100%;width: 100%;">
      <el-aside width="300px" height="100%">
        <NavMenu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '../components/nav.vue'
export default {
  name: "indexHome",
  data() {
    return {}
  },
  components:{
    NavMenu
  },
  
  methods: {}
}
</script>

<style lang="less" scoped>
.indexHome{
  height: 100%;
  width: 100%;
}
.el-main{
  padding: 0 !important;
}
</style>