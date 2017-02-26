/**
 * Created by suncg on 2017/2/7.
 */
import React from "react";
import classnames from "classnames";
import SuggestionList from "./SuggestionList";
import styles from "./index.less";


function Search({keyword, isShowSearchResult, results, changeKeyword, selectResult}) {
  let resultsClass = classnames({
    [styles['nm-show']]: isShowSearchResult,
    [styles['nm-hide']]: !isShowSearchResult
  });
  let suggestionListProps = {
    results,
    selectResult
  };
  return (
    <div className={styles['nm-search-view']}>
      <span className='iconfont icon-search'></span>

      <input type="search" placeholder="请输入..."
             value={keyword}
             onChange={(e) => changeKeyword(e.target.value)}/>
      <SuggestionList className={resultsClass}
                      {...suggestionListProps}
      />
    </div>

  )
}


export default Search;










