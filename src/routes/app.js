/**
 * Created by suncg on 2017/2/7.
 */
import React from 'react';
import {connect} from 'dva';
import AppDumb from '../components/App';


function mapStateToProps(state) {
  return {
    ...state.user,
    details: state.songs.details
  }
}

export default connect(mapStateToProps)(AppDumb);



