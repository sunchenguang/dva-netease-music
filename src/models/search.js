/**
 * Created by 80920 on 2017/2/20.
 */
import * as songService from '../services/songs'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  isShowSearchResult: false,
  results: [],
  keyword: ''
})


export default {
  namespace: 'search',
  state: initialState,
  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line

    }
  },
  effects: {
    /**
     * 搜索歌曲
     * @param payload 对象，属性参见songService.search方法所接收参数
     * @param call
     * @param put
     * @param select
     */
    * search ({payload}, {call, put, select}) {
      const data = yield call(songService.search, {...payload})
      const results = data.data.result.songs
      yield put({
        type: 'save',
        payload: {
          results,
          isShowSearchResult: true
        }
      })
    },
    * changeKeyword ({payload}, {call, put, select}) {
      const keyword = payload.keyword.trim()
      const isEmptyString = keyword.length <= 0

      if (isEmptyString) {
        yield put({
          type: 'save',
          payload: {
            keyword,
            results: [],
            isShowSearchResult: false
          }
        })
      } else {
        yield put({
          type: 'save',
          payload: {
            keyword
          }
        })
        yield put({
          type: 'search',
          payload: {
            keyword
          }
        })
      }

      // TODO 函数防抖，输入最后一个字后指定时间再去执行搜索
      // if (isShowSearchResult) {
      //   yield put({
      //     type: 'search',
      //     payload: {
      //       keyword
      //     }
      //   });
      // }
    },
    selectSong ({payload}, {put, call}) {

    }
  },

  reducers: {
    save (state, action) {
      return state.merge(action.payload)
    }
  }
}
