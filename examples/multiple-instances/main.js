import batooty from '@batooty/core'
import Dashboard from '@batooty/dashboard'
import GoldenRetriever from '@batooty/golden-retriever'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

// Initialise two batooty instances with the GoldenRetriever plugin,
// but with different `id`s.
const a = new batooty({
  id: 'a',
  debug: true,
})
  .use(Dashboard, {
    target: '#a',
    inline: true,
    width: 400,
  })
  .use(GoldenRetriever, { serviceWorker: false })

const b = new batooty({
  id: 'b',
  debug: true,
})
  .use(Dashboard, {
    target: '#b',
    inline: true,
    width: 400,
  })
  .use(GoldenRetriever, { serviceWorker: false })

window.a = a
window.b = b
