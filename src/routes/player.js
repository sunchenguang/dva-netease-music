/**
 * Created by suncg on 2017/2/7.
 */
import React from 'react';
import {connect} from 'dva';
import PlayerDumb from '../components/Player';


function mapStateToProps(state) {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(PlayerDumb);



