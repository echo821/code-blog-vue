<template>
  <div class="wrapper">
    <mhead></mhead>
    <div class="box">
      <div class="left">
        <el-card class="box-card">
          <h2>个人信息</h2>
          用户名:<span>{{user.name}}</span><br>
          个性签名:<span>行动，是打败焦虑的最好办法。当你不知道该做什么的时候，就把手头的每件小事都做好；当你不知道该怎样开始时，就把离你最近的那件事情做好！</span><br>
          性别:<span>男</span><br>
          出生日期:<span>2001-1-1</span><br>
          个人兴趣:<span>看电影、看韩剧、看综艺娱乐节目、看书、看小说、看杂志</span><br>
          <el-button type="text" @click="dialogFormVisible = true">编辑个人资料</el-button>

          <el-dialog title="个人资料" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="个性签名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="男" value="shanghai"></el-option>
                  <el-option label="女" value="beijing"></el-option>
                  <el-option label="保密" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期" :label-width="formLabelWidth">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="个人兴趣" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-card>
      </div>
      <div class="right">
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的收藏夹" name="first">
              <el-button @click="createCollector" size="mini">新建</el-button>
              <el-button type="danger" @click="removeSelected" size="mini">删除选中</el-button>
              <el-collapse v-model="activeNames" >
                <div v-for="(item,index) in data">
                  <el-collapse-item :title='item.name' :name="item.id">
                    <ul>
                      <li v-for="(item2,index2) in item.childNodes">
                        <el-button type="text">{{ item2.title }}</el-button>
                        <el-button type="danger" size="mini" plain>移除</el-button>
                      </li>
                    </ul>
                  </el-collapse-item>
                </div>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="我的关注" name="second">
              <el-row :gutter="10" v-for="(item) in attentionList">
                <el-col :span="24">
                  <el-card shadow="hover">
                    <i class="el-icon-user-solid"></i>{{item.name}}
                    <el-button class="deat" type="danger" size="mini">取消关注</el-button>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="我的文章" name="third">
              <el-button type="primary" size="mini" @click="jumpToEdit">写文章</el-button>
              <el-table
                  :data="txtData"
                  style="width: 100%">
                <el-table-column
                    label="时间"
                    width="150">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="标题"
                    width="100">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    width="100">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.state }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import mhead from "@/components/mainpage-head";

export default {
  name: "Personal",
  data() {
    return {
      activeName: 'second',
      user:{
        name:'',
      },
      data:[
        {
          id:'',
          name:'',
          childNodes:{
            id:'',
            name:''
          }
        }
      ],
      cname:'',
      activeNames: [],
      tabNames:['first','second','third'],
      dialogFormVisible:false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [-1],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      txtData: [],
      attentionList:[
        {
          name:'',
        }
      ]
    };
  },
  created(){
    if(sessionStorage.getItem('user')!=null)
      this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log(this.activeName=this.tabNames[this.$route.query.vo-2])
    //获取收藏夹列表
    this.freshCollector()

    //获取文章列表
    this.freshTxt()

    //获取关注列表
    this.freshAttention()
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    jumpToEdit(){
      this.$router.push('/editor')
    },
    freshAttention(){
      const _this=this
      axios({
        method:'get',
        url:_this.$store.state.rax+'user/gal',
        params: {
          id:_this.user.name
        }
      }).then(function (res){
        _this.attentionList=res.data
      })
    },
    freshTxt(){
      const _this=this
      axios({
        method:'get',
        url:_this.$store.state.rax+'article/getall',
        params: {
          uname:_this.user.name
        }
      }).then((response) => {
        _this.txtData=response.data
        for(let i=0;i<_this.txtData.length;i++)
        {
          console.log('asaaa')
          let cur=_this.txtData[i].state;
          console.log(cur)
          if(cur==0)
            _this.txtData[i].state='草稿'
          else if(cur==1)
            _this.txtData[i].state='已发布'
          else
            _this.txtData[i].state='被退回'
        }
      }).catch((error) => {

      })
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClick(tab, event) {
      console.log(this.activeName);
    },
    openDialog(){
      this.dialogTableVisible=true
    },
    removeSelected()
    {
      const _this=this
      axios.post(_this.$store.state.rax+'collector/deletelist',this.activeNames).then((res)=>{
        console.log(res)
        _this.freshCollector()
      })
    },
    view(node, data){
      this.openDialog()
    },
    remove(node, data){
      console.log(node)
      console.log(data)
    },
    freshCollector(){
      const _this=this
      axios({
        method:'get',
        url:_this.$store.state.rax+'collector/gbu',
        params: {
          uname:this.user.name
        }
      }).then((response) => {
        _this.data=response.data
        for(let i=0;i<_this.data.length;i++)
        {
          let cidpram=_this.data[i].id
          axios(
              {
                method:'get',
                url:_this.$store.state.rax+'article/getbycid',
                params: {
                  id:cidpram
                }
              }
          ).then((response)=>{
            console.log(response.data)
            _this.data[i].childNodes=response.data
          })
        }
      }).catch((error) => {

      })
    },
    createCollector(){
      const _this=this
      this.$prompt('请进行命名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        _this.cname=value
        axios({
          method:'get',
          url:_this.$store.state.rax+'collector/add',
          params: {
            cname:value,
            uname:_this.user.name
          }
        }).then((response) => {
          //response是一个返回的promise对象，该注释所在的这行一般对该promise对象进行处理从而获取数据
          this.freshCollector()
        }).catch((error) => {
          //对error进行处理
        })
        this.$message({
          type: 'success',
          message: '成功新建: ' + value,
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  },
  components: {mhead}
}
</script>

<style scoped>
.box{
  width: 60%;
  margin-left: 20%;
  margin-top: 30px;
}
.left{
  width: 30%;
  float: left;
  line-height: 40px;
}
.right{
  width: 65%;
  margin-left: 4%;
  float: right;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
span{
  font-size: 10px;
  margin-left: 10px;
  color: gray;
}
.deat{
  float: right;
}
</style>