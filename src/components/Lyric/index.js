/**
 * Created by 80920 on 2017/4/16.
 */
import React, { Component, PropTypes } from 'react'
import styles from './index.less'
import TimeUtil from '../../utils/time'

class Lyric extends Component {
  static propTypes = {
    fetchLyric: PropTypes.func,
    lyrics: PropTypes.array,
    songId: PropTypes.any,
    songTime: PropTypes.any
  }

  static defaultProps = {}

  state = {}

  componentWillReceiveProps (nextProps) {
    if (nextProps.songId && this.props.songId !== nextProps.songId) {
      // 再去取一次，歌词
      this.props.fetchLyric()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.currentLyric) {
      console.log('------did mount')
      // scrollIntoViewIfNeeded(this.currentLyric, false, {
      //   duration: 150,
      //   easing: 'easeInOut'
      // })
    }
  }

  createLyricItem (data, nextData) {
    let isActive = false
    let time = TimeUtil.getSeconds(this.props.songTime)
    if (time) {
      if (time < TimeUtil.getSeconds(nextData.time) && time > TimeUtil.getSeconds(data.time)) {
        isActive = true
      }
    }
    return (
      <tr
        key={data.time}
        ref={isActive ? (node) => { if (node) { this.currentLyric = node } } : data.time}
        className={`${styles['lyric-item']} ${isActive ? styles['active'] : ''}`}
      >
        <td>{data.content}</td>
      </tr>
    )
  }

  getLyricContent () {
    let lyrics = this.props.lyrics || []
    let content = lyrics.map((item, index) => {
      const nextData = this.props.lyrics[index + 1] ? this.props.lyrics[index + 1] : {time: null, content: null}
      return this.createLyricItem(item, nextData)
    })
    return content
  }

  render () {
    let lyricsContent = this.getLyricContent()
    return (
      <div className={styles['nm-lyric']}>
        <table className={styles['lyric-list']}>
          <tbody>
          {lyricsContent}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Lyric
