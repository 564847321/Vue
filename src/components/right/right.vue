<template>
<el-card>
     <el-table
    :data="rightlist"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      type="index"
      label="#"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="角色名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="province"
      label="角色描述"
      width="450">
    </el-table-column>
    <el-table-column
      prop="city"
      label="操作"
      width="200">
    </el-table-column>
  </el-table>
</el-card>
</template>

<script>
export default {
    data:{
        return:{
            rightlist:{}
        }
    }
}
</script>

<style>

</style>
