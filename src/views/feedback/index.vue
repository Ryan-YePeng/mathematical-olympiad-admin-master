<template>
  <el-card class="box-card" id="feedback">
    <el-table v-loading="isTableLoading" :data="formData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="反馈内容">
              <span>{{ props.row.message }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="message" label="内容" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="feedback_time" label="时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <delete-button
                  :ref="scope.row.feedback_id"
                  :id="scope.row.feedback_id"
                  @start="deleteFeedback"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @getNewData="getFeedback"></pagination>
  </el-card>
</template>

<script>
  import {getFeedbackApi, deleteFeedbackApi} from '@/api/feedback'

  export default {
    name: "Feedback",
    data() {
      return {
        isTableLoading: false,
        formData: [],
      }
    },
    mounted() {
      this.getFeedback()
    },
    methods: {
      getFeedback() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}`;
        getFeedbackApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.data;
          this.formData = response.message;
          pagination.total = response.count;
        })
      },
      deleteFeedback(id) {
        deleteFeedbackApi(id)
            .then(() => {
              this.getFeedback();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
      }
    }
  }
</script>

<style lang="scss">
  #feedback {
    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      word-break: break-word;
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }
  }
</style>
