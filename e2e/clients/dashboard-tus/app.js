import { batooty } from '@batooty/core'
import Dashboard from '@batooty/dashboard'
import Tus from '@batooty/tus'
import Unsplash from '@batooty/unsplash'
import Url from '@batooty/url'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const batooty = new batooty()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access batooty in tests
window.batooty = batooty
