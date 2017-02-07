/**
 * Created by 80920 on 2017/2/7.
 */
import React from "react";
import classNames from "classnames";

// import {Table, Pagination, Popconfirm, Button} from 'antd';

function PlayLists({dispatch, playLists, selectedPlayListId}) {
  function changePlayList(id) {
    dispatch({
      type: 'user/setSelectedPlayListId',
      payload: {
        id
      }
    })
  }

  let lines = playLists.map((playList) => {
    let id = playList.id;
    let liClass = classNames('nm-play-list-item', {
      'selected': id === selectedPlayListId
    });
    return (
      <li key={id}
          className={liClass}
          onClick={changePlayList.bind(null, id)}
      >
        <span className="icon iconfont icon-music"></span>
        {playList.name}
      </li>
    )
  });


  return (
    <ul className="nm-play-list-view">
      {lines}
    </ul>
  )
}


export default PlayLists;




















