import * as userService from '../services/user'
import * as songService from '../services/songs'

export default {

  namespace: 'user',

  state: {
    userId: '77680183',
    playLists: [],
    playListDetail: [],
    selectedPlayListId: '',
    songDetails: []
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        dispatch({
          type: 'getPlayLists',
          payload: query
        })
      })
    }
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
      *getPlayLists({payload: {limit, offset}}, {call, put, select}) {  // eslint-disable-line
      const uid = yield select(state => state.user.userId)
      const data = yield call(userService.getPlayLists, {uid, limit, offset})
      const playLists = data.data.playlist
      yield put({
        type: 'save',
        payload: {
          playLists
        }
      })
      yield put({
        type: 'setSelectedPlayListId'
      })
      yield put({
        type: 'getPlayListDetail',
        payload: {
          id: yield select(state => state.user.selectedPlayListId)
        }
      })
    },
    /**
     * 获取歌单详情
     * @param id
     * @param call
     * @param put
     * @param select
     */
      * getPlayListDetail ({payload: {id}}, {call, put, select}) {
      const data = yield call(userService.getPlayListDetail, id)
      const playListDetail = data.data.result
      yield put({
        type: 'setSelectedPlayListId',
        payload: {
          id
        }
      })

      yield put({
        type: 'player/save',
        payload: {
          trackInfo: {
            name: playListDetail.name,
            imgSrc: playListDetail.coverImgUrl,
            artist: playListDetail.creator.nickname
          }
        }
      })

      yield put({
        type: 'save',
        payload: {
          playListDetail: playListDetail.tracks
        }
      })
    },
    /**
     * 获取多首歌曲详情
     * @param ids
     * @param call
     * @param put
     */
      * getSongDetails({payload: {ids}}, {call, put}) {  // eslint-disable-line
      const data = yield call(songService.getSongDetails, ids)
      const songDetails = data.data.songs

      yield put({
        type: 'save',
        payload: {
          songDetails
        }
      })
    }
  },

  reducers: {
    save (state, action) {
      return {...state, ...action.payload}
    },
    setSelectedPlayListId (state, action) {
      const selectedPlayListId = action.payload && action.payload.id ? action.payload.id : state.playLists[0].id
      return {...state, selectedPlayListId}
    }
  }

}
