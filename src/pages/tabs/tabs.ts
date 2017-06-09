import { Component } from '@angular/core';

import { RequestsPage } from '../requests/requests';
import { OptionsPage } from '../options/options';
import { RecipientPage } from '../compose/recipient/recipient';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RequestsPage;
  tab2Root = RecipientPage;
  tab3Root = OptionsPage;

  constructor() {

  }
}
