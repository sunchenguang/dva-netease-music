/**
 * Created by suncg on 2017/2/7.
 */
// import * as songService from '../services/songs';

export default {

  namespace: 'player',

  state: {
    selectedTrack: null,
    trackInfo: {
      imgSrc: '',
      name: '',
      artistName: '',
      type: ''
    },
    currentSong: {
      isPlaying: false,
      duration: '/00:00',
      currentTime: '00:00',
    },
    imgSrc: '',
    artistName: '',
    trackName: '未知',
    isReady: false,
    isMuted: false
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line

    },
  },

  effects: {

  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
