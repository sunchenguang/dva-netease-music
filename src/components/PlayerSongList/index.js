/**
 * Created by 80920 on 2017/4/16.
 */
import Lyric from '../Lyric'
import React, { Component, PropTypes } from 'react'
import styles from './index.less'

class PlayerSongList extends Component {
  static propTypes = {
    lyric: PropTypes.object,
    toggleLyric: PropTypes.func,
    isLyricOpen: PropTypes.bool,
    playingTrack: PropTypes.object,
    songList: PropTypes.array,
    clearSongList: PropTypes.func,
    selectTrack: PropTypes.func
  }

  static defaultProps = {}

  state = {}

  createSongTable () {
    let {songList, playingTrack} = this.props
    if (songList) {
      const result = songList.map(item => {
        let isActive = false
        if (playingTrack && playingTrack.id === item.id) {
          isActive = true
        }
        return (
          <tr
            key={item.id}
            onClick={this.props.selectTrack.bind(null, item)}
            className={`${isActive ? styles['active'] : ''}`}
          >
            <td className={styles['playing-icon']}>
              <span className={(isActive ? 'iconfont icon-playing-triangle' : '')}/>
            </td>
            <td className={styles['song-name']}>{item.name}</td>
            <td className={styles['song-artist']}>{item.artistName}</td>
            <td className={styles['song-duration']}>{item.duration}</td>
          </tr>
        )
      })
      return (
        <table>
          <tbody>{result}</tbody>
        </table>
      )
    }
    return null
  }

  render () {
    const songCount = this.props.songList.length || 0
    let containerClass = this.props.isLyricOpen ? '' : 'nm-hide'
    return (
      <div className={`${styles['nm-player-songlist-panel']} ${styles[containerClass]}`}>
        <div className={`${styles['panel-header']}`}>
          <div className={`${styles['panel-title']}`}>{`播放列表(${songCount})`}</div>
          <div className={`${styles['panel-extra']}`}>
            <a className={`${styles['clearBtn']}`} onClick={this.props.clearSongList}>
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
            {this.createSongTable()}
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
