/**
 * Created by 80920 on 2017/2/6.
 */
import * as songService from "../services/songs";

export default {

  namespace: 'songs',

  state: {
    details: [],
    search: {
      isShowSearchResult: false,
      results: [],
      keyword: ''
    }
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line

    },
  },

  effects: {
    /**
     * 获取多首歌曲详情
     * @param ids
     * @param call
     * @param put
     */
      * getSongDetails({payload:{ids}}, {call, put}) {  // eslint-disable-line
      const data = yield call(songService.getSongDetails, ids);
      let details = data.data.songs;

      yield put({
        type: 'save',
        payload: {
          details
        }
      });
    },
    /**
     * 搜索歌曲
     * @param payload 对象，属性参见songService.search方法所接收参数
     * @param call
     * @param put
     */
      * search({payload}, {call, put}){
      const data = yield call(songService.search, {...payload});
      let results = data.data.result.songs;
      yield put({
        type: 'save',
        payload: {
          search: {
            results
          }
        }
      })
    },
    * changeKeyword({payload}, {call, put}){
      let keyword = payload.keyword;


      yield put({
        type: 'save',
        payload: {
          search: {
            keyword
          }
        }
      });
      //函数防抖，输入最后一个字后指定时间再去执行搜索
      yield put({
        type: 'search',
        payload: {
          keyword
        }
      });


    }

  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
    // changeKeyword(state, action){
    //   return {}
    // }
  },

};
