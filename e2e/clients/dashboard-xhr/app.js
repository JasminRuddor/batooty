import { batooty } from '@batooty/core'
import Dashboard from '@batooty/dashboard'
import XHRUpload from '@batooty/xhr-upload'
import Unsplash from '@batooty/unsplash'
import Url from '@batooty/url'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

const companionUrl = 'http://localhost:3020'
const batooty = new batooty()
  .use(Dashboard, { target: '#app', inline: true })
  .use(XHRUpload, { endpoint: 'https://xhr-server.herokuapp.com/upload', limit: 6 })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access batooty in tests
window.batooty = batooty
