<template>
               
               <div class="formdata">
                    <el-form label-position="top" label-width="200px" class="formdata_a">
                    <h2>用户登录</h2>
                    <el-form-item label="用户名">
                        <el-input v-model="formdata.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formdata.password"></el-input>
                    </el-form-item>  
                      <el-button @click.prevent="postform()" type="primary" class="button">成功按钮</el-button>       
                    </el-form>
                </div>
</template>


<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // postform() {
    //   this.$http.post("/login", this.formdata).then(res => {
    //     const {
    //       meta: { msg, status },
    //       data
    //     } = res.data;
    //     if (status === 200) {
    //       this.$message.success(msg);
    //       this.$router.push({ name: "home" });
    //     } else {
    //       this.$message.error(msg);
    //       this.formdata="";
    //     }
    //   });
    // }
     
     
    // 登录请求
    async postform () {
      const res = await this.$http.post('login', this.formdata)

      console.log(res)
      const {
        meta: { msg, status },
        data
      } = res.data

      if (status === 200) {
        // 0. 保存用户token
        // 将来在home组件渲染之前 先判断token有没有
        const token = localStorage.setItem('token', data.token)
        // 1. 跳转到首页home
        this.$router.push({ name: 'home' })
        // 2. 提示登录成功
        this.$message.success(msg)
      } else {
        // 3. 如果失败 -> 提示用户
        this.$message.warning(msg)
      }
    }
  }
}

</script>


<style>
.formdata {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #324152;
}

.formdata_a {
  width: 400px;
  background: white;
  padding: 20px;
  border-radius: 15px;
}

.button {
  width: 100%;
}
</style>
