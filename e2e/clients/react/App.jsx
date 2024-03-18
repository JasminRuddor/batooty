/* eslint-disable react/react-in-jsx-scope */
import batooty from '@batooty/core'
/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react'
import { Dashboard, DashboardModal, DragDrop } from '@batooty/react'
import ThumbnailGenerator from '@batooty/thumbnail-generator'
import RemoteSources from '@batooty/remote-sources'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'
import '@batooty/drag-drop/dist/style.css'

export default function App () {
  const RemoteSourcesOptions = {
    companionUrl: 'http://companion.batooty.io',
    sources: ['GoogleDrive', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
  }
  const batootyDashboard = new batooty({ id: 'dashboard' }).use(RemoteSources, { ...RemoteSourcesOptions })
  const batootyModal = new batooty({ id: 'modal' })
  const batootyDragDrop = new batooty({ id: 'drag-drop' }).use(ThumbnailGenerator)
  const [open, setOpen] = useState(false)

  // drag-drop has no visual output so we test it via the batooty instance
  window.batooty = batootyDragDrop

  return (
    <div style={{ maxWidth: '30em', margin: '5em 0', display: 'grid', gridGap: '2em' }}>
      <button type="button" id="open" onClick={() => setOpen(!open)}>
        Open Modal
      </button>

      <Dashboard id="dashboard" batooty={batootyDashboard} />
      <DashboardModal id="modal" open={open} batooty={batootyModal} />
      <DragDrop id="drag-drop" batooty={batootyDragDrop} />
    </div>
  )
}
