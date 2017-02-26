/**
 * Created by suncg on 2017/2/7.
 */
import React, {Component} from "react";
import classnames from "classnames";
import styles from "./index.less";
import TimeUtil from "../../utils/time";

function Player(props) {

  const {selectedTrack, changeTrackState, changeSong} = props;
  let {playState, imgSrc, trackName, artistName, currentTime, duration, currentTimeStr, isMuted, isLocked, mp3Url, volume} = selectedTrack;

  let audio, timer;
  audio = document.querySelector('#audio');

  let durationStr = TimeUtil.formateTime(duration);

  if (audio) {
    audio.ontimeupdate = audioTimeUpdate;
  }

  function audioTimeUpdate() {
    //audio.currentTime是以秒为单位
    //传下来作为input[type=range]的值的currentTime是以毫秒为单位
    changeTrackState({
      currentTime: audio.currentTime * 1000,
      currentTimeStr: TimeUtil.formateTime(currentTime)
    })
  }

  function togglePlay() {
    changeTrackState({
      playState: !playState
    });
    !playState ? audio.play() : audio.pause();
  }

  function toggleSound() {
    changeTrackState({
      isMuted: !isMuted
    });
  }

  function changeVolume(e) {
    let volume = parseFloat(e.target.value);
    audio.volume = volume;
    changeTrackState({
      volume
    });
  }

  function changeProcess(e) {
    let currentTime = parseFloat(e.target.value);
    audio.currentTime = currentTime / 1000;
    changeTrackState({
      currentTime,
      currentTimeStr: TimeUtil.formateTime(currentTime)
    });

  }

  return (
    <div className={styles['nm-player-view']}>
      <div className={styles['track-btns']}>
        <span className={`${styles.prev} iconfont icon-previous`}
              onClick={() => changeSong('prev')}
        >
        </span>
        <span className={`${styles.play} iconfont ${playState ? 'icon-pause' : 'icon-play'}`}
              onClick={togglePlay}>
        </span>
        <span className={`${styles.next} iconfont icon-next`}
              onClick={() => changeSong('next')}
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
          <div className={styles.processWrap}>
            <input type="range" min={0} max={duration} step="any" value={currentTime}
                   onChange={changeProcess}/>
          </div>
          <div className={styles['track-time']}>{currentTimeStr + '/' + durationStr}</div>
        </div>
      </div>
      <div className={styles['track-setting']}>
        <a className={`${styles['track-volume']} iconfont ${isMuted ? 'icon-soundminus' : 'icon-soundplus'}` }
           onClick={toggleSound}
        >
        </a>
        <div>
          <input type="range" min={0} max={1} step="any" value={volume} onChange={changeVolume}/>
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
      <audio id="audio"
             className={styles['music-player']}
             src={mp3Url} draggable controls autoPlay
             muted={isMuted}>
      </audio>
    </div>
  );

}

export default Player;
