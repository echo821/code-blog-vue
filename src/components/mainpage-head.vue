<template>
  <div class="wrapper">
    <div class="line"></div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item>
        <i class="el-icon-picture"></i>
      </el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">我的收藏夹</el-menu-item>
      <el-menu-item index="3">我的关注</el-menu-item>
      <el-menu-item index="4">我的文章</el-menu-item>
      <el-menu-item class="userMsg">
        <el-link type="danger" @click="exit">退出</el-link>
      </el-menu-item>
      <el-menu-item class="exit">
        欢迎你，{{user.name}}
      </el-menu-item>
      <el-menu-item class="searchBox">
        <el-input
            placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "mainpage-head",
  data() {
    return {
      user:{
        name:'',
      },
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  created() {
    if(sessionStorage.getItem('user')==null)
      console.log('isnull')
    else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex=key
      if(key==1)
        this.$router.push("/index")
      else
        this.$router.push({path:'/personal',query: {vo:key}})
    },
    exit(){
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.userMsg{
  float: right;
}
.exit{
  float: right;
}
.searchBox{
  float: right;
}
</style>