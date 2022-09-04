<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      :title="item"
      icon="search"
    >
      <template #title>
        <span v-html="hightlightText(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      immediate: true,
      handler: 'searchTextWatch'
    }
  },
  created() {},
  mounted() {},
  methods: {
    searchTextWatch: debounce(function (val) {
      this.loadSearchSuggestion(val)
    }, 1000),
    async loadSearchSuggestion(q) {
      try {
        const {
          data: {
            data: { options }
          }
        } = await getSearchSuggestion(q)
        // console.log(options)
        this.suggestions = options
      } catch (error) {
        this.$toast('获取失败')
      }
    },
    hightlightText(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
/deep/.active {
  color: red;
}
</style>
