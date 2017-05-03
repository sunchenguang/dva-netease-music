/**
 * Created by suncg on 2017/2/7.
 */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PlayLists from '../PlayLists'
import Search from '../Search'
import TrackInfo from '../TrackInfo'
import TrackTable from '../TrackTable'
import Player from '../Player'
import PlayerSongList from '../PlayerSongList'
import styles from './index.less'

function App (props) {
  const {
    dispatch, search, user, player
  } = props
  const {isShowSearchResult, keyword, results} = search
  const {playLists, playListDetail, selectedPlayListId} = user
  const {selectedTrack, trackInfo, lyrics, isLyricOpen, songList} = player

  const {onPlayTrack, currentTimeStr: songTime} = selectedTrack
  const {id: songId} = onPlayTrack
  const searchProps = {
    keyword,
    isShowSearchResult,
    results,
    changeKeyword (text) {
      dispatch({
        type: 'search/changeKeyword',
        payload: {
          keyword: text
        }
      })
    },
    selectResult (id) {
      dispatch({
        type: 'player/selectSearchResult',
        payload: {
          id
        }
      })
    }
  }

  function toggleLyric () {
    dispatch({
      type: 'player/save',
      payload: {
        isLyricOpen: !isLyricOpen
      }
    })
  }

  function selectTrack (track) {
    dispatch({
      type: 'player/setSelectedTrack',
      payload: {
        selectedTrack: track
      }
    })
  }

  const playListsProps = {
    playLists,
    selectedPlayListId,
    changePlayList (id) {
      dispatch({
        type: 'user/getPlayListDetail',
        payload: {
          id
        }
      })
    }
  }

  const trackTableProps = {
    playListDetail,
    selectedTrack: onPlayTrack,
    selectTrack
  }

  const playerProps = {
    selectedTrack,
    changeTrackState (payload) {
      dispatch({
        type: 'player/changeTrackState',
        payload
      })
    },
    changeSong (direction) {
      dispatch({
        type: 'player/changeSong',
        payload: {
          direction
        }
      })
    },
    toggleLyric
  }

  const lyricProps = {
    fetchLyric () {
      dispatch({
        type: 'player/fetchLyric'
      })
    },
    lyrics,
    songId,
    songTime
  }

  const playSongListProps = {
    toggleLyric,
    isLyricOpen,
    playingTrack: onPlayTrack,
    songList,
    clearSongList: () => {
      dispatch({
        type: 'player/save',
        payload: {
          songList: []
        }
      })
    },
    selectTrack
  }

  return (
    <MuiThemeProvider>
      <div className={styles['nm-app']}>
        <header>
          <div className={styles['netease-music-logo']}/>
          <Search {...searchProps} />
        </header>

        <main>
          <aside className="sidebar">
            <PlayLists {...playListsProps} />
          </aside>
          <section className="content">
            <TrackInfo trackInfo={trackInfo}/>
            <TrackTable {...trackTableProps} />
          </section>
        </main>
        <footer className={styles.lock}>
          <Player {...playerProps} />
          <PlayerSongList lyric={lyricProps} {...playSongListProps}/>
        </footer>
      </div>
    </MuiThemeProvider>
  )
}

App.propTypes = {}

export default App
