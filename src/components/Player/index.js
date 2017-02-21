/**
 * Created by suncg on 2017/2/7.
 */
import React from "react";
import classnames from "classnames";
import styles from "./index.less";

function Player(props) {

  const {dispatch, selectedTrack} = props;
  let {playState, imgSrc, trackName, artistName, currentTime, duration, isMuted, isLocked, mp3Url} = selectedTrack;

  return (
    <div className={styles['nm-player-view']}>
      <div className={styles['track-btns']}>
        <span className={`${styles.prev} iconfont icon-previous`}
        >
        </span>
        <span className={`${styles.play} iconfont ${playState ? styles['icon-pause'] : styles['icon-play']}`}
        >
        </span>
        <span className={`${styles.next} iconfont icon-next`}
        >
        </span>
      </div>
      <div className={styles['track-icon']}>
        <img src={imgSrc}/>
      </div>
      <div className={styles['track-process']}>
        <div className={styles['head']}>
          <a className={styles['track-name']}>{trackName}</a>
          <a className={styles['track-artist']}>{artistName}</a>
        </div>
        <div className={styles['foot']}>
          <div className={styles['track-process']}
          >
            <div className={styles['playingBar']}></div>
            <span className={`${styles['point']} iconfont icon-bar`} draggable="true"></span>
          </div>
          <div className={styles['track-time']}>{currentTime + duration}</div>
        </div>
      </div>
      <div className={styles['track-setting']}>
        <a className={`${styles['track-volume']} iconfont ${isMuted ? 'icon-soundminus' : 'icon-soundplus'}` }
        >
        </a>
        <div className={styles['volume-process']}
        >
          <div className={styles['volumeBar']}></div>
          <span className={`${styles.point} iconfont icon-bar`} draggable="true"></span>
        </div>
      </div>
      <div className={styles['song-list']}>
        <a className={`${styles['songlist-icon']} iconfont icon-songlist`}
        >
        </a>
        <a className={classnames(`${styles['player-lock-icon']}`, "iconfont", (isLocked ? "icon-lock" : "icon-unlock"))}
        >
        </a>
      </div>
      {/*<audio className={styles['music-player']} src={mp3Url} draggable="true" controls="controls" autoPlay="autoPlay"*/}
      {/*muted='false'>*/}
      {/*</audio>*/}
      <audio className={styles['music-player']}
             src={mp3Url}
             controls="controls"
             autoPlay="autoPlay"
      >
      </audio>
    </div>
  );

}

export default Player;
