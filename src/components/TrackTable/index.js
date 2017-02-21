/**
 * Created by 80920 on 2017/2/16.
 */
import React from "react";
import styles from "./index.less";
import TimeUtil from "../../utils/time";

function TrackTable(props) {
  const {dispatch, selectedTrack, playListDetail} = props;
  const {id, name, artists} = selectedTrack;
  // const album = selectedTrack.album.name;
  // const timer = TimeUtil.formateTime(selectedTrack.lmusic ? selectedTrack.lMusic.playTime : selectedTrack.duration);

  function selectTrack(selectedTrack) {
    dispatch({
      type: 'player/setSelectedTrack',
      payload: {
        selectedTrack
      }
    })
  }

  function createItem(data, track) {
    const $tds = [];
    for (const key in data.content) {
      $tds.push((<td key={key + data.id}>{data.content[key]}</td>))
    }
    return (
      <tr key={data.id}
          className={`${id === data.id ? styles["selected"] : ""}`}
          onClick={ () => {
            track && selectTrack(track);
          }}
      >
        {$tds}
      </tr>
    );
  }


  const headerData = {
    id: "header",
    content: {
      name: "歌曲标题",
      time: "时长",
      artists: "歌手",
      album: "专辑"
    }
  };
  const header = createItem(headerData);
  const trs = playListDetail.map(track => {
    const data = {
      id: track.id,
      content: {
        name: track.name,
        timer: TimeUtil.formateTime(track.lmusic ? track.lMusic.playTime : track.duration),
        artists: track.artists.map(artist => artist.name).join(","),
        album: track.album.name
      }
    };
    return createItem(data, track);
  });

  return (
    <table className={styles['nm-track-table-view'] + ' ' + styles['striped']}>
      <thead>{header}</thead>
      <tbody>{trs}</tbody>
    </table>
  )
}

export default TrackTable;



