<template>
<el-card>
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <el-button class="add_btn">添加角色</el-button>
     
</el-card>
</template>

<script>
export default {

       mounted(){
                  this.getlist()
                },
 
            data(){
                return {
                    rightlist:[],
                }
            },

        methods:{
          async  getlist(){
                const res = await this.$http.get(`rights/list`)
                console.log(res)
                this.rightlist=res.data.data
            },
        },
      
    }

</script>

<style>
.add_btn{
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
