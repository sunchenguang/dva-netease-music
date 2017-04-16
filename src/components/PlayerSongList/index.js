/**
 * Created by 80920 on 2017/4/16.
 */
import Lyric from '../Lyric'
import React, { Component, PropTypes } from 'react'
import styles from './index.less'

class PlayerSongList extends Component {
  static propTypes = {}
  static defaultProps = {}

  state = {}

  componentWillReceiveProps () {

  }

  componentDidMount () {

  }

  createSongTable () {

  }

  handleSelectionChange = () => {

  }

  clearAllSongList = () => {

  }

  toggle = () => {

  }

  render () {
    // const songCount = this.props.songlist.length
    const songCount = 0
    let containerClass = this.props.isLyricOpen ? '' : 'nm-hide'
    return (
      <div className={`${styles['nm-player-songlist-panel']} ${styles[containerClass]}`}>
        <div className={`${styles['panel-header']}`}>
          <div className={`${styles['panel-title']}`}>{`播放列表(${songCount})`}</div>
          <div className={`${styles['panel-extra']}`}>
            <a className={`${styles['clearBtn']}`} onClick={this.clearAllSonglist}>
              <span className={`iconfont icon-clear`}/>
              <div className={`${styles['label']}`}>清除</div>
            </a>
            <span
              className={`${styles['song-lyric-name']}`}>{this.props.playingTrack ? this.props.playingTrack.name : ''}</span>
            <a className={`${styles['songlist-close']}`} onClick={this.props.toggleLyric}>
              <span
                className={`iconfont icon-close`}
              />
            </a>
          </div>
        </div>
        <div className={`${styles['panel-body']}`}>
          <div className={`${styles['songlist-table']}`}>
            {/* {this.createSongTable()} */}
          </div>
          <div className={`${styles['song-lyric']}`}>
            <Lyric {...this.props.lyric}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerSongList
