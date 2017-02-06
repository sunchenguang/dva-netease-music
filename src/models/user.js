import * as userService from '../services/user';

export default {

  namespace: 'user',

  state: {
    userId: '77680183',
    playList: [],
    playListDetail: {}
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === '/') {
          dispatch({
            type: 'getPlayLists',
            payload: query
          })
        }
      })
    },
  },

  effects: {
    *getPlayLists({payload:{limit, offset}}, {call, put, select}) {  // eslint-disable-line
      let uid = yield select(state => state.user.userId);
      const data = yield call(userService.getPlayLists, {uid, limit, offset});
      const playlist = data.data.playlist;
      yield put({
        type: 'save',
        payload: {
          playlist
        }
      });
    },
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
  },

};
