<template>
    <div 
    :gutter="0"
    class="m-header">
        <el-col :span="4">
            <v-Geo></v-Geo>
        </el-col>
        <el-col :span="6">
            <v-User></v-User>
        </el-col>
        <el-col :span="14"><div class="grid-content bg-purple"></div></el-col>
    </div>
</template>

<script>
import Geo from './geo'
import User from './user'
export default {
    components:{
        'v-Geo':Geo,
        'v-User':User
    }
    
}
</script>

<style lang="sass">
  @import "../../../assets/css/public/layout.scss"
</style>

