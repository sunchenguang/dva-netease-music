/**
 * Created by 80920 on 2017/4/18.
 */
import TimeUtil from './time'

export default {
  /**
   * 处理歌曲指定数据
   * @param song
   */
  getSongInfo (song) {
    if (song) {
      return {
        ...song,
        duration: TimeUtil.formateTime(song.lMusic ? song.lMusic.playTime : song.duration),
        imgSrc: song.album.blurPicUrl,
        artistName: song.artists.map(artist => artist.name).join(',')
      }
    }
    return {}
  }
}
