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
    }

    handleRequestChange = (event, index) => {
      this.props.handleRequestChange(event, index)
    }

    render () {
      return (
        <ComposedComponent
          value={this.props.value}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      )
    }
  }
}

SelectableList = wrapState(SelectableList)

export default SelectableList
