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
            <el-row v-if='scope.row.children.length == 0'>
                <span>未分配权限</span>
            </el-row>
             <el-row v-for="(item1,index) in scope.row.children" 
             :key="index" 
             :span="10"
             >
               <el-col :span="4">
                 <el-tag  type="success" closable  @close="closeTag(scope.row,item1.id)">{{item1.authName}}</el-tag>
                   <i class="el-icon-arrow-right"></i>
               </el-col>
               <el-col :span="20" >
                 <el-row  v-for="(item2,i) in item1.children" :key="i"  :span="14" >
                   <el-col :span="5">
                     <el-tag type="warning" closable  @close="closeTag(scope.row)">{{item2.authName}}</el-tag>
                     <i class="el-icon-arrow-right"></i>                     
                   </el-col>
                   <el-col :span="19">
                     <el-tag type="info" closable v-for="(item3,ina) in item2.children" :key="ina" 
                     @close="closeTag(scope.row,item3.id)">{{item3.authName}}</el-tag>
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

      <!-- 编辑页面显示 -->
          <el-dialog title="修改权限" :visible.sync="dialogFormVisibleEdit">
         <el-tree
                   ref="tree"
                  :data="treelist"
                  default-expand-all
                  show-checkbox
                  node-key="id"
                  :default-checked-keys="arrcheck"
                  :props="defaultProps">
          </el-tree>            
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
              <el-button type="primary" @click="setRoleRight()">确 定</el-button>
            </div>
          </el-dialog>
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
                    dialogFormVisibleEdit:false,
                          treelist: [],
                          arrexpand: [],
                          arrcheck: [],
                          defaultProps: {
                            children: 'children',
                            label: 'authName'
                          },
                      // 当前要修改权限的角色id
                            currRoleId: -1
                                      }
                   },

        methods:{
          async  getlist(){
                const res = await this.$http.get(`roles`)
                // console.log(res.data.data)
                this.rightlist=res.data.data
               //  console.log(res.data.data[0].children )  
               //  console.log(res.data.data.children.children )                                                                    
            },
           async closeTag(rolid){
            //  console.log(rightId)
             console.log(rolid)
                 const res = await this.$http.delete(`roles/${rolid.id}/rights/${rolid.children.id}`)
                 console.log(res)
                //  rolid.children = res.data.data
            },
            // 编辑显示事件
          async  showEditform(role){
                  this.currRoleId = role.id
                  this.dialogFormVisibleEdit=true;    
                  const res = await this.$http.get(`rights/tree`)
                  this.treelist=res.data.data
                  // console.log(res)
                   //获取该角色role的权限id
                  let arrtemp = []
                  role.children.forEach(item1 => {
                    // arrtemp.push(item1.id)
                    item1.children.forEach(item2 => {
                      // arrtemp.push(item2.id)
                      item2.children.forEach(item3 => {
                        arrtemp.push(item3.id)
                      })
                    })
                  })
                  this.arrcheck = arrtemp

                  this.dialogFormVisibleEdit = true
            },
          // 编辑添加确定按钮
           async setRoleRight(){
                            let arr2 = this.$refs.tree.getHalfCheckedKeys()
                            // console.log(arr2)

                            // 获取全选节点id的数组 getCheckedKeys
                            let arr1 = this.$refs.tree.getCheckedKeys()
                            // console.log(arr1)

                            // ES6 展开操作运算符
                            let arr = [...arr1, ...arr2]
                            // console.log(arr)

                            const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
                              rids: arr.join(',')
                            })
                            // console.log(res)
                            this.dialogFormVisibleEdit = false
                            this.getlist()
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
