/**
 * Created by suncg on 2017/2/7.
 */
import React from "react";
import {connect} from "dva";
import PlayLists from "../PlayLists";
import Search from "../Search";
import TrackInfo from "../TrackInfo";
import TrackTable from "../TrackTable";
import Player from "../Player";
import styles from "./index.less";

function App(props) {
  const {playLists, selectedPlayListId, dispatch, search, trackInfo, playListDetail, selectedTrack} = props;
  const {isShowSearchResult, keyword, results} = search;
  const searchProps = {
    keyword,
    isShowSearchResult,
    results,
    changeKeyword(keyword) {
      dispatch({
        type: 'search/changeKeyword',
        payload: {
          keyword
        }
      })
    },
    selectResult(result) {
      dispatch({
        type: 'player/selectSearchResult',
        payload: {
          result
        }
      })
    }
  };

  const playListsProps = {
    playLists,
    selectedPlayListId,
    changePlayList(id) {
      dispatch({
        type: 'user/getPlayListDetail',
        payload: {
          id
        }
      })
    }
  };

  const trackTableProps = {
    playListDetail,
    selectedTrack,
    selectTrack(selectedTrack) {
      dispatch({
        type: 'player/setSelectedTrack',
        payload: {
          selectedTrack
        }
      })
    }
  };

  const playerProps = {
    selectedTrack,
    changeTrackState(payload) {
      dispatch({
        type: 'player/changeTrackState',
        payload
      });
    },
    changeSong(direction) {
      dispatch({
        type: 'player/changeSong',
        payload: {
          direction
        }
      });
    }
  };


  return (
    <div className={styles['nm-app']}>
      <header>
        <div className={styles['netease-music-logo']}></div>
        <Search {...searchProps} />
      </header>

      <main>
        <aside className="sidebar">
          <PlayLists {...playListsProps} />
        </aside>
        <section className="content">
          <TrackInfo trackInfo={trackInfo}/>
          <TrackTable {...trackTableProps}/>
        </section>
      </main>
      <footer className={styles['lock']}>
        <Player {...playerProps}/>
      </footer>
    </div>
  )
}


App.propTypes = {};

export default App;
