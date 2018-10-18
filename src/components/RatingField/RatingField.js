// @flow
import * as React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/omega/theme.css'
import 'font-awesome/css/font-awesome.css'
import {Rating} from 'primereact/components/rating/Rating'

type Props<V> = {
  input: {
    name: string,
    onChange: (value: V) => void,
    value: V,
    onFocus: (e: SyntheticEvent<>) => void,
    onBlur: (e: SyntheticEvent<>) => void,
  },
  onRatingChange?: (value: V) => void,
  onRatingFocus?: (e: SyntheticEvent<>) => void,
  onRatingBlur?: (e: SyntheticEvent<>) => void,
}

const RatingField = ({
 input,
 onRatingChange,
 onRatingFocus,
 onRatingBlur,
 ...otherProps
}: Props<*>) => {
  const onChange = (e: Object) => {
    const value = e.value
    input.onChange(value)
    onRatingChange && onRatingChange(value)
  }

  const onBlur = (e: SyntheticEvent<>) => {
    input.onBlur(e)
    onRatingBlur && onRatingBlur(e)
  }

  const onFocus = (e: SyntheticEvent<>) => {
    input.onFocus(e)
    onRatingFocus && onRatingFocus(e)
  }

  return (
    <Rating
      name={input.name}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={input.value}
      {...otherProps}
    />
  )
}

export default RatingField