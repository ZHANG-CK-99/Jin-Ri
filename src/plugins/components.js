import selfIcon from '@/components/icon'

const components = {
  selfIcon
}

const registerComponents = (Vue) => {
  for (const cpnName in components) {
    Vue.component(cpnName, components[cpnName])
  }
}

export default registerComponents
