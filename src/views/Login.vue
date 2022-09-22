<template>
  <div class="wrapper">
    <div class="box">
      <div class="inputbox">
        <h3>登录</h3>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button>注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name:'',
        password:'',
        privilege:0
      }
    }
  },
  methods: {
    onSubmit() {
      const _this=this
      console.log(_this.$store.state.rax+"user/logincheck")
      axios.post(_this.$store.state.rax+"user/logincheck",this.form).then(function (res)
      {
        console.log(res)
        if(res.data=="")
          alert("wrong input")
        else{
          sessionStorage.setItem("user", JSON.stringify(res.data))
          if(res.data.privilege==1)
            _this.$router.push("/manage")
          else if(res.data.privilege==0)
            _this.$router.push("/index")
        }
      })
    }
  }
}
</script>

<style scoped>
.wrapper{
  background-color: #475669;
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.box{
  width: 40%;
  margin-left:30%;
  background-color: white;
  margin-top: 5%;
  border-radius: 8px ;
}
h3{
  margin-left: 60%;
  margin-bottom: 30px;
}
.inputbox{
  padding-top: 30px;
  width: 75%;
  padding-bottom: 30px;
}
</style>