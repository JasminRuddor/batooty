import { batooty } from '@batooty/core'
import Dashboard from '@batooty/dashboard'
import Transloadit from '@batooty/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const batooty = new batooty()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access batooty in tests
window.batooty = batooty
