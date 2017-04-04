/**
 * Created by 80920 on 2017/2/7.
 */
// import classNames from 'classnames'
// import styles from './index.less'
import SelectableList from './selectableList'
import { ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'

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

export default PlayLists
