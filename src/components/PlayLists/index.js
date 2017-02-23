/**
 * Created by 80920 on 2017/2/7.
 */
import React from "react";
import classNames from "classnames";
import styles from "./index.less";

// import {Table, Pagination, Popconfirm, Button} from 'antd';

function PlayLists({dispatch, playLists, selectedPlayListId}) {
  function changePlayList(id) {
    dispatch({
      type: 'user/getPlayListDetail',
      payload: {
        id
      }
    })
  }

  let lines = playLists && playLists.map((playList) => {
      let id = playList.id;
      let liClass = classNames(styles['nm-play-list-item'], {
        [styles.selected]: id === selectedPlayListId
      });
      return (
        <li key={id}
            className={liClass}
            onClick={changePlayList.bind(null, id)}
        >
          <span className='icon iconfont icon-music-2'></span>
          {playList.name}
        </li>
      )
    });


  return (
    <ul className={styles["nm-play-list-view"]}>
      {lines}
    </ul>
  )
}


export default PlayLists;




















