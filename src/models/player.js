/**
 * Created by suncg on 2017/2/7.
 */
import * as songService from '../services/songs'
import { delay } from '../utils/sagaHelper'
import SongUtil from '../utils/song'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
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
  isLyricOpen: true,
  songList: []
})

export default {
  namespace: 'player',
  state: initialState,

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

      const songs = yield select(state => state.user.get('songDetails'))
      const song = songs.get(0)

      yield put({
        type: 'setSelectedTrack',
        payload: {
          selectedTrack: song
        }
      })
    },
    * changeSong ({payload}, {call, put, select}) {
      const direction = payload.direction
      const currentSong = yield select(state => state.player.getIn(['selectedTrack', 'onPlayTrack']))
      const songList = yield select(state => state.user.get('playListDetail'))

      const currentSongIndex = songList.findIndex((item) => {
        return item.get('id') === currentSong.get('id')
      })

      let newIndex = direction === 'prev' ? currentSongIndex - 1 : currentSongIndex + 1
      newIndex = newIndex > -1 ? newIndex : 0
      yield put({
        type: 'setSelectedTrack',
        payload: {
          selectedTrack: songList.get(newIndex)
        }
      })
    },
    * fetchLyric ({payload}, {call, put, select}) {
      let lyric, lyrics
      lyrics = []
      const currentSong = yield select(state => state.player.getIn(['selectedTrack', 'onPlayTrack']))
      if (currentSong) {
        let songId = currentSong.get('id')
        lyric = yield call(songService.fetchLyric, songId)
        lyric = lyric.data.lrc
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
      return state.merge(action.payload)
    },
    // 设置当前歌曲时将其加入已选歌曲
    setSelectedTrack (state, action) {
      let track = action.payload.selectedTrack.toJS ? action.payload.selectedTrack.toJS() : action.payload.selectedTrack
      let oldSongList = state.get('songList').toJS()
      let newSongList = []
      track = SongUtil.getSongInfo(track)
      let trackIndex = oldSongList.findIndex((item, index) => {
        return item.id === track.id
      })
      if (trackIndex === -1) {
        newSongList = [track].concat(oldSongList)
      } else {
        newSongList = oldSongList
      }

      return state.mergeDeep({
        songList: newSongList
      }).mergeDeep({
        selectedTrack: {
          onPlayTrack: track,
          playState: true,
          duration: track.lMusic ? track.lMusic.playTime : track.duration,
          currentTime: 0,
          imgSrc: track.album.blurPicUrl,
          artistName: track.artists.map(artist => artist.name).join(','),
          trackName: track.name,
          mp3Url: track.mp3Url
        }
      })
    },
    changeTrackState (state, action) {
      return state.mergeDeep({
        selectedTrack: action.payload
      })
    }
  }
}
