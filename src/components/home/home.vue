<template>
<div class="home_box">
<el-container class="container">
  <el-header>
          <el-row :gutter="20">
             <el-col :span="4"><img src="../../assets/logo.png" alt="该图片无法显示">  </el-col>
            <el-col :span="18"><h2>电商后台管理系统</h2></el-col>
            <el-col :span="2" class="home_logout" ><a @click.prevent="logout()">退出</a></el-col>
            </el-row>
  </el-header>
        

  <el-container>
    <el-aside width="200px">

<el-row class="tac">
    <el-menu
     :unique-opened="true"
        :router="true"
      default-active="10"
      class="el-menu-vertical-demo"
  >
      <el-submenu index="1">

        <template slot="title">
          <i class="el-icon-location"></i>     
          <span>用户管理</span>
        </template>

        <el-menu-item index="user">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户列表</span>
        </template>
        </el-menu-item>

      </el-submenu>

     <!-- 导航二 -->
         <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>

                    <el-menu-item index="1-1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>角色列表</span>
                        </template>
                    </el-menu-item>
                     <el-menu-item index="1-1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限列表</span>
                        </template>
                    </el-menu-item>

                </el-submenu>
      <!-- 导航三 -->
  <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">商品列表</el-menu-item>
          <el-menu-item index="1-2">分类参数</el-menu-item>
          <el-menu-item index="1-2">商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu> 
      <!-- 导航四 -->
  <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu> 
      <!-- 导航五 -->
     <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">数据报表</el-menu-item>
        </el-menu-item-group>
      </el-submenu> 
      
    </el-menu>
</el-row>
</el-aside>


    <el-container>

      <el-main>

      </el-main>

    </el-container>

  </el-container>
</el-container>


    </div>
</template>

<script>

export default {
    beforeCreate() {
         if(!localStorage.getItem('token')){
             this.$router.push({name:'login'})
         }
   },
       data(){
           return {
         
           }
       },
       methods:{
           logout(){
                this.$message.success('退出登陆成功')    
                localStorage.clear();
                this.$router.push({name:'login'})
           },
       }

};
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
