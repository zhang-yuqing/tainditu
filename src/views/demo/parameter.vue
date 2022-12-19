<template>
  <div class="viewPage">
    <!-- <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="河流">
        <el-select v-model="form.reiver" placeholder="请选择" class="float-left">
          <el-option v-for="(item,i) in parameters.riverOption" :key="i" :value="item.value">{{item.label}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="季节">
        <el-select v-model="form.season" placeholder="请选择" class="float-left">
          <el-option v-for="(item,i) in parameters.seasonData" :key="i" :value="item.value">{{item.label}}</el-option>
        </el-select>
      </el-form-item>
    </el-form> -->
    <el-cascader :options="areaData" :props="props" style="width: 100%" @change="provincesChange"></el-cascader>
    <div class="area">地址
      <el-select v-model="areaText" filterable class="w-100" @change="(e)=>{ selectChange(e) }">
        <el-option v-for="(item,i) in areaData" :key="i" :label="item.n" :value="item.c"></el-option>
      </el-select>
    </div>
    <FormTemp :formArr="formArr" :formObj="formObj" :rulesObj="rulesFrom" ref="ruleForm"></FormTemp>
    <SubButtonTemp :btnObj="btnObj" @addInfo="subFunc"></SubButtonTemp>
   
  </div>
</template>
<script>
import { parameter } from './component/parameter'
import FormTemp from './component/formTemp.vue'
import SubButtonTemp from './component/buttonTemp.vue'
import area from './component/area.json'
export default{
  name:"viewPage",
  data(){
    return{
      areaData:area,
      areaText:"",
      props: {
        checkStrictly: false,
        value: 'y',
        label: 'n',
        children: 'c'
      },
      rulesFrom: {
        name:[
          { required:true, message:'请输入账号！', trigger:"blur"},
        ],
        reiver:[
          {required:true,message:"请选择河流！",trigger:'blur'},
        ],
        columnReiver:[
          {required:true,message:"请选择河流！",trigger:'blur'},
        ]
      },
      formObj:{
        reiver:"",
        season:"",
        name:"",
        searchSeason:"",
        moreSeason:'',
        searchMoreSeason:"",
        typeRadio:"",
        columnReiver:"",
        columnMoreSeason:"",
        columnSearchSeason:"",
        columnSearchMoreSeason:"",
        columnMoreType:"",
        sex:"",
        typeCheckbox:[],
        columnMore:[],
        num:[],
        time:"",
        date:"",
        times:"",
        dateranges:[],
        columnYear:"",
        columnDate:"",
        columnTime:"",
        columnDaterange:[],
      },
      parameters:parameter(),
      formArr:[
        {
          label:"姓名",
          bindVal:'name',
          type:"input",
          size:"small",
          column:false
        },
        {
          label:"河流",
          bindVal:'reiver',
          type:"select",
          column:false,
          placeholder:"请选择河流",
          children:[],
        },
        {
          label:"季节",
          bindVal:'moreSeason',
          type:"moreSelect",
          column:true,
          children:[]
        },
        {
          label:"搜索季节",
          bindVal:'searchSeason',
          type:"searchSelect",
          column:true,
          children:[]
        },
        {
          label:"搜索多选",
          width:100,
          bindVal:'searchMoreSeason',
          type:"searchMoreSelect",
          column:true,
          children:[]
        },
        {
          side:true,
          columnData:[
          {
            label:"电话",
            bindVal:'address',
            type:"input",
            column:true,
            multipleColumnsSize:6,
            size:"small"
          },
          {
            label:"地址",
            bindVal:'address',
            type:"input",
            column:true,
            multipleColumnsSize:6,
          },
          {
            label:"地址",
            bindVal:'address',
            type:"input",
            column:true,
            multipleColumnsSize:6,
          },
          ],
        },
        {
          side:true,
          columnData:[
            {
              label:"河流",
              bindVal:'columnReiver',
              type:"select",
              column:true,
              placeholder:"请选择河流",
              multipleColumnsSize:6,
              children:[],
            },
            {
              label:"季节",
              bindVal:'columnMoreSeason',
              type:"moreSelect",
              column:true,
              multipleColumnsSize:6,
              children:[]
            },
            {
              label:"搜索季节",
              bindVal:'columnSearchSeason',
              type:"searchSelect",
              column:true,
              multipleColumnsSize:6,
              children:[]
            },
            {
              label:"搜索多选河流",
              width:100,
              bindVal:'columnSearchMoreSeason',
              type:"searchMoreSelect",
              column:true,
              multipleColumnsSize:6,
              children:[]
            },
          ],
        },
        {
          label:'类型',
          bindVal:'typeRadio',
          type:'radio',
          column:false,
          width:100,
          children:[
            {label:'类型一',value:1},
            {label:'类型二',value:2},
            {label:'类型三',value:3},
          ],
        },
        {
          side:true,
          columnData:[
            {
              label:"多选类型",
              bindVal:'columnMoreType',
              type:"radio",
              column:true,
              width:100,
              placeholder:"请选择河流",
              multipleColumnsSize:12,
              children:[
                {label:'类型一',value:1},
                {label:'类型二',value:2},
                {label:'类型三',value:3},
              ],
            },
            {
              label:"性别",
              bindVal:'sex',
              type:"radio",
              column:true,
              multipleColumnsSize:12,
              children:[
                {label:'男',value:1},
                {label:'女',value:2},
              ]
            },
          ],
        },
        {
          label:'多选类型',
          bindVal:'typeCheckbox',
          type:'checkbox',
          column:false,
          width:100,
          children:[
            {label:'多选类型一',value:1},
            {label:'多选类型二',value:2},
            {label:'多选类型三',value:3},
          ],
        },
        {
          side:true,
          columnData:[
            {
              label:"数据",
              bindVal:'columnMore',
              type:"checkbox",
              column:true,
              placeholder:"请选择河流",
              multipleColumnsSize:12,
              children:[
                {label:'数据一',value:1},
                {label:'数据二',value:2},
                {label:'数据三',value:3},
              ],
            },
            {
              label:"数字",
              bindVal:'num',
              type:"checkbox",
              column:true,
              multipleColumnsSize:12,
              children:[
                {label:'数字一',value:1},
                {label:'数字二',value:2},
                {label:'数字三',value:3},
              ]
            },
          ],
        },
        {
          label:"年份",
          bindVal:'time',
          type:"year",
          column:false
        },
        {
          label:"日期",
          bindVal:'date',
          type:"date",
          column:false
        },
        {
          label:"时间",
          bindVal:'times',
          type:"time",
          column:false
        },
        {
          label:"日期区间",
          bindVal:'dateranges',
          type:"daterange",
          column:false
        },
        {
          side:true,
          columnData:[
            {
              label:"年份",
              bindVal:'columnYear',
              type:"year",
              column:true,
              width:"100",
              placeholder:"请选择河流",
              multipleColumnsSize:6,
            },
            {
              label:"日期",
              bindVal:'columnDate',
              type:"date",
              column:true,
              multipleColumnsSize:6,
            },
            {
              label:"时间",
              bindVal:'columnTime',
              type:"time",
              column:true,
              multipleColumnsSize:6,
            },
            {
              label:"日期区间",
              width:100,
              bindVal:'columnDaterange',
              type:"daterange",
              column:true,
              multipleColumnsSize:6,
            },
          ],
        },
      ],
      btnObj:{
        type:'sub',
      },
      addBtnObj:{
        type:'add',
      }
    }
  },
  components:{
    FormTemp,
    SubButtonTemp
  },
  mounted(){
    console.log(this.areaData)
    this.formArr[1].children = this.parameters.riverOption;
    this.formArr[2].children = this.parameters.seasonData;
    this.formArr[3].children = this.parameters.seasonData;
    this.formArr[4].children = this.parameters.riverOption;
    this.formArr[6].columnData[0].children = this.parameters.riverOption;
    this.formArr[6].columnData[1].children = this.parameters.seasonData;
    this.formArr[6].columnData[2].children = this.parameters.riverOption;
    this.formArr[6].columnData[3].children = this.parameters.seasonData;
  },
  methods:{
    subFunc(){
      this.$refs.ruleForm.validateFun();
      if(this.$refs.ruleForm.validVal){
        console.log("验证成功")
        return;
      }
      console.log("验证失败")
    },
    addInfo(){
      console.log("保存数据")
    },
    selectChange(e){
      console.log(e)
      console.log(this.areaText)
    },
     // 获取地址
     provincesChange(e) {
      this.areaData.forEach(item => {
        const { city, citys, cityId } = item;

        if (cityId === e[0]) {
          this.companyAuthLoginVO.province = city;
          citys.forEach(value => {
            const { city: val, citys: children, cityId: code } = value;

            if (code === e[1]) {
              this.companyAuthLoginVO.city = val;
              children.forEach(v => {
                if (v.cityId === e[2]) {
                  this.companyAuthLoginVO.area = v.city;
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.viewPage{
  width: 100%;
  height: 100%;
}
</style>