<template>
  
<div class="centerbox_use">
  <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>


<div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" style="width: 400px;" 
     v-model="query"
     class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
      <el-button type="primary">主要按钮</el-button>
</div>


 <template>
    <el-table
      :data="form"
      style="width: 100%">
      <el-table-column type="index" label="#" width="180">

      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱地址">
      </el-table-column>

       <el-table-column
        prop="create_time"
        label="创建日期">
      </el-table-column>

      <el-table-column 
       prop="mobile" 
       label="电话">
        </el-table-column>

       <el-table-column
        prop="email"
        label="用户状态">
      </el-table-column>
      
       <el-table-column
        prop="email"
        label="操作">
      </el-table-column>
    </el-table>
  </template>

    <template>
       <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    </template>

</div>
</template>

<script>
export default {
  created() {
    this.getlist();
  },

  data() {
    return {
      query: "",
      pagenum: 2,
      pagesize: 2,
      total: -1,

      form: [
        {
          password: "",
          username: "",
          email: "",
          mobile: ""
        }
      ]
    };
  },

  //     需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
  methods: {
    async getlist() {
      var AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        meta: { msg, status },
        data: { total, users }
      } = res.data;
      console.log(res.data);
      if (status === 200) {
        this.total = total;
        this.$message.success(msg);
        this.form = users;
      } else {
        this.$message.warning(msg);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val
      // 重置页码pagenum
      this.pagenum = 1
      this.getlist()

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
          this.pagesize = val
      // 重置页码pagenum
      this.pagenum = 1
      this.getlist()

    }
  }
};
</script>

<style>
.centerbox_use {
  background: #fff;
  padding: 20px;
}
</style>
