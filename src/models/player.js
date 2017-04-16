/**
 * Created by suncg on 2017/2/7.
 */
import * as songService from '../services/songs'
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
    },
    lyrics: [],
    isLyricOpen: true
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
    },
    * fetchLyric ({payload}, {call, put, select}) {
      let lyric, lyrics
      lyrics = []
      const currentSong = yield select(state => state.player.selectedTrack.onPlayTrack)
      if (currentSong) {
        let songId = currentSong.id
        lyric = yield call(songService.fetchLyric, songId)
        lyric = lyric.data.lrc
        console.log(lyric)
      }
      if (lyric) {
        lyrics = lyric.lyric.split(/\r?\n/).map(item => {
          const index = item.indexOf(']')
          const time = item.slice(1, index)
          const content = item.slice(index + 1)
          return {
            time,
            content
          }
        })
        lyrics = lyrics.filter(item => item.content !== '')
      }
      yield put({
        type: 'save',
        payload: {
          lyrics
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
