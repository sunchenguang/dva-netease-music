/**
 * Created by suncg on 2017/2/7.
 */
// import * as songService from '../services/songs';
import { delay } from '../utils/sagaHelper'

export default {
  namespace: 'player',
  state: {
    selectedTrack: {
      onPlayTrack: {},
      playState: false,
      duration: 0,
      currentTime: 0,
      currentTimeStr: '00:00',
      imgSrc: '',
      artistName: '',
      trackName: '未知',
      mp3Url: '',
      isMuted: false,
      isLocked: false,
      volume: 0.5
    },
    trackInfo: {
      imgSrc: '',
      name: '',
      artist: ''
    }
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line

    }
  },

  effects: {
    * selectSearchResult ({payload}, {call, put, select}) {
      yield put({
        type: 'user/getSongDetails',
        payload: {
          ids: payload.id
        }
      })

      yield call(delay, 1000)

      const songs = yield select(state => state.user.songDetails)
      const song = songs[0]

      yield put({
        type: 'setSelectedTrack',
        payload: {
          selectedTrack: song
        }
      })
    },
    * changeSong ({payload}, {call, put, select}) {
      const direction = payload.direction
      const currentSong = yield select(state => state.player.selectedTrack.onPlayTrack)
      const songList = yield select(state => state.user.playListDetail)
      const currentSongIndex = songList.indexOf(currentSong)
      const newIndex = direction === 'prev' ? currentSongIndex - 1 : currentSongIndex + 1
      yield put({
        type: 'setSelectedTrack',
        payload: {
          selectedTrack: songList[newIndex]
        }
      })
    }

  },

  reducers: {
    save (state, action) {
      return {...state, ...action.payload}
    },
    setSelectedTrack (state, action) {
      const track = action.payload.selectedTrack
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
          artistName: track.artists.map(artist => artist.name).join(','),
          trackName: track.name,
          mp3Url: track.mp3Url
        }
      }
    },
    changeTrackState (state, action) {
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

  }

}
