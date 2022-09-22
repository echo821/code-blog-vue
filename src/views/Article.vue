<template>
  <div>
    <mhead></mhead>
    <div class="head">
      <div class="btnrow">
        <el-button type="primary" icon="el-icon-arrow-left" @click="back">返回</el-button>
      </div>
    </div>
    <div class="view">
      <h2>{{value.title}}</h2>
      <span>摘要：{{value.preview}}</span>
      <mavon-editor
          class="md"
          :value="value.content"
          :subfield = "marked.subfield"
          :defaultOpen = "marked.defaultOpen"
          :toolbarsFlag = "marked.toolbarsFlag"
          :editable="marked.editable"
          :scrollStyle="marked.scrollStyle"
          :boxShadow="marked.boxShadow"
      ></mavon-editor>
      <hr>
      <el-button type="success" icon="el-icon-check" circle></el-button>1
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>3
      <h2>评论</h2>
      <hr>
    </div>
  </div>
</template>

<script>
import mhead from "@/components/mainpage-head";

export default {
  data(){
    return{
      value:{
        title:'',
        preview:'',
        content:''
      },
      name:'',
      marked:{
        subfield: false,
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        boxShadow:false
      },
    }
  },
  methods:{
    back(){
      this.$router.push("/index")
    }
  },
  created() {
    this.value=this.$route.query.txt
  },
  components: {mhead}
}
</script>

<style scoped>

.md{
  margin-top: 20px;
}
.view{
  width: 60%;
  margin-left: 20%;
}
.head{
  width: 100%;
}
.btnrow{
  margin: 10px 200px 10px 200px;
}
</style>