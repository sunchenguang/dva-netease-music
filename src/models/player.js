/**
 * Created by suncg on 2017/2/7.
 */
// import * as songService from '../services/songs';

export default {
  namespace: 'player',
  state: {
    selectedTrack: {
      onPlayTrack: {},
      playState: false,
      duration: 0,
      currentTime: 0,
      currentTimeStr: '00:00',
      imgSrc: "",
      artistName: "",
      trackName: "未知",
      mp3Url: "",
      isMuted: false,
      isLocked: false
    },
    trackInfo: {
      imgSrc: '',
      name: '',
      artist: ''
    },
    currentSong: {
      isPlaying: false,
      duration: '/00:00',
      currentTime: '00:00',
    },
    imgSrc: '',
    artistName: '',
    trackName: '未知',
    isReady: false
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
    setSelectedTrack(state, action){
      let track = action.payload.selectedTrack;
      return {
        ...state,
        selectedTrack: {
          ...state.selectedTrack,
          onPlayTrack: track,
          playState: true,
          // duration: "/" + TimeUtil.formateTime(track.lMusic ? track.lMusic.playTime : track.duration),
          duration: track.lMusic ? track.lMusic.playTime : track.duration,

          currentTime: 0,
          imgSrc: track.album.blurPicUrl,
          artistName: track.artists.map(artist => artist.name).join(","),
          trackName: track.name,
          mp3Url: track.mp3Url
        }
      }
    },
    changeTrackState(state, action) {
      return {
        ...state,
        selectedTrack: {
          ...state.selectedTrack,
          ...action.payload
        }
      }
    }

    // saveTrackInfo(state, action) {
    //   return
    // }
    // setCurrentTrack(state, action){
    //
    // }

  },

};
