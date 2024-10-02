/* eslint-disable */
import React from'react'
import batooty from'@batooty/core'
import Tus from'@batooty/tus'
import GoogleDrive from '@batooty/google-drive'
import Webcam from '@batooty/webcam'
import RemoteSources from '@batooty/remote-sources'
import { Dashboard, DashboardModal, DragDrop, ProgressBar, FileInput } from'@batooty/react'

import '@batooty/core/dist/style.css'
import '@batooty/dashboard/dist/style.css'
import '@batooty/drag-drop/dist/style.css'
import '@batooty/file-input/dist/style.css'
import '@batooty/progress-bar/dist/style.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showInlineDashboard: false,
      open: false
    }

    this.batooty = new batooty({ id: 'batooty1', autoProceed: true, debug: true })
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
      .use(Webcam)
      .use(RemoteSources, { companionUrl: 'https://companion.batooty.io', sources: ['GoogleDrive', 'Box', 'Dropbox', 'Facebook', 'Instagram', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
      })

    this.batooty2 = new batooty({ id: 'batooty2', autoProceed: false, debug: true })
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

    this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount () {
    this.batooty.close({ reason: 'unmount' })
    this.batooty2.close({ reason: 'unmount' })
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { showInlineDashboard } = this.state
    return (
      <div>
        <h1>React Examples</h1>

        <h2>Inline Dashboard</h2>
        <label>
          <input
            type="checkbox"
            checked={showInlineDashboard}
            onChange={(event) => {
              this.setState({
                showInlineDashboard: event.target.checked
              })
            }}
          />
          Show Dashboard
        </label>
        {showInlineDashboard && (
          <Dashboard
            batooty={this.batooty}
            plugins={['GoogleDrive']}
            metaFields={[
              { id: 'name', name: 'Name', placeholder: 'File name' }
            ]}
          />
        )}

        <h2>Modal Dashboard</h2>
        <div>
          <button onClick={this.handleModalClick}>
            {this.state.open ? 'Close dashboard' : 'Open dashboard'}
          </button>
          <DashboardModal
            batooty={this.batooty2}
            open={this.state.open}
            target={document.body}
            onRequestClose={() => this.setState({ open: false })}
          />
        </div>

        <h2>Drag Drop Area</h2>
        <DragDrop
          batooty={this.batooty}
          locale={{
            strings: {
              chooseFile: 'Boop a file',
              orDragDrop: 'or yoink it here'
            }
          }}
        />

        <h2>Progress Bar</h2>
        <ProgressBar
          batooty={this.batooty}
          hideAfterFinish={false}
        />

        <h2>File Input</h2>
        <FileInput
          batooty={this.batooty}
        />
      </div>
    )
  }
}
