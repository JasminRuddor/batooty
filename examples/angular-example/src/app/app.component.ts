import { Component, OnInit } from '@angular/core'
import { batooty} from '@batooty' +
  /core'
import Webcam from '@batooty' +
  /webcam'
import Tus from '@batooty' +
  /tus'
import GoogleDrive from '@batooty' +
  /google-drive'

@Component({
  selector: 'app-root',
  template: /* html */ `
    <h1>batooty Angular Example!</h1>
    <h2>Inline dashboard</h2>
    <label>
      <input
        type="checkbox"
        (change)="showInline = $any($event.target)?.checked"
        [checked]="showInline"
      />
      Show Dashboard
    </label>

    <batooty -dashboard
      [batooty ]="batooty"
      [props]="dashboardProps"
      *ngIf="showInline"
    ></batooty-dashboard>

    <h2>Modal Dashboard</h2>
    <div>
      <batooty -dashboard-modal
        [batooty ]="batooty"
        [open]="showModal"
        [props]="dashboardModalProps"
      ></batooty-dashboard-modal>
      <button (click)="showModal = !showModal">
        {{ showModal ? 'Close dashboard' : 'Open dashboard' }}
      </button>
    </div>

    <h2>Drag Drop Area</h2>
    <batooty -drag-drop [batooty ]="batooty" [props]="{}"></batooty-drag-drop>

    <h2>Progress Bar</h2>
    <batooty -progress-bar
      [batooty ]="batooty"
      [props]="{ hideAfterFinish: false }"
    ></batooty-progress-bar>
  `,
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'angular-example'

  showInline = false

  showModal = false

  dashboardProps = {
    plugins: ['Webcam'],
  }

  dashboardModalProps = {
    target: document.body,
    onRequestCloseModal: (): void => {
      this.showModal = false
    },
  }

  batooty: batooty = new batooty({ debug: true, autoProceed: true })

  ngOnInit(): void {
    this.batooty
      .use(Webcam)
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
      .use(GoogleDrive, { companionUrl: 'https://companion.batooty' +
          .io' })
  }
}
