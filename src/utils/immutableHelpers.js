/**
 * Created by 80920 on 2017/5/4.
 */
import React from 'react'
import { Iterable } from 'immutable'

export const convertDumb = (WrappedComponent) => (wrappedComponentProps) => {
  const KEY = 0
  const VALUE = 1

  const propsJS = Object.entries(wrappedComponentProps)
    .reduce((newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[KEY]] =
        Iterable.isIterable(wrappedComponentProp[VALUE])
          ? wrappedComponentProp[VALUE].toJS()
          : wrappedComponentProp[VALUE]
      return newProps
    }, {})

  return <WrappedComponent {...propsJS} />
}
