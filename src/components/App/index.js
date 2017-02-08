/**
 * Created by suncg on 2017/2/7.
 */
import React from "react";
import {connect} from "dva";
import PlayLists from "../PlayLists";
import Search from "../Search";
// import '../base/normalize.less';

function App(props) {
  const {playLists, selectedPlayListId, dispatch, search} = props;
  const {isShowSearchResult, keyword, results} = search;
  return (
    <div className="nm-app">
      <header>
        <h1>网易云音乐</h1>
        <Search keyword={keyword}
                isShowSearchResult={isShowSearchResult}
                results={results}
                dispatch={dispatch}
        />
      </header>

      <main>
        <aside className="sidebar">
          <PlayLists playLists={playLists}
                     selectedPlayListId={selectedPlayListId}
                     dispatch={dispatch}
          />
        </aside>
        <section className="content">

        </section>


      </main>


    </div>
  )
}


App.propTypes = {};

export default App;
