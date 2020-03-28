<template>
  <div id="video">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-select
          class="w-150"
          clearable
          @change="getVideo"
          v-model="searchGrade"
        >
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="success" @click="getVideo" class="ml-5"
          >搜索</el-button
        >
        <el-button class="float-right" type="primary" @click="add"
          >新增</el-button
        >
      </div>
      <el-table v-loading="isTableLoading" :data="formData">
        <el-table-column label="视屏名称" prop="video_name"></el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-avatar shape="square" :src="baseUrl + scope.row.cover">
              <img src="../../../assets/noFoundPicture.png" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="年级" prop="grade"></el-table-column>
        <el-table-column label="授课老师" prop="teacher"></el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            <span>{{ scope.row.video_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template slot-scope="scope">
            <el-button type="success" @click="check(scope.row)">提问</el-button>
            <el-button
              type="primary"
              @click="edit(scope.row)"
              icon="el-icon-edit"
            ></el-button>
            <delete-button
              :ref="scope.row.video_id"
              :id="scope.row.video_id"
              @start="deleteVideo"
            />
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @getNewData="getVideo"></pagination>
    </el-card>
    <add-video ref="AddVideo" @update="getVideo" :options="options"></add-video>
    <edit-video
      ref="EditVideo"
      @update="getVideo"
      :options="options"
    ></edit-video>
  </div>
</template>

<script>
import { getVideoApi, deleteVideoApi } from "@/api/video";
import AddVideo from "./add";
import EditVideo from "./edit";
import { objectEvaluate } from "@/utils/common";

export default {
  name: "VideoList",
  components: { AddVideo, EditVideo },
  data() {
    return {
      isTableLoading: false,
      formData: [],
      searchGrade: "",
      options: [
        { key: 1, label: "一年级", value: "一年级" },
        { key: 2, label: "二年级", value: "二年级" },
        { key: 3, label: "三年级", value: "三年级" },
        { key: 4, label: "四年级", value: "四年级" },
        { key: 5, label: "五年级", value: "五年级" },
        { key: 6, label: "六年级", value: "六年级" }
      ]
    };
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_PICTURE_BASE_API;
    }
  },
  mounted() {
    this.getVideo();
  },
  methods: {
    getVideo() {
      this.isTableLoading = true;
      let pagination = this.$refs.Pagination;
      let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}&grade=${this.searchGrade}`;
      getVideoApi(param).then(result => {
        this.isTableLoading = false;
        let response = result.data;
        this.formData = response.message;
        pagination.total = response.count;
      });
    },
    deleteVideo(id) {
      deleteVideoApi(id)
        .then(() => {
          this.getVideo();
          this.$refs[id].close();
        })
        .catch(() => {
          this.$refs[id].stop();
        });
    },
    add() {
      let _this = this.$refs.AddVideo;
      _this.visible = true;
    },
    edit(obj) {
      let _this = this.$refs.EditVideo;
      _this.imageUrl = this.baseUrl + obj.cover;
      _this.videoUrl = this.baseUrl + obj.path;
      objectEvaluate(obj, _this.form);
      _this.visible = true;
    },
    check(obj) {
      this.$router.push({
        name: "question",
        params: { video_id: obj.video_id, video_name: obj.video_name }
      });
    }
  }
};
</script>

<style lang="scss">
#video {
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
