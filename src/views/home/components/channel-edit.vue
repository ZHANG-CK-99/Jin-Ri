<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button class="edit-text" size="mini" round type="danger" plain
        >编辑</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channelItem, index) in myChannels"
        :key="index"
        icon="close"
      >
        <span class="text" :class="{ active: active === index }" slot="text">{{
          channelItem.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="value in 8"
        :key="value"
        text="文字"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.channel-edit {
  .van-cell__value {
    .edit-text {
      width: 100px;
    }
  }
  .channel-item {
    height: 86px;
    /deep/.van-grid-item__content {
      position: relative;
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 20px;
        white-space: nowrap;
      }
      .active {
        color: red;
      }
      .van-icon-close {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 32px;
        color: #ccc;
      }
    }
  }
  /deep/.recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon-plus {
        font-size: 24px;
      }

      .van-grid-item__text {
        font-size: 20px;
        margin-top: 0;
      }
    }
  }
}
</style>
