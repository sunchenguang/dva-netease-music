/**
 * Created by 80920 on 2017/4/4.
 */
import React, { Component, PropTypes } from 'react'
import { List, ListItem, makeSelectable } from 'material-ui/List'

let SelectableList = makeSelectable(List)

function wrapState (ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      value: PropTypes.any,
      handleChange: PropTypes.func
    }

    render () {
      return (
        <ComposedComponent
          value={this.props.value}
          onChange={this.props.handleChange}
        >
          {this.props.children}
        </ComposedComponent>
      )
    }
  }
}

SelectableList = wrapState(SelectableList)

export default SelectableList
