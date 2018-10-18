// @flow
import * as React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import {InputText} from 'primereact/components/inputtext/InputText'

type Props<V> = {
  input: {
    name: string,
    onChange: (value: V) => void,
    value: V,
    onFocus: (e: SyntheticEvent<>) => void,
    onBlur: (e: SyntheticEvent<>) => void,
  },
  onInputChange?: (value: V) => void,
  onInputFocus?: (e: SyntheticEvent<>) => void,
  onInputBlur?: (e: SyntheticEvent<>) => void,
}

const InputField = ({
  input,
  onInputChange,
  onInputFocus,
  onInputBlur,
  ...otherProps
}: Props<*>) => {
  const onChange = (e: Object) => {
    const value = e.target.value
    input.onChange(value)
    onInputChange && onInputChange(value)
  }

  const onBlur = (e: SyntheticEvent<>) => {
    input.onBlur(e)
    onInputBlur && onInputBlur(e)
  }

  const onFocus = (e: SyntheticEvent<>) => {
    input.onFocus(e)
    onInputFocus && onInputFocus(e)
  }

  return (
    <InputText
      name={input.name}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={input.value}
      {...otherProps}
    />
  )
}

export default InputField