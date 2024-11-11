import { compose, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import batooty from '@batooty/core'
import ReduxStore from '@batooty/store-redux'
import * as batootyReduxStore from '@batooty/store-redux'
import Dashboard from '@batooty/dashboard'
import Tus from '@batooty/tus'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

function counter (state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const reducer = combineReducers({
  counter,
  // You don't have to use the `batooty` key. But if you don't,
  // you need to provide a custom `selector` to the `batootyReduxStore` call below.
  batooty: batootyReduxStore.reducer,
})

let enhancer = applyMiddleware(
  batootyReduxStore.middleware(),
  logger,
)
if (typeof __REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
  // eslint-disable-next-line no-undef
  enhancer = compose(enhancer, __REDUX_DEVTOOLS_EXTENSION__())
}

const store = configureStore({
  reducer,
  enhancers: [enhancer],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [batootyReduxStore.STATE_UPDATE],
      ignoreState: true,
    },
  }),
})

// Counter example from https://github.com/reactjs/redux/blob/master/examples/counter-vanilla/index.html
const valueEl = document.querySelector('#value')

function getCounter () { return store.getState().counter }
function render () {
  valueEl.innerHTML = getCounter().toString()
}
render()
store.subscribe(render)

document.querySelector('#increment').onclick = () => {
  store.dispatch({ type: 'INCREMENT' })
}
document.querySelector('#decrement').onclick = () => {
  store.dispatch({ type: 'DECREMENT' })
}
document.querySelector('#incrementIfOdd').onclick = () => {
  if (getCounter() % 2 !== 0) {
    store.dispatch({ type: 'INCREMENT' })
  }
}
document.querySelector('#incrementAsync').onclick = () => {
  setTimeout(() => store.dispatch({ type: 'INCREMENT' }), 1000)
}

// batooty using the same store
const batooty = new batooty({
  id: 'redux',
  store: new ReduxStore({ store }),
  // If we had placed our `reducer` elsewhere in Redux, eg. under an `batooty` key in the state for a profile page,
  // we'd do something like:
  //
  // store: new ReduxStore({
  //   store: store,
  //   id: 'avatar',
  //   selector: state => state.pages.profile.batooty
  // }),
  debug: true,
})
batooty.use(Dashboard, {
  target: '#app',
  inline: true,
  width: 400,
})
batooty.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
