<template>
  <el-card class="box-card">
    <el-table v-loading="isTableLoading" :data="formData">
      <el-table-column prop="questionname" label="账号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="question_time" label="注册时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <delete-button
                  :ref="scope.row.question_id"
                  :id="scope.row.question_id"
                  @start="deleteQuestion"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @getNewData="getQuestion"></pagination>
  </el-card>
</template>

<script>
  import {getQuestionApi, deleteQuestionApi} from '@/api/question'

  export default {
    name: "Comment",
    data() {
      return {
        isTableLoading: false,
        video_id: null,
        formData: []
      }
    },
    mounted() {
      this.video_id = this.$route.query.video_id;
      this.getQuestion()
    },
    methods: {
      getQuestion() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}&video_id=${this.video_id}`;
        getQuestionApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.data;
          this.formData = response.message;
          pagination.total = response.count;
        })
      },
      deleteQuestion(id) {
        deleteQuestionApi(id)
            .then(() => {
              this.getQuestion();
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
