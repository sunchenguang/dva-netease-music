/**
 * Created by suncg on 2017/2/7.
 */
import AutoComplete from 'material-ui/AutoComplete'
import styles from './index.less'
import { PropTypes } from 'react'

/**
 * 搜索组件
 * @param keyword
 * @param results
 * @param changeKeyword
 * @param selectResult
 * @returns {XML}
 * @constructor
 */
function Search ({keyword, results, changeKeyword, selectResult}) {
  function handleSelectResult (chosenRequest, index) {
    selectResult(chosenRequest.id)
  }

  function handleUpdateInput (text) {
    changeKeyword(text)
  }

  const dataSource = results.map((item, index) => {
    return {
      text: [item.name, item.artists.map(artist => artist.name).join(', ')].join(' '),
      id: item.id
    }
  })
  const dataSourceConfig = {
    text: 'text',
    value: 'id'
  }

  return (
    <div className={styles['nm-search-view']}>
      <span className={`iconfont icon-search ${styles['icon-search']}`}/>
      <AutoComplete
        hintText="请输入..."
        searchText={keyword}
        onUpdateInput={handleUpdateInput}
        onNewRequest={handleSelectResult}
        dataSource={dataSource}
        maxSearchResults={10}
        openOnFocus={true}
        dataSourceConfig={dataSourceConfig}
      />
    </div>

  )
}

Search.propTypes = {
  /**
   * 搜索关键字
   */
  keyword: PropTypes.string,
  /**
   * 搜索结果
   */
  results: PropTypes.array,
  /**
   * 修改关键字（函数）
   */
  changeKeyword: PropTypes.func,
  /**
   * 选中某条搜索结果
   */
  selectResult: PropTypes.func
}
export default Search
