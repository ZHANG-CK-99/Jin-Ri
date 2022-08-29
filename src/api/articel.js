/**
 * 文章接口模块
 */
import request from '@/utils/request'

/**
 * 获取文章的频道列表
 */

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
