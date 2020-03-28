<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="video_name"></el-page-header>
    </div>
    <el-table v-loading="isTableLoading" :data="formData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.answer">
            <el-table-column
              prop="message"
              label="回复内容"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="answer_time"
              label="回复时间"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <delete-button
                  :ref="'answer' + scope.row.answer_id"
                  :id="scope.row.answer_id"
                  @start="deleteAnswer"
                />
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar shape="square" :src="baseUrl + scope.row.avatar">
            <img src="../../../assets/noFoundPicture.png" />
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="message"
        label="提问内容"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="question_time" label="提问时间"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="reply(scope.row.question_id)"
            >回复</el-button
          >
          <delete-button
            :ref="scope.row.question_id"
            :id="scope.row.question_id"
            @start="deleteQuestion"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @getNewData="getQuestion"></pagination>
    <reply-form ref="ReplyForm" @update="getQuestion"></reply-form>
  </el-card>
</template>

<script>
import {
  getQuestionApi,
  deleteQuestionApi,
  deleteAnswerApi
} from "@/api/question";
import { isEmpty } from "@/utils/common";
import ReplyForm from "./form";

export default {
  name: "Question",
  components: { ReplyForm },
  data() {
    return {
      isTableLoading: false,
      video_id: null,
      video_name: "",
      formData: []
    };
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_PICTURE_BASE_API;
    }
  },
  mounted() {
    this.video_id = this.$route.params.video_id;
    if (isEmpty(this.video_id)) {
      this.goBack();
      return;
    }
    this.video_name = this.$route.params.video_name;
    this.getQuestion();
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
      });
    },
    reply(id) {
      let _this = this.$refs.ReplyForm;
      _this.form.question_id = id;
      _this.visible = true;
    },
    goBack() {
      this.$router.push({ name: "video_list" });
    },
    deleteQuestion(id) {
      deleteQuestionApi(id)
        .then(() => {
          this.getQuestion();
          this.$refs[id].close();
        })
        .catch(() => {
          this.$refs[id].stop();
        });
    },
    deleteAnswer(id) {
      deleteAnswerApi(id)
        .then(() => {
          this.getQuestion();
          this.$refs["answer" + id].close();
        })
        .catch(() => {
          this.$refs["answer" + id].stop();
        });
    }
  }
};
</script>

<style scoped></style>
