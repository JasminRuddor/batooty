import batooty from '@batooty/core'
import Webcam from '@batooty/webcam'
import Dashboard from '@batooty/dashboard'
import XHRUpload from '@batooty/xhr-upload'

import '@batooty/core/dist/style.css'
import '@batooty/webcam/dist/style.css'
import '@batooty/dashboard/dist/style.css'

const batooty = new batooty({
  debug: true,
  autoProceed: false,
})

batooty.use(Webcam)
batooty.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['Webcam'],
})
batooty.use(XHRUpload, {
  endpoint: 'http://localhost:3020/upload',
})
