<template>
    <div class="m-iselect">
        <span class="name">按省份选择:</span>
        <el-select
        v-model="pvalue"
        placeholder="省份">
        <el-option
            v-for="item in province"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
        <el-select
            v-model="cvalue"
            :disabled="!city.length"
            placeholder="城市">
            <el-option
                v-for="item in city"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市中文或拼音"
            @select="handleSelect"/>
    </div>
</template>

<script>
import _ from 'lodash';
import pyjs from 'js-pinyin'
const PinyinMatch = require('pinyin-match')
// import PinyinMatch from 'pinyin-match'
export default {
  data(){
    return {
      province:[],
      pvalue:'',
      city:[],
      cvalue:'',
      input:'',
      cities:[]
    }
  },
  watch:{
    async pvalue(newPvalue){
      let self=this;
      let {status,data:{city}}=await self.$axios.get(`/geo/province/${newPvalue}`)
      if(status===200){
        self.city=city.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        self.cvalue=''
      }
    }
  },
   mounted:async function(){
        let self=this;
        let {status,data:{province}}=await self.$axios.get('/geo/province')
        if(status===200){
        self.province=province.map(item=>{
        return {
            value:item.id,
            label:item.name
            }
        })
        }
  },
    methods:{
      querySearchAsync:_.debounce(async function(query,cb){
        let self=this;
        if(self.cities.length){
          var rlt = []
            self.cities.forEach(element => {
              var m = PinyinMatch.match(element.value,query)
              if(m)
              {
                rlt.push(element)
              }
            });
            cb(rlt)
          //cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          let {status,data:{city}}=await self.$axios.get('/geo/city')
          if(status===200){
            self.cities=city.map(item=>{return {
              value:item.name
            }})
            var rlt = []
            self.cities.forEach(element => {
              var m = PinyinMatch.match(element.value,query)
              if(m)
              {
                rlt.push(element)
              }
            });
            cb(rlt)
            // cb(self.cities.filter(item => item.value.indexOf(query)>-1))
          }else{
            cb([])
          }
        }
      },200),
    handleSelect:function(item){
      console.log(item.value);
    }
  }
}
</script>

<style>

</style>
