<template>
  <div>
    <div class="head">
      <div class="btnrow">
        <el-button type="info" @click="back">返回</el-button>
        <el-button id='submitBtn' type="primary" @click="send">发布</el-button>
      </div>
    </div>
    <div class="wrapper">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="简述">
          <el-input v-model="form.preview"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <mavon-editor v-model="form.content" @save="save"></mavon-editor>
    </div>
  </div>
</template>

<script>
export default {
  name: "Editor",
  data(){
    return{
      value:'',
      fileList: [],
      form: {
        title:'',
        preview: '',
        content:''
      },
    }
  },
  methods:{
    onSubmit(){
      console.log(this.form);
    },
    back(){
      this.$router.push('/personal')
    },
    send(){
      const _this=this
      axios.post(_this.$store.state.rax+"article/submit",this.form).then(function (res)
      {
        _this.back()
      })
    },
    save(){
      console.log('save')
    }
  }
}
</script>

<style scoped>
.wrapper{
  width: 60%;
  margin-left: 20%;
  margin-top: 30px;
}
.head{
  width: 100%;
  /*border: 1px solid gray;*/
  /*border-radius: 5px;*/
}
.btnrow{
  margin: 10px 200px 10px 200px;
}
#submitBtn{
  float: right;
}
</style>