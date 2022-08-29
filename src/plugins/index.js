import registerComponents from './components'
import registerFilters from './filter'

const registerPlugins = (Vue) => {
  registerComponents(Vue)
  registerFilters(Vue)
}

export default registerPlugins
