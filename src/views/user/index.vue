<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-select
              class="w-150"
              @change="getUser"
              clearable
              v-model="searchGrade">
        <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-button type="success" @click="getUser" class="ml-5">搜索</el-button>
    </div>
    <el-table v-loading="isTableLoading" :data="formData">
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="user_time" label="注册时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <delete-button
                  :ref="scope.row.user_id"
                  :id="scope.row.user_id"
                  @start="deleteUser"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @getNewData="getUser"></pagination>
  </el-card>
</template>

<script>
  import {getUserApi, deleteUserApi} from '@/api/user'

  export default {
    name: "User",
    data() {
      return {
        isTableLoading: false,
        formData: [],
        searchGrade: '',
        options: [
          {key: 1, label: '一年级', value: '一年级'},
          {key: 2, label: '二年级', value: '二年级'},
          {key: 3, label: '三年级', value: '三年级'},
          {key: 4, label: '四年级', value: '四年级'},
          {key: 5, label: '五年级', value: '五年级'},
          {key: 6, label: '六年级', value: '六年级'}
        ]
      }
    },
    mounted() {
      this.getUser()
    },
    methods: {
      getUser() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}&grade=${this.searchGrade}`;
        getUserApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.data;
          this.formData = response.message;
          pagination.total = response.count;
        })
      },
      deleteUser(id) {
        deleteUserApi(id)
            .then(() => {
              this.getUser();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
      }
    }
  }
</script>

<style scoped>

</style>
