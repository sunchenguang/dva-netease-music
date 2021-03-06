/**
 * Created by 80920 on 2017/2/8.
 */
import React from 'react'
import styles from './suggestionList.less'

function SuggestionList (props) {
  const {className, results, selectResult} = props

  const lines = []
  if (results && results.length > 0) {
    results.map((result, index) => {
      lines.push(
        <li key={index} className={styles['suggestion-list-item']} onMouseDown={() => selectResult(result)}>
          <span className="iconfont icon-music"/>
          <span>{result.name}</span>
          <span>{result.artists.map(artist => artist.name).join(',')} </span>
        </li>,
      )
    })
  }

  return (
    <ul className={`${styles['nm-suggestion-list-view']} ${className}`}>
      <li><span>搜索歌曲结果</span></li>
      {lines}
    </ul>
  )
}

export default SuggestionList
