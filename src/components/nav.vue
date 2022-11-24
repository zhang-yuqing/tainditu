<template>
  <div class="nav h-100">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo h-100"
      @open="handleOpen"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      :unique-opened="true"
      active-text-color="#ffd04b">
      <template v-for="(menu,i) in navArr">
        <el-submenu :key="menu.name" :index="menu.path" v-if="menu.children">
          <template slot="title">
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="menuItem in menu.children" :key="menuItem.name" :index="menuItem.path">{{menuItem.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :key="i" :index="menu.path" v-else>
          <template slot="title">
            <span>{{menu.name}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navName",
  data() {
    return {
      navArr:[
        {name:"地图",path:'/tiandi',
          children:[
            {name:'天地图',path:'/tiandi'},
            {name:'三维地图',path:'/sanwei'},
            {name:'完整版三维地图',path:'/complete'},
            {name:'勾选显示不同区域面三维地图',path:'/map'},
          ]
        },
        {name:"封装引用",path:'/parameter',
          children:[
            {name:"函数引用",path:'/parameter'}
          ]
        },
      ],
    }
  },
  methods: {
    handleOpen(key) {
      this.$router.push({
        path: key,
      });
    },
    handleSelect(key, keyPath) {
      this.$router.push({
        path: key,
      });
    },
  }
}
</script>

<style lang="less" scoped>

</style>