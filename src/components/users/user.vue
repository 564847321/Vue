<template>
  
<div class="centerbox_use">
  <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>


<div style="margin-top: 15px;">
    <el-input placeholder="请输入内容"  @clear="loadUserList()"  clearable style="width: 400px;" 
     v-model="query"
     class="input-with-select">
        <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
    </el-input>
      <el-button type="primary"  @click="showFormVisibleADD">添加用户</el-button>
</div>


   <!-- 添加用户弹窗 -->
     <!-- password: "",
          username: "",
          email: "",
          mobile: "", -->
  <el-dialog title="添加用户" :visible.sync="dialogFormVisibleADD">
     <el-form :model="add_form">
              <el-form-item label="用户名称" label-width="100px">
                <el-input v-model="add_form.username" autocomplete="off"></el-input>
              </el-form-item>   

                <el-form-item label="密码" label-width="100px" >
                <el-input v-model="add_form.password" autocomplete="off"></el-input>
              </el-form-item>

                <el-form-item label="邮箱" label-width="100px" >
                <el-input v-model="add_form.email" autocomplete="off"></el-input>
              </el-form-item>

                <el-form-item label="电话" label-width="100px" >
                <el-input v-model="add_form.mobile" autocomplete="off"></el-input>
              </el-form-item>
       
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="submit_addform" >确 定</el-button>
          </div>
        </el-dialog>
   <!-- 添加用户弹窗 -->


 <template>
   <!-- 列表页开始 -->
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
        label="创建日期">
          <!-- 如果单元格的内容不是字符串/文本 需要给要展示的内容外层包裹一个tempalte -->
            <!-- slot-scope 传值 userlist是外层容器绑定的数据 -->
            <template slot-scope="scope">
                <!-- {{create_time | fmtdate}} -->
                <!-- userlist中的每个对象中的create_time -->
                {{scope.row.create_time |fmtdate}}
            </template>
      </el-table-column>

      <el-table-column 
       prop="mobile" 
       label="电话">
        </el-table-column>

       <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.mg_state"
              
              active-color="#13ce66"
               inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>


       <el-table-column
        label="操作">
        <template slot-scope="scope" >
          <el-button type="primary" size='mini' @click="showEditform(scope.row.id)" :plain='true' circle  icon="el-icon-edit"></el-button>
          <el-button type="success" size='mini' :plain='true' circle icon="el-icon-share"></el-button>
          <el-button type="danger" size='mini' :plain='true' @click='showMegBoxDele(scope.row.id)' circle icon="el-icon-delete"></el-button>
        </template> 
      </el-table-column>
    </el-table>
   <!-- 列表页结束 -->
   
    <!-- 编辑弹出页添加 -->
<el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit">
     <el-form :model="add_form">
                <el-form-item label="邮箱" label-width="100px" >
                <el-input v-model="add_form.email" autocomplete="off"></el-input>
              </el-form-item>

                <el-form-item label="电话" label-width="100px" >
                <el-input v-model="add_form.mobile" autocomplete="off"></el-input>
              </el-form-item>    
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="submit_Editform()" >确 定</el-button>
            
          </div>
        </el-dialog>

    <!-- 编辑弹出页添加结束 -->

  </template>

    <!-- 分页开始 -->
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
    <!-- 分页结束 -->

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
      pagenum: 1,
      pagesize: 2,
      total: -1,
      dialogFormVisibleADD:false,
      dialogFormVisibleEdit:false,
      form: [
        {
          password: "",
          username: "",
          email: "",
          mobile: "",
          mg_state: '',
          id:''
        }
      ],
      add_form:{
          password: "",
          username: "",
          email: "",
          mobile: "",
          mg_state: '',
          id:'',
      },      
    };
  },

  //     需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
  methods: {
    // 获取列表数据
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
    // 获取列表数据结束


    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val
      // 重置页码pagenum
      this.pagenum = 1
      this.getlist()

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
          this.pagenum = val
      // 重置页码pagenum
      // this.pagenum = 1
      this.getlist()
    },
    // 分页结束

    // 添加弹出层
     showFormVisibleADD(){
           this.dialogFormVisibleADD=true
     },
     async submit_addform(){
      const res = await this.$http.post('users',this.add_form)
             console.log(res)
             this.dialogFormVisibleADD=false            
             const {
                      meta:{status, msg},
                     
                    } = res.data;
                    if(status === 201){
                      this.add_form={};
                  // for (const key in this.add_form) {
                  //   if (this.form.hasOwnProperty(key)) {
                  //     this.form[key] = ''
                  //   }
                  // }
                      this.$message.success(msg)
                      this.getlist();
                    }
                    else{
                      this.$message.warning(msg)
                    }      
     },
    // 添加弹出层结束

    // 编辑弹出层开始
showEditform(id){
      this.dialogFormVisibleEdit=true   
      this.id=id
      console.log(this.id)
},
     async  submit_Editform(){
            
            console.log(this.id)
             const res = await this.$http.put(`users/${this.id}&${this.add_form.email}&${this.add_form.email}`)     
             const{
                      meta: { msg,status },
                      data
                  }=res.data
                    console.log(res)

               if(status==200){
                 this.$message.success(msg)
                 this.add_form=data
                 this.dialogFormVisibleEdit=false
               }
               else{
                    this.$message.warning(msg)
               }
      } ,
    // 编辑弹出层结束
      
      //  删除用户
      showMegBoxDele(userId) {
      this.$confirm('是否删除用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发送删除请求
          var res = await this.$http.delete(`users/${userId}`)
          console.log(res)
             const{
                      meta: { msg,status },
                      data
                  }=res.data
          // 更新视图
          this.getlist()

          this.$message({
            type: 'success',
            message: msg
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: msg
          })
        })
    },
    // 删除结束


    // 搜索用户
      loadUserList() {
      this.getlist()
    },
    
    // 搜索用户
    searchUser() {
      // 1. 按照query参数发送请求
      this.pagenum = 1
      this.getlist()
    },
  }
};
</script>

<style>
.centerbox_use {
  background: #fff;
  padding: 20px;
}
</style>
