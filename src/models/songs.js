/**
 * Created by 80920 on 2017/2/6.
 */
import * as songService from "../services/songs";
import {delay} from "../utils/sagaHelper";

function* handleInput(keyword, put) {
  yield call(delay, 500);

  if (keyword.length === 0) {
    return false;
  }

  yield put({
    type: 'search',
    payload: {
      keyword
    }
  });

}
const watcher = {type: 'watcher'};

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
     * @param select
     */
      * search({payload}, {call, put, select}){
      const data = yield call(songService.search, {...payload});
      let results = data.data.result.songs;
      let search = yield select(state => state.songs.search);
      yield put({
        type: 'save',
        payload: {
          search: {
            ...search,
            results
          }
        }
      });
    },
    * changeKeyword({payload}, {call, put, select}){
      let keyword = payload.keyword.trim();
      let isShowSearchResult = keyword.length > 0;
      let search = yield select(state => state.songs.search);

      yield put({
        type: 'save',
        payload: {
          search: {
            ...search,
            keyword,
            isShowSearchResult,
            results: isShowSearchResult ? search.results : []
          }
        }
      });

      return {
        keyword
      };
      //TODO 函数防抖，输入最后一个字后指定时间再去执行搜索
      // if (isShowSearchResult) {
      //   yield put({
      //     type: 'search',
      //     payload: {
      //       keyword
      //     }
      //   });
      // }


    },
    changeKeywordWatcher: [function*({take, put, call, cancel}) {
      let task;
      while (true) {
        const {keyword} = yield take('changeKeyword');
        if (task) {
          yield cancel(task);
        }
        task = yield fork(handleInput, keyword, put);
      }
    }, watcher]
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
