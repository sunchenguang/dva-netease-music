/**
 * Created by 80920 on 2017/2/6.
 */
import request from '../utils/request';
import {NM_API_URL} from '../constants';

/**
 * 获取用户播放列表
 * @param uid
 * @param limit
 * @param offset
 * @returns {Promise.<Object>}
 */
export async function getPlayLists({uid, limit=1000, offset=0}) {
  return request(`${NM_API_URL}/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}`);
}
/**
 * 获取播放列表详情
 * @param id
 * @returns {Promise.<Object>}
 */
export async function getPlayListDetail(id) {
  return request(`${NM_API_URL}/playlist/detail?id=${id}`);
}


