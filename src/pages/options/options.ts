import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class OptionsPage {

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth) {}

  logout() {
    this.afAuth.auth.signOut();
  }

}
