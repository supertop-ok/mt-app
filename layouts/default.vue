<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <my-header></my-header>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
      <MyFooter></MyFooter>
  </el-container>
</template>

<script>
import MyHeader from '../components/public/header/index'
import MyFooter from '../components/public/footer/index'

export default {
  components:{
    MyHeader,
    MyFooter
  }
}
</script>
