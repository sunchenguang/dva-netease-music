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
      artist: '',
      type: '',
      mp3Url: ''
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
    * selectSearchResult({payload}, {call, put, select}){
      yield put({
        type: 'songs/getSongDetails',
        payload: {
          ids: payload.result.id
        }
      });
      let songs = yield select(state => state.songs.details);
      let song = songs[0];

      yield put({
        type: 'save',
        payload: {
          selectedTrack: song,
          trackInfo: {
            imgsrc: song.album.picUrl,
            name: song.name,
            artist: song.artists.map(artist => artist.name).join(","),
            type: "单曲",
            mp3Url: song.mp3Url
          }
        }
      })

    }
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
    // setCurrentTrack(state, action){
    //
    // }

  },

};
