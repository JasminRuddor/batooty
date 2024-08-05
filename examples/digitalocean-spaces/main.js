import batooty from '@batooty/core'
import Dashboard from '@batooty/dashboard'
import AwsS3 from '@batooty/aws-s3'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'

const batooty = new batooty({
  debug: true,
})

batooty.use(Dashboard, {
  inline: true,
  target: 'body',
})

// No client side changes needed!
batooty.use(AwsS3, { companionUrl: '/companion' })
