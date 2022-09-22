<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="用户权限">
        <el-select v-model="form.region" placeholder="请选择权限等级">
          <el-option label="一般用户" value="shanghai"></el-option>
          <el-option label="管理员" value="beijing"></el-option>
          <el-option label="高级管理员" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>

</style>