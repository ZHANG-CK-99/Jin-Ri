<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <van-image fit="cover" :src="userInfo.photo" class="avatar" round />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <!-- /已登录头部 -->
    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->
    <!-- 已登录头部 -->

    <!-- 宫格 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="文字">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 宫格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell @click="onLogout" class="logout-cell" title="退出登录" center />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.user ? this.loadUser() : null
  },
  mounted() {},
  methods: {
    ...mapMutations(['setUser']),
    // 退出
    async onLogout() {
      try {
        await this.$dialog.confirm({
          title: '确认退出吗?'
        })
        this.setUser(null)
      } catch (err) {
        this.$toast('退出失败')
      }
    },
    // 获取用户信息
    async loadUser() {
      try {
        const {
          data: { data }
        } = await getUserInfo()
        this.userInfo = data
        // console.log(this.userInfo)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  // 未登录
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  // 已登录
  .user-info {
    //background: red;
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 30px;
        }
      }
    }
    .data {
      display: flex;
      justify-content: space-around;
      .data-item {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        span:nth-child(1) {
          font-size: 36px;
          margin-bottom: 15px;
        }
        span:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
  // 宫格
  .grid-nav {
    background: #fff;
    .iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  //通知栏
  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
