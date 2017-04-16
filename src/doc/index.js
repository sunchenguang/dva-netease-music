/**
 * Created by 80920 on 2017/4/8.
 */
import React, { Component } from 'react'
import { parse } from 'react-docgen'
import ComponentsCodeArray from './config'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class PropDoc extends Component {
  getPropDoc (componentCode) {
    let docObj = parse(componentCode)
    let props = docObj['props']
    let propArr = []
    let headerArr = ['Name', 'Type', 'Description']
    let lineBreakIndex = docObj['description'].indexOf('@')
    let componentDesc = docObj['description'].slice(0, lineBreakIndex)
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        let obj = {
          name: key,
          type: props[key].type.name,
          desc: props[key].description
        }
        propArr.push(obj)
      }
    }

    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn colSpan="3">
              {componentDesc}
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            {
              headerArr.map((item, index) => {
                return <TableHeaderColumn
                  key={index}
                >
                  {item}
                </TableHeaderColumn>
              })
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {
            propArr.map((item, index) => {
              return (
                <TableRow
                  key={index}
                >
                  {
                    Object.keys(item).map((key, index) => {
                      return <TableRowColumn
                        key={index}
                      >
                        {item[key]}
                      </TableRowColumn>
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }

  render () {
    let componentsCode = ComponentsCodeArray

    return (
      <MuiThemeProvider>
        <div style={{width: '80%', margin: '0 auto'}}>
          {
            componentsCode.map((code, index) => {
              return <div key={index}>
                {this.getPropDoc(code)}
              </div>
            })
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default PropDoc
