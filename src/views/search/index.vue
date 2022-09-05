<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/">
      <van-search
        background="#3296fa"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <div class="context">
      <!-- 搜索结果 -->
      <search-result v-if="isResultShow" :searchText="searchText" />
      <!-- /搜素结果 -->

      <!-- 联想建议 -->
      <search-suggestion
        @search="onSearch"
        v-else-if="searchText"
        :searchText="searchText"
      />
      <!-- /联想建议 -->

      <!-- 搜索历史记录 -->
      <search-history
        @search="onSearch"
        v-else
        :searchHistory.sync="searchHistory"
      />
      <!-- /搜索历史记录 -->
    </div>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('search-history') || []
    }
  },
  computed: {},
  watch: {
    searchHistory: 'searchHistorys'
  },
  created() {},
  methods: {
    onSearch(val) {
      this.searchText = val
      // 存储搜索历史记录
      // 不要有重复的数据
      const index = this.searchHistory.indexOf(val)
      // 判断
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$toast('取消')
    },
    searchHistorys(val) {
      // 同步到本地
      setItem('search-history', val)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
  }
  .context {
    height: calc(100vh - 108px);
    overflow: auto;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
