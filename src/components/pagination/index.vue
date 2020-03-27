<template>
  <div style="background-color: #fff;padding: 10px 0 0 2px">
    <el-pagination
      v-if='pagination.total > 0'
      :page-sizes="pagination.page_sizes"
      :page-size="pagination.size"
      :layout="pagination.layout"
      :total="pagination.total"
      :current-page.sync='pagination.current'
      @current-change='handleCurrentChange'
      @size-change='handleSizeChange'>
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pagination: {
          current: 1,
          total: 0,
          size: 10,
          page_sizes: [5, 10, 20, 30, 50, 100],
          layout: "total, sizes, prev, pager, next, jumper"
        }
      }
    },
    watch: {
      'pagination.total': function (newValue, oldValue) {
        let size = this.pagination.size;
        if (newValue % size === 0 && newValue === oldValue - 1 && oldValue !== 1) {
          setTimeout(() => {
            this.$emit('getNewData')
          }, 500)
        }
      }
    },
    methods: {
      handleCurrentChange(current) {
        this.pagination.current = current;
        this.$emit('getNewData')
      },
      handleSizeChange(size) {
        this.pagination.size = size;
        this.$emit('getNewData')
      }
    }
  }
</script>

<style scoped>

</style>
