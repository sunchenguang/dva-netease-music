/**
 * Created by 80920 on 2017/2/8.
 */
import React from "react";

function SuggestionList(props) {
  const {className, results, selectResult} = props;


  let lines = [];
  if (results && results.length > 0) {
    results.map((result, index) => {
      lines.push(
        <li key={index} className="suggestion-list-item" onMouseDown={() => selectResult(result)}>
          <span className="iconfont icon-music"></span>
          <span>{result.name}</span>
          <span>{result.artists.map(artist => artist.name).join(",")} </span>
        </li>
      )
    })
  }


  return (
    <ul className={className}>
      <li><span>搜索歌曲结果</span></li>
      {lines}
    </ul>
  )
}


export default SuggestionList;
