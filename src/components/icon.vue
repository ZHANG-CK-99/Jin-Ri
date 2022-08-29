<template>
  <i :class="['iconfont', `icon-${icon}`]"></i>
</template>
<script>
export default {
  name: 'IconFont',
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  // 生命周期 - 创建完成(访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(访问DOM元素)
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less"></style>
