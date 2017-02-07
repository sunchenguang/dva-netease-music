import * as userService from "../services/user";

export default {

  namespace: 'user',

  state: {
    userId: '77680183',
    playLists: [],
    playListDetail: {},
    selectedPlayListId: ''
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === '/app') {
          dispatch({
            type: 'getPlayLists',
            payload: query
          })
        }
      })
    },
  },

  effects: {
    /**
     * 获取用户歌单列表
     * @param limit
     * @param offset
     * @param call
     * @param put
     * @param select
     */
      *getPlayLists({payload:{limit, offset}}, {call, put, select}) {  // eslint-disable-line
      let uid = yield select(state => state.user.userId);
      const data = yield call(userService.getPlayLists, {uid, limit, offset});
      const playLists = data.data.playlist;
      yield put({
        type: 'save',
        payload: {
          playLists
        }
      });
      yield put({
        type: 'setSelectedPlayListId'
      })
    },
    /**
     * 获取歌单详情
     * @param id
     * @param call
     * @param put
     */
      *getPlayListDetail({payload:{id}}, {call, put}){
      const data = yield call(userService.getPlayListDetail, id);
      const playListDetail = data.data.result;
      yield put({
        type: 'save',
        payload: {
          playListDetail
        }
      })

    }
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
    setSelectedPlayListId(state, action){
      let selectedPlayListId = action.payload && action.payload.id ? action.payload.id : state.playLists[0].id;
      return {...state, selectedPlayListId}
    }
  },

};
