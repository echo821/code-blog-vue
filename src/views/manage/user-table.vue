<template>
  <div class="wrapper">
    <el-table
        :data="tableData"
        border
    >
      <el-table-column
          fixed
          type="selection"
          prop="name"
          label="全选"
          width="60">
      </el-table-column>
      <el-table-column
          fixed
          prop="name"
          label="用户名"
          width="150">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="privilege"
          label="权限等级"
          width="120">
      </el-table-column>
      <el-table-column
          label="操作"
          width="400">
        <template slot-scope="scope">
          <el-button type="success" size="small"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button type="primary" size="small">
            上调权限
          </el-button>
          <el-button type="primary" size="small">
            降低权限
          </el-button>
          <el-button @click="handleClick(scope.row)" type="danger" size="small">
            <i class="el-icon-delete"></i>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="1"
        :page-size="10"
        class="mypager"
    >
    </el-pagination>
  </div>

</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    trans(){
      for(let i=0;i<this.tableData.length;i++)
      {
        let j=this.tableData[i].privilege
        if(j=='1') {
          this.tableData[i].privilege = '一般用户'
        }
        else if(j=='2'){
          this.tableData[i].privilege = '管理员'
        }else if(j=='3'){
          this.tableData[i].privilege = '高级管理员'
        }
      }
    }
  },

  data() {
    return {
      tableData: [{
        name: 'abcd',
        password: 'qwe',
        privilege: '1',
      }]
    }
  },

  created() {
    const _this=this
    axios.get(_this.$store.state.rax+"user/getusers").then(function (res)
    {
      _this.tableData=res.data
      console.log('init')
      _this.trans()
    })
  }
}
</script>

<style scoped>
.wrapper{
  width: 80%;
}
.mypager{
  margin-left: 100px;
  margin-top: 30px;
}
</style>