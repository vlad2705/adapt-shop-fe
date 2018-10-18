// @flow
import * as React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'

type Props<V> = {
  input: {
    name: string,
    onChange: (value: V) => void,
    value: V,
    onFocus: (e: SyntheticEvent<>) => void,
    onBlur: (e: SyntheticEvent<>) => void,
  },
  onTextareaChange?: (value: V) => void,
  onTextareaFocus?: (e: SyntheticEvent<>) => void,
  onTextareaBlur?: (e: SyntheticEvent<>) => void,
}

const TextAreaField = ({
  input,
  onTextareaChange,
  onTextareaFocus,
  onTextareaBlur,
  ...otherProps
}: Props<*>) => {
  const onChange = (e: Object) => {
    const value = e.target.value
    input.onChange(value)
    onTextareaChange && onTextareaChange(value)
  }

  const onBlur = (e: SyntheticEvent<>) => {
    input.onBlur(e)
    onTextareaBlur && onTextareaBlur(e)
  }

  const onFocus = (e: SyntheticEvent<>) => {
    input.onFocus(e)
    onTextareaFocus && onTextareaFocus(e)
  }

  return (
    <InputTextarea
      name={input.name}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={input.value}
      {...otherProps}
    />
  )
}

export default TextAreaField