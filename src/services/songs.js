/**
 * Created by 80920 on 2017/2/6.
 */
import request from '../utils/request';
import urlencode from 'urlencode';
import {NM_API_URL} from '../constants';

export async function getSongDetails(ids) {
  let params = ids;
  if (!Array.isArray(ids)) {
    params = [ids];
  }
  return request(`${NM_API_URL}/song/detail?ids=${urlencode(JSON.stringify((params)))}`);
}

export async function search({keyword, suggest = false, type = 1, offset = 0, limit = 100, sub = false}) {
  let url = suggest ? `${NM_API_URL}/search/suggest/web` : `${NM_API_URL}/search/get/`;
  let data = {
    s: keyword,
    type,
    offset,
    limit,
    sub
  };
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });

}
