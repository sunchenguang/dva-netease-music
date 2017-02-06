/**
 * Created by 80920 on 2017/2/6.
 */
import * as songService from '../services/songs';

export default {

  namespace: 'songs',

  state: {
    details: [],
    searchSongs: []
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line

    },
  },

  effects: {
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
