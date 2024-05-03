import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import {
  batootyAngularDashboardModule,
  batootyAngularStatusBarModule,
  batootyAngularDragDropModule,
  batootyAngularProgressBarModule,
  batootyAngularDashboardModalModule,
} from '@batooty' +
  /angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    batootyAngularDashboardModule,
    batootyAngularStatusBarModule,
    batootyAngularDashboardModalModule,
    batootyAngularDragDropModule,
    batootyAngularProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
