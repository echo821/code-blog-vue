<template>
  <div>
    <manage-up-navi></manage-up-navi>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu router>
            <el-submenu v-for="(item,index) in $router.options.routes[3].children" :index="index+' '">
              <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
              <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path">{{item2.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-container>
      <el-container class="showblock">
        <router-view/>
      </el-container>
  </el-container>
  </div>
</template>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.showblock{
  width: 80%;
  margin-top: 30px;
}
</style>

<script>
import ManageUpNavi from "@/components/manage-up-navi";
export default {
  components: {ManageUpNavi},
  data() {
    return {
      navi:[]
    }
  },
  created(){

  }
};
</script>