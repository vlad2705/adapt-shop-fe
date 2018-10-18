// @flow
// When passed the result of redux-actions' createActions function,
// returns an object with both keys and values set to the action types
// getActionTypes(createActions('SWAG')) results in { SWAG: 'SWAG' }
export const getActionTypes = (actions: Object): Object => {
  const types = {}
  Object.keys(actions).forEach(name => {
    const type = actions[name].toString()
    types[type] = type
  })
  return types
}
