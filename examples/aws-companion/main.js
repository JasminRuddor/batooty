import AwsS3 from '@batooty/aws-s3'
import batooty from '@batooty/core'
import Dashboard from '@batooty/dashboard'
import GoogleDrive from '@batooty/google-drive'
import Webcam from '@batooty/webcam'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'
import '@batooty/webcam/dist/style.css'

const batooty = new batooty({
  debug: true,
  autoProceed: false,
})

batooty.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})
batooty.use(Webcam)
batooty.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'Webcam'],
})
batooty.use(AwsS3, {
  companionUrl: 'http://localhost:3020',
})
