<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        class="edit-text"
        size="mini"
        round
        type="danger"
        plain
        @click="updateEditShow"
        >{{ isEditShow ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channelItem, index) in myChannels"
        @click="onMyChannelClick(channelItem, index)"
        :key="index"
        :icon="icon"
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
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        icon="plus"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/articel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
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
    return {
      allChannels: [],
      isEditShow: false, // 控制编辑状态
      icon: ''
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.some((myItem) => item.id === myItem.id)
      })
    },
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const {
          data: { data }
        } = await getAllChannels()
        this.allChannels = data.channels
      } catch (err) {
        this.$toast('获取频道数据列表失败')
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)
      // 判断是否登录
      if (this.user) {
        // 已登录
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败')
        }
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick(channelItem, index) {
      // 判断是否处于编辑状态
      if (this.isEditShow) {
        // 编辑状态
        // 判断当前删除的是否是推荐频道
        if (index === 0) {
          return this.$toast('推荐频道不可删除哦')
        }

        if (index <= this.active) {
          this.$emit('update:active', this.active - 1)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannel(channelItem)
      } else {
        // 非编辑状态
        // 同步更新active的状态
        this.$emit('update:active', index)
        this.$emit('closeEditShow', false)
      }
    },
    updateEditShow() {
      this.isEditShow = !this.isEditShow
      this.isEditShow ? (this.icon = 'close') : (this.icon = '')
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录将数据存储到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除失败,请稍后重试')
      }
    }
  }
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
