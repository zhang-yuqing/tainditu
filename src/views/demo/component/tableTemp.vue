<template>
  <div class="tabView">
    <el-table :data="dataArr" :max-height="height" style="width: 100%" :header-cell-style="{background:'#eee'}">
      <template v-for="item in tableArr">
        <el-table-column :key="item.type" v-if="item.type != 'scope'" :prop="item.type" :label="item.label" :width="`${item.width != undefined ? item.width + 'px': ''}`"></el-table-column>
        <el-table-column :key="item.type" v-if="item.type == 'scope'" :prop="item.type" :label="item.label" :width="`${item.width != undefined ? item.width + 'px': ''}`" fixed="right" align="center">
          <template slot-scope="scope">
            <slot :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "tabView",
  data() {
    return {}
  },
  props:{
    tableArr:{
      type:Array,
      require:true
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>