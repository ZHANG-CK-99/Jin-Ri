<template>
  <div class="login-container">
    <van-nav-bar
      class="nav-bar-title"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        name="mobile"
        placeholder="请输入手机号"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        :rules="userFormRules.code"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss 秒后重试"
          />
          <van-button
            class="verify-button"
            v-else
            round
            size="mini"
            @click="onSendSms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendSms } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginIndex',
  props: {},
  components: {},
  data() {
    return {
      user: {
        mobile: '13911111112',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      time: 50 * 1000,
      isCountDownShow: false
    }
  },
  computed: {},
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {
    ...mapMutations(['setUser']),
    onClickLeft() {
      this.$router.back()
    },
    // 提交按钮
    async onSubmit() {
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      try {
        const {
          data: { data }
        } = await login(this.user)
        // console.log(data)
        this.setUser(data)
        this.$toast.success('登陆成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },
    // 发送验证码
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 验证通过
      this.isCountDownShow = true
      // 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送过于频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .icon-shouji {
    font-size: 36px;
  }
  .icon-yanzhengma {
    font-size: 36px;
  }

  // 验证码按钮
  .verify-button {
    background-color: #ededed;
  }
  // 登录按钮
  .login-btn {
    width: 9.25333rem;
    height: 1.17333rem;
    background: #6db4fb;
    border: none;
    border-radius: 0.13333rem;
  }
}
</style>
