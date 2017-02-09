/**
 * Created by 80920 on 2017/2/6.
 */
import request from "../utils/request";
import urlencode from "urlencode";
import {NM_API_URL} from "../constants";
import qs from "qs";

export async function getSongDetails(ids) {
  let params = ids;
  if (!Array.isArray(ids)) {
    params = [ids];
  }
  return request(`${NM_API_URL}/song/detail?ids=${urlencode(JSON.stringify((params)))}`);
}

export async function search({keyword, suggest = false, type = 1, offset = 0, limit = 20, sub = false}) {
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
    body: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
  // axios.post('/foo', qs.stringify({ 'bar': 123 });

  // let result = await axios({
  //   method: 'post',
  //   url,
  //   data: qs.stringify(data),
  //   headers: {
  //     'X-Requested-With': 'XMLHttpRequest',
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  //
  //   }
  // })
  // return {
  //   data: result
  // }

}
