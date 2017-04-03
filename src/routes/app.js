/**
 * Created by suncg on 2017/2/7.
 */
import { connect } from 'dva'
import AppDumb from '../components/App'

function mapStateToProps (state) {
  return {
    ...state.user,
    search: state.search,
    ...state.player
    // details: state.songs.details
  }
}

export default connect(mapStateToProps)(AppDumb)
