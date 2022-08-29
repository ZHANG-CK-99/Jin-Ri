import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

const filters = {
  relativeTime: function (value) {
    return dayjs().to(dayjs(value))
  }
}

const registerFilters = (Vue) => {
  for (const filterName in filters) {
    Vue.filter(filterName, filters[filterName])
  }
}

export default registerFilters
