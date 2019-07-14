<template>
    <div 
    :gutter="0"
    class="m-header">
        <el-col :span="5">
            <v-Geo></v-Geo>
        </el-col>
        <el-col :span="5">
            <v-User></v-User>
        </el-col>
        <el-col :span="14">
            <v-Nav></v-Nav>
        </el-col>
    </div>
</template>

<script>
import Geo from './geo'
import User from './user'
import Nav from './nav'

export default {
    components:{
        'v-Geo':Geo,
        'v-User':User,
        'v-Nav':Nav
    }
    
}
</script>

<style lang="scss">
  @import "@/assets/css/public/layout.scss";
  @import "@/assets/css/public/header/index.scss";
</style>

