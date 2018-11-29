<template>
<el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-button class="add_btn">添加角色</el-button>
     
     <el-table
      :data="rightlist"
      style="width: 100%"
      >
     <el-table-column type="expand"  width="80">
          <template slot-scope="scope">
             <el-row v-for="(item1,index) in scope.row.children" :key="index">
               <el-col>
                 <el-tag>{{item1.authName}}</el-tag>
               </el-col>
               <el-col >
                 <el-row>
                   <el-col v-for="(item2,i) in scope.row.children[index].children" :key="i">
                     <el-tag>{{item2.authName}}</el-tag>
                   </el-col>
                   <el-col>
                     <el-tag></el-tag>
                   </el-col>
                 </el-row>
               </el-col>
             </el-row>
          </template> 
     </el-table-column>      
      <el-table-column type="index" label="#" width="180" > </el-table-column>

      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>

    
       <el-table-column
        label="操作">
        <template slot-scope="scope" >
          <el-button type="primary" size='mini'  @click="showEditform(scope.row)" :plain='true' circle  icon="el-icon-edit"></el-button>
          <el-button type="success" size='mini' :plain='true'  @click='showBoxRgba(scope.row)' circle icon="el-icon-share"></el-button>
          <el-button type="danger" size='mini' :plain='true' @click='showMegBoxDele(scope.row.id)' circle icon="el-icon-delete"></el-button>
        </template> 
      </el-table-column>
    </el-table>

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
                const res = await this.$http.get(`roles`)
                // console.log(res.data.data)
                this.rightlist=res.data.data
               console.log(res.data.data[0].children )  
            //  console.log(res.data.data.children.children )  
                                                                          
                
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
