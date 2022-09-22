<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in pics" :key="item">
      <el-image
          style="width: 100%; height: 100%"
          :src="item"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import bck from '../assets/images/bck.jpeg'
import bck2 from '../assets/images/bck2.jpeg'
import bck3 from '../assets/images/bck3.jpeg'
import bck4 from '../assets/images/bck4.jpeg'
export default {
  name: "mainpage-pictrans",
  data(){
    return{
      pics:[bck,bck2,bck3,bck4]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
</style>