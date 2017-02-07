/**
 * Created by 80920 on 2017/2/6.
 */
import * as songService from '../services/songs';

export default {

  namespace: 'songs',

  state: {
    details: [],
    isShowSearchResult: false,
    search:{
      results:[],
      keyword:''
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
    *getSongDetails({payload:{ids}}, {call, put}) {  // eslint-disable-line
      const data = call(songService.getSongDetails, ids);
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
    *search({payload}, {call, put}){
      const data = call(songService.search, {...payload});
      let searchSongs = data.data.result.songs;
      yield put({
        type: 'save',
        payload: {
          searchSongs
        }
      })
    }
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
