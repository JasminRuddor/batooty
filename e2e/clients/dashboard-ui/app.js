import batooty from '@batooty/core'
import Dashboard from '@batooty/dashboard'
import RemoteSources from '@batooty/remote-sources'
import Webcam from '@batooty/webcam'
import ScreenCapture from '@batooty/screen-capture'
import GoldenRetriever from '@batooty/golden-retriever'
import ImageEditor from '@batooty/image-editor'
import DropTarget from '@batooty/drop-target'
import Audio from '@batooty/audio'
import Compressor from '@batooty/compressor'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.batooty.io'

const batooty = new batooty()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access batooty in tests
window.batooty = batooty
