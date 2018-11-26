<template>
               
               <div class="formdata">
                    <el-form label-position="top" label-width="200px" class="formdata_a">
                    <h2>用户登录</h2>
                    <el-form-item label="用户名">
                        <el-input v-model="formdata.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formdata.region"></el-input>
                    </el-form-item>  
                      <el-button type="primary" class="button">成功按钮</el-button>       
                    </el-form>
                </div>
</template>


<script>
    
export default {
      data(){
          return  {
                formdata:{
                    username:'',
                    pwdword:'',
                }     
          }
      }
}

</script>


<style>
.formdata{
     display: flex;
     height:100%;
     justify-content: center;
     align-items: center;
     background:#324152; 
   
}

.formdata_a{
    width: 400px;
    background: white;
    padding: 20px;
    border-radius: 15px;
}

.button{
    width: 100%;
}
</style>
