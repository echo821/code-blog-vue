<template>
    <div class="index">
      <mhead></mhead>
      <div class="mympt">
        <mpt></mpt>
      </div>
      <div class="view">
        <div class="left">
          <h3>为您推荐</h3>
          <el-dialog title="请选择收藏夹" :visible.sync="dialogFormVisible">
            <el-form>
              <el-radio-group v-model="radio">
              <div class="radio" v-for="(item,index) in cdata">
                  <el-radio :label="index">{{ item.name }}</el-radio>
              </div>
              </el-radio-group>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="collect">确 定</el-button>
            </div>
          </el-dialog>
          <div v-for="(item) in blogs" class="mycard">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <div style="padding: 14px;">
                <h3 @click="toRead(item)">{{item.title}}</h3>
                <span>{{item.preview}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.date }}</time>
                  <el-button type="text" class="button" @click="collectRise(item.id)">收藏</el-button>
                </div>
              </div>
            </el-card>
          </div>

          <div class="mypager">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1">
            </el-pagination>
          </div>
        </div>
        <div class="right">
          <div class="mytag">
            <h3>标签</h3>
          </div>
          <div class="btngroup">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>我的标签</span>
                <el-dialog title="添加标签" :visible.sync="tagDialogFormVisible">
                  <el-form :model="tagform">
                    <el-form-item label="自定义标签内容" :label-width="formLabelWidth">
                      <el-input v-model="tagform.name" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="tagDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="tagSubmit">确 定</el-button>
                  </div>
                </el-dialog>
                <el-button style="float: right; padding: 3px 0" type="text" @click="tagDialogFormVisible = true">添加自定义标签</el-button>
              </div>
              <div v-for="tag in tags" class="text item">
                <el-tag
                    :key="tag.name"
                    closable
                    :type="tag.type">
                  {{tag.name}}
                </el-tag>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import mhead from "@/components/mainpage-head";
import mpt from "@/components/mainpage-pictrans";
export default {
  data(){
    return{
      name:'qqq',
      blogs:[{
        title:'',
        preview:'',
        content:'',
        date:''
      }],
      dialogFormVisible:false,
      formLabelWidth: '120px',
      cdata:[],
      radio:0,
      selectArticle:0,
      tags: [
        { name: '代码', type: '' },
        { name: '软件开发', type: 'success' },
      ],
      tagform: {
        name: '',
      },
      tagDialogFormVisible:false,
    }
  },
  methods:{
      toRead(item)
      {
        console.log(item)
        this.$router.push({path:'/article',query: {txt:item}})
      },
      tagSubmit(){
        this.tagDialogFormVisible=false
        this.tags.push({
          name:this.tagform.name,
          type: 'info'
        })
      },
      collectRise(id)
      {
        this.dialogFormVisible=true
        this.selectArticle=id
      },
      collect()
      {
        this.dialogFormVisible=false
        console.log(this.cdata[this.radio])
        const _this=this
        axios({
          method:'get',
          url:_this.$store.state.rax+'collector/collect',
          params:{
            cid:_this.cdata[_this.radio].id,
            aid:_this.selectArticle
          }
        }).then(function(res){
          _this.$message('收藏成功');
        })
      }
  },
  created() {
    const _this=this
    if(sessionStorage.getItem("user")==null){
      this.$router.push("/login")
    }
    else{
      _this.name=JSON.parse(sessionStorage.getItem("user")).name
    }
    axios.get(_this.$store.state.rax+"article/getall").then(function (res)
    {
      _this.blogs=res.data
    })
    axios({
      method:'get',
      url:_this.$store.state.rax+'collector/gbu',
      params: {
        uname:_this.name
      }
    }).then((response) => {
      _this.cdata=response.data
      console.log(_this.cdata)
    }).catch((error) => {

    })
  },
  name:"Index",
  components: {mhead,mpt}
}
</script>
<style scoped>
.mympt{
  width: 60%;
  margin-left: 20%;
}
.view{
  width: 80%;
  margin-left: 10%;
  height: 800px;
}
.left{
  width: 58%;
  float: left;
}
.right{
  width: 38%;
  float: right;
}
.textBox{
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 15px;
}
.mypager{
  margin-top: 50px;
  margin-left: 100px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 200px;
  height: 150px;
  display: block;
}

.mycard{
  margin-top:20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.radio{
  margin-top: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>