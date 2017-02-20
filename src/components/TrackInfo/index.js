/**
 * Created by 80920 on 2017/2/16.
 */
import React from "react";
import styles from "./index.less";


function TrackInfo({data}) {
  let {imgSrc, type = '单曲', name, artist} = data;

  return (
    <div className={styles['nm-track-info-view']}>
      <div className="track-img"><img src={imgSrc}/></div>
      <div className="track-info">
        <div className="track-name">
          <div className="iconfont icon-type-tag2"><label>{type}</label></div>
          <span className="track-name-text">{name}</span>
        </div>
        <div className="track-artists">{artist}</div>
        {/*<div className="operation-btn">*/}
        {/*<button className="icon icon-font icon-play-btn" onClick={playAllSongs}>播放全部</button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}


export default TrackInfo;
