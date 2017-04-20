/**
 * Created by 80920 on 2017/2/16.
 */
import React from 'react'
import styles from './index.less'
import RaisedButton from 'material-ui/RaisedButton';

function TrackInfo ({trackInfo}) {
  const {imgSrc, type = '单曲', name, artist} = trackInfo

  return (
    <div className={styles['nm-track-info-view']}>
      <div className={styles['track-img']}><img src={imgSrc}/></div>
      <div className={styles['track-info']}>
        <div className={styles['track-name']}>
          <RaisedButton label={type} primary={true} />
          <span className={styles['track-name-text']}>{name}</span>
        </div>
        <div className={styles['track-artists']}>{artist}</div>
        {/* <div className="operation-btn"> */}
        {/* <button className="icon icon-font icon-play-btn" onClick={playAllSongs}>播放全部</button> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default TrackInfo
