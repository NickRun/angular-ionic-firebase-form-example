import { Component, OnInit, Inject  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ExchangeTypePage } from '../exchange-type/exchange-type';
import { IRequest } from '../../../shared/request.model'

@Component({
  selector: 'children',
  templateUrl: 'children.html'
})
export class ChildrenPage implements OnInit {
  public request: IRequest;
  private childrenForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject(FormBuilder) public formBuilder: FormBuilder) {
    this.request = navParams.get('request');
  }

  ngOnInit() {
    this.childrenForm = this.formBuilder.group({
      children: this.formBuilder.array([
        this.initNames(),
      ])
    });
  }

  initNames() {
    return this.formBuilder
      .group({
        name: ['', Validators.required],
      });
  }

  removeName(index: number) {
    const control = <FormArray>this.childrenForm.controls['children'];
    control.removeAt(index);
  }

  addMore() {
    const control = <FormArray>this.childrenForm.controls['children'];
    control.push(this.initNames())
  }

  // This fixes the problem where user loses focus
  // on input after typing one letter
  customTrackBy(index: number, obj: any): any {
    return index;
  }

  validateName(index: number) {
    const control = <FormArray>this.childrenForm.controls['children'];
    const nameControl = control.at(index);
    return nameControl.valid || nameControl.untouched
  }

  nextStep() {
    const control = <FormArray>this.childrenForm.controls['children'];
    const names = control.getRawValue();
    names.map(control => {
      this.request.children.push(control.name);
    });
    this.navCtrl.push(ExchangeTypePage, {request: this.request })
  }
}
