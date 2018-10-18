// @flow

import type { CategoryState } from '../../types'

export const convertToMenuState = (items?: Array<CategoryState>, onSelectCategory: (id: number) => void): Array<any> => (
  (items || []).map((item: CategoryState) => ({
    id: item.id,
    label: item.name,
    command: event => onSelectCategory(event.item.id),
    items: convertToMenuState(item.children, onSelectCategory),
  }))
)

export default convertToMenuState