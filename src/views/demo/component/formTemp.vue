<template>
  <div class="formView">
    <el-form ref="formInfo" :model="formObj" :rules="rulesObj" label-width="80px">
      <el-row v-for="(item,i) in formArr" :key="i">
        <el-col>
          <!-- 一行一列 s -->
          <el-form-item :label="formatLabel(item)" :prop="item.bindVal"  :label-width="item.width != undefined ? item.width+'px' : '100px'">
            <!--input 输入框 s -->
            <el-input v-if="item.type === 'input'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" class="w-100" @change="(e)=>{ inputChange(item.bindVal,e) }"></el-input>
            <!--input 输入框 e -->

            <!--input 输入框带单位 s -->
            <el-input v-if="item.type === 'inputUnit'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" class="w-100" @change="(e)=>{ inputChange(item.bindVal,e) }"><template> {{item.unit}} </template></el-input>
            <!--input 输入框带单位 e -->

            <!-- 年份选择 s -->
            <el-date-picker v-if="item.type == 'year'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" value-format="yyyy" type="year" :placeholder="`${item.placeholder || '请选择年份'}`" class="w-100" @change="(e)=>{ selectTimeChange(item.bindVal,e) }"></el-date-picker>
            <!-- 年份选择 e -->

            <!-- 日期选择 s -->
            <el-date-picker v-if="item.type == 'date'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" value-format="yyyy-MM-dd HH:mm:ss" type="date" :placeholder="`${item.placeholder || '请选择日期'}`" class="w-100" @change="(e)=>{ selectTimeChange(item.bindVal,e) }"></el-date-picker>
            <!-- 日期选择 e -->

            <!-- 日期时间 s -->
            <el-date-picker v-if="item.type == 'datetime'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="`${item.placeholder || '请选择日期'}`" class="w-100" @change="(e)=>{ selectTimeChange(item.bindVal,e) }"></el-date-picker>
            <!-- 日期时间 e -->

            <!-- 日期区间 s -->
            <el-date-picker v-if="item.type == 'daterange'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="w-100" @change="(e)=>{ selectTimeChange(item.bindVal,e) }"></el-date-picker>
            <!-- 日期区间 e -->

            <!-- 时间 s -->
            <el-time-picker v-if="item.type == 'time'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" value-format="HH:mm:ss" :placeholder="`${item.placeholder || '请选择时间'}`" class="w-100" @change="(e)=>{ selectTimeChange(item.bindVal,e) }"></el-time-picker>
            <!-- 时间 e -->

            <!-- select 输入框 s -->
            <el-select v-if="item.type === 'select'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" :placeholder="`${item.placeholder || '请选择'}`" clearable  class="w-100" @change="(e)=>{ selectChange(item.bindVal,e) }">
              <el-option v-for="(sel,idx) in item.children" :key="idx" :label="sel.label" :value="sel.value"></el-option>
            </el-select>
            <!-- select 输入框 e -->

            <!-- select 多选输入框 s -->
            <el-select v-if="item.type === 'moreSelect'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" :placeholder="`${item.placeholder || '请选择'}`" multiple class="w-100" @change="(e)=>{ selectChange(item.bindVal,e) }">
              <el-option v-for="(sel,idx) in item.children" :key="idx" :label="sel.label" :value="sel.value"></el-option>
            </el-select>
            <!-- select 多选输入框 e -->

            <!-- select 可搜索输入框 s -->
            <el-select v-if="item.type === 'searchSelect'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" :placeholder="`${item.placeholder || '请选择'}`" filterable class="w-100" @change="(e)=>{ selectChange(item.bindVal,e) }">
              <el-option v-for="(sel,idx) in item.children" :key="idx" :label="sel.label" :value="sel.value"></el-option>
            </el-select>
            <!-- select 可搜索输入框 e -->

            <!-- select 可搜索多选输入框 s -->
            <el-select v-if="item.type === 'searchMoreSelect'" :size="item.size || 'small'" v-model="formObj[item.bindVal]" :placeholder="`${item.placeholder || '请选择'}`" multiple filterable class="w-100" @change="(e)=>{ selectChange(item.bindVal,e) }">
              <el-option v-for="(sel,idx) in item.children" :key="idx" :label="sel.label" :value="sel.value"></el-option>
            </el-select>
            <!-- select 可搜索多选输入框 e -->

            <!-- radio 单选 s -->
            <el-radio-group v-if="item.type === 'radio'" v-model="formObj[item.bindVal]" @change="(e)=>{ selectRadio(item.bindVal,e) }">
              <el-radio v-for="(rad,idx) in item.children" :key="idx" :label="rad.label"></el-radio>
            </el-radio-group>
            <!-- radio 单选 e -->
            
            <!-- checkbox 多选 s -->
            <el-checkbox-group v-if="item.type === 'checkbox'" v-model="formObj[item.bindVal]" @change="(e)=>{ selectCheckbox(item.bindVal,e) }">
              <el-checkbox v-for="(check,idx) in item.children" :key="idx" :label="check.value" name="type">{{check.label}}</el-checkbox>
            </el-checkbox-group>
            <!-- checkbox 多选 e -->

          </el-form-item>
          <!-- 一行一列 e -->

          <!-- 一行多列 s -->
          <div v-if="item.columnData != undefined">
            <el-col v-for="(val,index) in item.columnData" :key="index" :span="val.column == false ? '24' : val.multipleColumnsSize">
              <el-form-item :label="val.label" :prop="val.bindVal" :label-width="val.width != undefined ? val.width+'px' : '100px'" :style="item.side == false ? 'marginBottom=0;' : ''">
                <div> {{item.column }}</div>
                <!-- input输入框 s -->
                <el-input v-if="val.type === 'input'" :size="`${item.size || 'small'}`" v-model="formObj[val.bindVal]" class="w-100"></el-input>
                <!--input 输入框 e -->

                <!--input 输入框带单位 s -->
                <el-input v-if="val.type === 'inputUnit'" :size="item.size || 'small'" v-model="formObj[val.bindVal]" class="w-100"><template> {{val.unit}} </template></el-input>
                <!--input 输入框带单位 e -->

                <!-- 年份选择 s -->
                <el-date-picker v-if="val.type == 'year'" :size="item.size || 'small'" v-model="formObj[val.bindVal]" value-format="yyyy" type="year" :placeholder="`${val.placeholder || '请选择年份'}`" class="w-100" @change="(e)=>{ selectTimeChange(val.bindVal,e) }"></el-date-picker>
                <!-- 年份选择 e -->

                <!-- 日期选择 s -->
                <el-date-picker v-if="val.type == 'date'" :size="item.size || 'small'" v-model="formObj[val.bindVal]" value-format="yyyy-MM-dd HH:mm:ss" type="date" :placeholder="`${val.placeholder || '请选择日期'}`" class="w-100" @change="(e)=>{ selectTimeChange(val.bindVal,e) }"></el-date-picker>
                <!-- 日期选择 e -->

                <!-- 日期时间 s -->
                <el-date-picker v-if="val.type == 'datetime'" :size="item.size || 'small'" v-model="formObj[val.bindVal]" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="`${val.placeholder || '请选择日期'}`" class="w-100" @change="(e)=>{ selectTimeChange(val.bindVal,e) }"></el-date-picker>
                <!-- 日期时间 e -->

                <!-- 日期区间 s -->
                <el-date-picker v-if="val.type == 'daterange'" :size="item.size || 'small'" v-model="formObj[val.bindVal]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="w-100" @change="(e)=>{ selectTimeChange(val.bindVal,e) }"></el-date-picker>
                <!-- 日期区间 e -->

                <!-- 时间 s -->
                <el-time-picker v-if="val.type == 'time'" :size="item.size || 'small'" v-model="formObj[val.bindVal]" value-format="HH:mm:ss" :placeholder="`${val.placeholder || '请选择时间'}`" class="w-100" @change="(e)=>{ selectTimeChange(val.bindVal,e) }"></el-time-picker>
                <!-- 时间 e -->

                <!-- select 输入框 s -->
                <el-select v-if="val.type === 'select'" :size="val.size || 'small'" v-model="formObj[val.bindVal]" :placeholder="`${val.placeholder || '请选择'}`" clearable  class="w-100" @change="(e)=>{ selectChange(val.bindVal,e) }">
                  <el-option v-for="(sel,idx) in val.children" :key="idx" :label="sel.label" :value="sel.value"></el-option>
                </el-select>
                <!-- select 输入框 e -->

                <!-- select 多选输入框 s -->
                <el-select v-if="val.type === 'moreSelect'" :size="val.size || 'small'" v-model="formObj[val.bindVal]" :placeholder="`${val.placeholder || '请选择'}`" multiple class="w-100" @change="(e)=>{ selectChange(val.bindVal,e) }">
                  <el-option v-for="(sel,idx) in val.children" :key="idx" :label="sel.label" :value="sel.value"></el-option>
                </el-select>
                <!-- select 多选输入框 e -->

                <!-- select 可搜索输入框 s -->
                <el-select v-if="val.type === 'searchSelect'" :size="val.size || 'small'" v-model="formObj[val.bindVal]" :placeholder="`${val.placeholder || '请选择'}`" filterable class="w-100" @change="(e)=>{ selectChange(val.bindVal,e) }">
                  <el-option v-for="(sel,idx) in val.children" :key="idx" :label="sel.label" :value="sel.value"></el-option>
                </el-select>
                <!-- select 可搜索输入框 e -->

                <!-- select 可搜索多选输入框 s -->
                <el-select v-if="val.type === 'searchMoreSelect'" :size="val.size || 'small'" v-model="formObj[val.bindVal]" :placeholder="`${val.placeholder || '请选择'}`" multiple filterable class="w-100" @change="(e)=>{ selectChange(val.bindVal,e) }">
                  <el-option v-for="(sel,idx) in val.children" :key="idx" :label="sel.label" :value="sel.value"></el-option>
                </el-select>
                <!-- select 可搜索多选输入框 e -->

                <!-- radio 单选 s -->
                <el-radio-group v-if="val.type === 'radio'" v-model="formObj[val.bindVal]" @change="(e)=>{ selectRadio(val.bindVal,e) }">
                  <el-radio v-for="(rad,idx) in val.children" :key="idx" :label="rad.label" :value="rad.value"></el-radio>
                </el-radio-group>
                <!-- radio 单选 e -->

                <!-- checkbox 多选 s -->
                <el-checkbox-group v-if="val.type === 'checkbox'" v-model="formObj[val.bindVal]" @change="(e)=>{ selectCheckbox(val.bindVal,e) }">
                  <el-checkbox v-for="(check,idx) in val.children" :key="idx" :label="check.value">{{check.label}}</el-checkbox>
                </el-checkbox-group>
                <!-- checkbox 多选 e -->
              </el-form-item>
            </el-col>
          </div>
          <!-- 一行多列 e -->
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "formView",
  data() {
    return {
      validVal:false,
    }
  },
  props:{
    formArr:{
      type:Array,
      request:true
    },
    formObj:{
      type:Object,
      request:true
    },
    rulesObj:{
      type:Object,
      request:true
    }
  },
  mounted(){
  },
  methods: {
    formatLabel(val){
      let label = "";
      val.required == true && (
        label = val.label + '*'
      ) || (
        label = val.label
      );
      return label;
    },
    selectRadio(type,val){
      console.log(type,val)
    },
    selectCheckbox(type,val){
      console.log(type,val)
      console.log(this.formObj)
    },
    selectTimeChange(type,val){
      console.log(type,val)
    },
    inputChange(type,val){
      console.log(type,val)
    },
    selectChange(type,val){
      this.validateFun();
      console.log(type,val)
    },
    validateFun() {
      console.log(this.rulesObj)
      this.$refs.formInfo.validate((valid) => {
        console.log(valid)
        this.validVal = valid;
        return valid;
      });
    },
  }
}
</script>

<style lang="less" scoped>
.formView{
  padding: 50px;
}
:deep(.el-radio-group){
  float: left !important;
  padding-top: 13px;
}
:deep(.el-checkbox){
  float: left !important;
}
:deep(.el-form-item){
  margin-bottom: 0 !important;
}
:deep(.el-form-item__error){
  top: 30% !important;
  left: 20% !important;
  width: 80% !important;
  text-align: right;
}
</style>