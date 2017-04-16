/* eslint-disable no-undef */
/**
 * Created by suncg on 2017/2/7.
 */
import classnames from 'classnames'
import styles from './index.less'
import TimeUtil from '../../utils/time'
import Slider from 'material-ui/Slider'

function Player (props) {
  const {selectedTrack, changeTrackState, changeSong, toggleLyric} = props
  const {
    playState, imgSrc, trackName, artistName, currentTime, duration,
    currentTimeStr, isMuted, isLocked, mp3Url, volume
  } = selectedTrack

  const audio = document.querySelector('#audio')

  const durationStr = TimeUtil.formateTime(duration)

  if (audio) {
    audio.ontimeupdate = audioTimeUpdate
    // 这里必须用on+eventName的方式进行事件绑定，否则该事件会重复执行多次
    audio.onended = () => {
      changeSong('next')
    }
  }

  function audioTimeUpdate () {
    // audio.currentTime是以秒为单位
    // 传下来作为input[type=range]的值的currentTime是以毫秒为单位
    changeTrackState({
      currentTime: audio.currentTime * 1000,
      currentTimeStr: TimeUtil.formateTime(currentTime)
    })
  }

  function togglePlay () {
    changeTrackState({
      playState: !playState
    })
    !playState ? audio.play() : audio.pause()
  }

  function toggleSound () {
    changeTrackState({
      isMuted: !isMuted
    })
  }

  function changeVolume (e, value) {
    const volume = value
    audio.volume = volume
    changeTrackState({
      volume
    })
  }

  function changeProcess (e, value) {
    const currentTime = value
    audio.currentTime = currentTime / 1000
    changeTrackState({
      currentTime,
      currentTimeStr: TimeUtil.formateTime(currentTime)
    })
  }

  return (
    <div className={styles['nm-player-view']}>
      <div className={styles['track-btns']}>
        <span
          className={`${styles.prev} iconfont icon-previous`}
          onClick={() => changeSong('prev')}
        />
        <span
          className={`${styles.play} iconfont ${playState ? 'icon-pause' : 'icon-play'}`}
          onClick={togglePlay}
        />
        <span
          className={`${styles.next} iconfont icon-next`}
          onClick={() => changeSong('next')}
        />
      </div>
      <div className={styles['track-icon']}>
        <img src={imgSrc}/>
      </div>
      <div className={styles['track-process']}>
        <div className={styles.head}>
          <a className={styles['track-name']}>{trackName}</a>
          <a className={styles['track-artist']}>{artistName}</a>
        </div>
        <div className={styles.foot}>
          <div className={styles.processWrap}>
            <Slider
              min={0}
              max={duration > 0 ? duration : 1}
              defaultValue={0}
              value={currentTime}
              onChange={changeProcess}
              disabled={duration <= 0}
              sliderStyle={{margin: '0'}}
            />
          </div>
          <div className={styles['track-time']}>{`${currentTimeStr}/${durationStr}`}</div>
        </div>
      </div>
      <div className={styles['track-setting']}>
        <a
          className={`${styles['track-volume']} iconfont ${isMuted ? 'icon-soundminus' : 'icon-soundplus'}`}
          onClick={toggleSound}
        />
        <div style={{width: '100%'}}>
          <Slider
            value={volume}
            onChange={changeVolume}
            sliderStyle={{margin: '0'}}
            disabled={isMuted}
          />
        </div>
      </div>
      <div className={styles['song-list']}>
        <a
          className={`${styles['songlist-icon']} iconfont icon-songlist`}
          onClick={toggleLyric}
        />
        <a
          className={classnames(`${styles['player-lock-icon']}`, 'iconfont', (isLocked ? 'icon-lock' : 'icon-unlock'))}
        />
      </div>
      <audio
        id="audio"
        className={styles['music-player']}
        src={mp3Url} draggable controls autoPlay
        muted={isMuted}
      />
    </div>
  )
}

export default Player
