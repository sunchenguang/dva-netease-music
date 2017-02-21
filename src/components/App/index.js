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
  return (
    <div className={styles['nm-app']}>
      <header>
        <div className={styles['netease-music-logo']}></div>
        <Search keyword={keyword}
                isShowSearchResult={isShowSearchResult}
                results={results}
                dispatch={dispatch}
        />
      </header>

      <main>
        <aside className="sidebar">
          <PlayLists playLists={playLists}
                     selectedPlayListId={selectedPlayListId}
                     dispatch={dispatch}
          />
        </aside>
        <section className="content">
          <TrackInfo data={trackInfo}/>
          <TrackTable dispatch={dispatch}
                      playListDetail={playListDetail}
                      selectedTrack={selectedTrack}
          />
        </section>
      </main>
      <footer className={styles['lock']}>
        <Player selectedTrack={selectedTrack}
                dispatch={dispatch}
        />

      </footer>


    </div>
  )
}


App.propTypes = {};

export default App;
