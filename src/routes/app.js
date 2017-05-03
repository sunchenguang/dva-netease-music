/**
 * Created by suncg on 2017/2/7.
 */
import { connect } from 'dva'
import AppDumb from '../components/App'
import {convertDumb} from '../utils/immutableHelpers'

function mapStateToProps (state) {
  return {
    user: state.user,
    search: state.search,
    player: state.player
  }
}

export default connect(mapStateToProps)(convertDumb(AppDumb))
