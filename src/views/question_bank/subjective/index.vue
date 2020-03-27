<template>
  <div id="subjective">
    <el-card class="box-card" v-show="isShow">
      <div slot="header" class="clearfix">
        <el-select
                class="w-150"
                clearable
                @change="getSubjective"
                v-model="searchGrade">
          <el-option
                  v-for="item in options"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-button type="success" @click="getSubjective" class="ml-5">搜索</el-button>
        <el-button class="float-right" type="primary" @click="add">新增</el-button>
      </div>
      <el-table v-loading="isTableLoading" :data="formData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="top" inline class="demo-table-expand">
              <el-form-item label="题目">
                <div v-html="props.row.question"></div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>题目{{scope.row.subjective_id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)" icon="el-icon-edit"></el-button>
            <delete-button
                    :ref="scope.row.subjective_id"
                    :id="scope.row.subjective_id"
                    @start="deleteSubjective"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @getNewData="getSubjective"></pagination>
    </el-card>
    <subjective-form ref="SubjectiveForm" @update="getSubjective" @tab="tab" v-show="!isShow"
                     :options="options"></subjective-form>
  </div>
</template>

<script>
  import {getSubjectiveApi, deleteSubjectiveApi} from '@/api/question'
  import SubjectiveForm from './form'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Completion",
    components: {SubjectiveForm},
    data() {
      return {
        isTableLoading: false,
        formData: [],
        searchGrade: '',
        isShow: true,
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
      this.getSubjective()
    },
    methods: {
      tab() {
        this.isShow = !this.isShow
      },
      getSubjective() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `pageNumber=${pagination.current}&pageCount=${pagination.size}&grade=${this.searchGrade}`;
        getSubjectiveApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.data;
          this.formData = response.message;
          pagination.total = response.count;
        })
      },
      deleteSubjective(id) {
        deleteSubjectiveApi(id)
            .then(() => {
              this.getSubjective();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
      },
      add() {
        let _this = this.$refs.SubjectiveForm;
        _this.title = '新增填空题';
        this.tab()
      },
      edit(obj) {
        let _this = this.$refs.SubjectiveForm;
        _this.title = '编辑填空题';
        objectEvaluate(obj, _this.form);
        _this.$refs.Editor.setContent(obj.question);
        this.tab()
      }
    }
  }
</script>

<style lang="scss">
  #subjective {
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
