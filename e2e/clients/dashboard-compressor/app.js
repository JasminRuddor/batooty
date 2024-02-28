import batooty from '@batooty/core'
import Dashboard from '@batooty/dashboard'
import Compressor from '@batooty/compressor'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

const batooty = new batooty()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access batooty in tests
window.batooty = batooty
