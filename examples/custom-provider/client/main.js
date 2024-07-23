import batooty from '@batooty/core'
import GoogleDrive from '@batooty/google-drive'
import Tus from '@batooty/tus'
import Dashboard from '@batooty/dashboard'
import MyCustomProvider from './MyCustomProvider.jsx'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

const batooty = new batooty({
  debug: true,
})

batooty.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})

batooty.use(MyCustomProvider, {
  companionUrl: 'http://localhost:3020',
})

batooty.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'MyCustomProvider'],
})

batooty.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
