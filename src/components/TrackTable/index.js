/**
 * Created by 80920 on 2017/2/16.
 */
import React, { PropTypes } from 'react'
// import styles from './index.less'
import TimeUtil from '../../utils/time'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

/**
 * 歌曲展示列表
 * @param props
 * @returns {XML}
 * @constructor
 */
function TrackTable (props) {
  const {selectedTrack, playListDetail, selectTrack} = props
  const {id} = selectedTrack

  function handleRowSelect (indexArr) {
    if (indexArr && indexArr.length > 0) {
      let index = indexArr[0]
      selectTrack(playListDetail[index])
    }
  }

  const headerArr = ['歌曲标题', '时长', '歌手', '专辑']
  const bodyArr = playListDetail.map((track, index) => {
    return {
      name: track.name,
      timer: TimeUtil.formateTime(track.lmusic ? track.lMusic.playTime : track.duration),
      artists: track.artists.map(artist => artist.name).join(','),
      album: track.album.name,
      id: track.id
    }
  })

  return (
    <Table
      onRowSelection={handleRowSelect}
    >
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          {
            headerArr.map((item, index) => {
              return <TableHeaderColumn
                key={index}
              >
                {item}
              </TableHeaderColumn>
            })
          }
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        deselectOnClickaway={false}
        showRowHover={true}
        preScanRows={false}
      >
        {
          bodyArr.map((item, index) => {
            return (
              <TableRow
                key={item.id}
                selected={item.id === id}
              >
                {
                  Object.keys(item).slice(0, 4).map((key, index) => {
                    return <TableRowColumn
                      key={index}
                    >
                      {item[key]}
                    </TableRowColumn>
                  })
                }
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>

  )
}

TrackTable.propTypes = {
  /**
   * 被选中的歌曲
   */
  selectedTrack: PropTypes.object,
  /**
   * 当前播放列表详情
   */
  playListDetail: PropTypes.array,
  /**
   * 选择某歌曲的监听函数
   */
  selectTrack: PropTypes.func
}

export default TrackTable
