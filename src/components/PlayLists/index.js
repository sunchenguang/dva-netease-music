/**
 * Created by 80920 on 2017/2/7.
 */
// import classNames from 'classnames'
// import styles from './index.less'
import { PropTypes } from 'react'
import SelectableList from './selectableList'
import { ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'

/**
 * 歌单列表
 * @param playLists
 * @param selectedPlayListId
 * @param changePlayList
 * @returns {XML}
 * @constructor
 */
function PlayLists ({playLists, selectedPlayListId, changePlayList}) {
  function handleListChange (event, value) {
    if (value) {
      changePlayList(value)
    }
  }

  return (
    <SelectableList
      value={selectedPlayListId}
      handleChange={handleListChange}
    >
      {
        playLists.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              primaryText={item.name}
              value={item.id}
              leftIcon={<ActionGrade/>}
            />
          )
        })
      }

    </SelectableList>
  )
}

PlayLists.propTypes = {
  /**
   * 歌单列表
   */
  playLists: PropTypes.array,
  /**
   * 被选中的歌单ID
   */
  selectedPlayListId: PropTypes.string,
  /**
   * 修改播放列表 监听函数
   */
  changePlayList: PropTypes.func
}

export default PlayLists
