<template>
  <div class="butCon">
    <!--提交按钮-->
    <div v-if="btnObj.type === 'sub'"> 
      <el-button type="info" class="btnStyle" size="small" @click="cancelFunc">取消</el-button> <el-button type="primary" class="btnStyle" size="small" @click="confirmFunc">确认</el-button>
    </div>
    <div v-if="btnObj.type === 'add'">
      <el-button type="primary" :style="{width:btnObj.width != undefined ? btnObj.width+'px' : ''}" size="small" @click="addFunc">添加</el-button>
    </div>
    <div v-if="btnObj.type === 'cancel'">
      <el-button type="info" @click="cancelFunc" :style="{width:btnObj.width != undefined ? btnObj.width+'px' : ''}" size="small">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "butTemp",
  data() {
    return {}
  },
  props:{
    btnObj:{
      type:Object,
      require:true
    }
  },
  methods: {
    cancelFunc(){
      console.log("取消")
    },
    confirmFunc(){},
    addFunc(){
      this.$emit('addInfo')
    },
  }
}
</script>

<style lang="less" scoped>
.btnStyle{
  width: 200px;
}
</style>