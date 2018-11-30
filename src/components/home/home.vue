<template>
<div class="home_box">
<el-container class="container">
  <el-header>
          <el-row :gutter="20">
             <el-col :span="4"><img src="../../assets/logo.png" alt="该图片无法显示">  </el-col>
            <el-col :span="18"><h2>电商后台管理系统</h2></el-col>
            <el-col :span="2" class="home_logout" ><a @click.prevent="handleloginout()">退出</a></el-col>
            </el-row>
  </el-header>
        
 <el-container>
        <el-aside class="aside" width="200px">
          <!-- 开启路由模式 -->
            <el-menu
            :router="true"
            :unique-opened="true"
            class="el-menu-vertical-demo">

                <el-submenu :index="''+item1.order" v-for="(item1,i) in menus" :key="i">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item1.authName}}</span>
                    </template>

                    <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
                        <template slot="title">
                            <i class="el-icon-sort"></i>
                            <span>{{item2.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>

            </el-menu>

        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
    </el-container>
</el-container>

   
    </div>

    

</template>

<script>

export default {
  data() {
    return {
      menus: []
    }
  },
  // 在组件渲染之前 if token
  // 钩子函数 在创建vm实例之前
  beforeCreate() {
    // 获取token
    // const token = localStorage.getItem('token')
    // 如果不存在 回到login
    // if (!token) {
    //   this.$router.push({ name: 'login' })
    // }
  },
  created() {
    this.getMenus()
  },
  methods: {
    // 获取侧边栏导航
    async getMenus() {
      const res = await this.$http.get(`menus`)
      console.log(res)
      this.menus = res.data.data
    },


    handleloginout() {
      // 1. 提示
      this.$message.success('退出成功')
      // 2. 清除
      localStorage.clear()
      // 3. 回到login组件
      this.$router.push({ name: 'login' })
    }
  }
}
</script>




<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 100%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
.container {
  height: 100%;
}

.home_box {
  height: 100%;
}

.home_logout {
  line-height: 50px;
}
.home_logout a{
    
   cursor: pointer;

}
</style>
