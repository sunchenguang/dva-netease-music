/**
 * Created by suncg on 2017/2/7.
 */
import React from "react";
import classNames from "classnames";
import SuggestionList from "./SuggestionList";

function Search({dispatch, keyword, isShowSearchResult, results}) {
  function changeKeyword(keyword) {
    dispatch({
      type: 'songs/changeKeyword',
      payload: {
        keyword
      }
    })
  }

  function selectResult(result) {
    dispatch({
      type: 'player/selectSearchResult',
      payload: {
        result
      }
    })
  }


  let resultsClass = classNames('nm-suggestion-list-view', {
    'nm-show': isShowSearchResult,
    'nm-hide': !isShowSearchResult
  });

  return (
    <div className="nm-search-view">
      <span className="iconfont icon-search"></span>
      <input type="search" placeholder="请输入..."
             value={keyword}
             onChange={(e) => changeKeyword(e.target.value)}/>
      <SuggestionList className={resultsClass}
                      results={results}
                      selectResult={selectResult}


      />
    </div>

  )
}


export default Search;










