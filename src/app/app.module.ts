import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase} from 'angularfire2/database';

import { OptionsPage } from '../pages/options/options';
import { RequestsPage } from '../pages/requests/requests';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { RequestDetailsPage } from '../pages/requests/request-details/request-details';
import { RecipientPage } from '../pages/compose/recipient/recipient';
import { ExchangeTypePage } from '../pages/compose/exchange-type/exchange-type';
import { PickupDetailsPage } from '../pages/compose/pickup-details/pickup-details';
import { DropoffDetailsPage } from '../pages/compose/dropoff-details/dropoff-details';
import { ReviewPage } from '../pages/compose/review/review';
import { ChildrenPage } from '../pages/compose/children/children';
import { RepeatPage } from '../pages/compose/repeat/repeat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const fbConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    MyApp,
    OptionsPage,
    RequestsPage,
    TabsPage,
    LoginPage,
    SignupPage,
    RequestDetailsPage,
    RecipientPage,
    ExchangeTypePage,
    PickupDetailsPage,
    DropoffDetailsPage,
    ReviewPage,
    ChildrenPage,
    RepeatPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(fbConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OptionsPage,
    RequestsPage,
    TabsPage,
    LoginPage,
    SignupPage,
    RequestDetailsPage,
    RecipientPage,
    ExchangeTypePage,
    PickupDetailsPage,
    DropoffDetailsPage,
    ReviewPage,
    ChildrenPage,
    RepeatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
