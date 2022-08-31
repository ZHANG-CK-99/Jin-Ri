<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 频道文章列表 -->
        <article-list :channel="item"></article-list>
        <!-- /频道文章列表 -->
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <!-- <i class="iconfont icon-gengduo"></i> -->
          <!-- 可以封装一个全局组件 -->
          <selfIcon icon="gengduo"></selfIcon>
        </div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- 频道编辑 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit :active="active" :myChannels="channels"></channel-edit>
    </van-popup>
    <!-- /频道编辑 -->
    <!-- /弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from '@/views/home/components/channel-edit.vue'
export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      channels: [],
      isChannelEditShow: true, // 这里我们先设置为 true 就能看到弹窗的页面了
      active: 0
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        const {
          data: {
            data: { channels }
          }
        } = await getUserChannels()
        this.channels = channels
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .page-nav-bar {
    top: 0;
    left: 0;
    right: 0;
    /deep/.van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 2;
      left: 0;
      right: 0;
      height: 82px;
      width: 100%;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      // &:before {
      //   content: '';
      //   position: absolute;
      //   left: 0;
      //   width: 1px;
      //   height: 100%;
      //   background-image: url(~@/assets/gradient-gray-line.png);
      //   background-size: contain;
      // }
    }
  }
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
}
</style>
