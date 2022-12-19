<template>
  <div>
    <TableComponent :tableArr="tableArr"></TableComponent>
  </div>
</template>

<script>
import TableComponent from './component/tableTemp.vue'
export default {
  name: "",
  data() {
    return {
      tableArr:[{name:"年份"}]
    }
  },
  components:{
    TableComponent
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>