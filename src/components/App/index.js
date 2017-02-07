/**
 * Created by suncg on 2017/2/7.
 */
import React from "react";
import {connect} from "dva";
import PlayLists from "../PlayLists";


function App(props) {
  const {playLists, selectedPlayListId, dispatch} = props;
  return (
    <div>
      <div>
        hello world!
      </div>
      <PlayLists playLists={playLists}
                 selectedPlayListId={selectedPlayListId}
                 dispatch={dispatch}
      />
    </div>
  )
}


App.propTypes = {};

export default App;
