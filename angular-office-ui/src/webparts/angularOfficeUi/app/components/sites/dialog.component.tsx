import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Component, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import {
  Dialog,
  DialogType,
  DialogFooter
} from 'office-ui-fabric-react/lib/Dialog';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';

@Component({
  selector: `progress-dialog`,
  template: "<div #progressDialog></div>"
})
export class DialogComponent implements OnDestroy {
  @ViewChild('progressDialog') private progressDialogElement: ElementRef;

  private _isOpen: boolean;
  @Input("isOpen") set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
    this.render();
  }
  get isOpen() {
    return this._isOpen;
  }
  @Input("title") public title: string;
  @Input("description") public description: string;

  constructor() { }

  public ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.progressDialogElement.nativeElement);
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  private render() {
    let isOpen = this.isOpen;
    let title = this.title;
    let description = this.description;

    ReactDOM.render(
      <Dialog
        isOpen={ isOpen }
        type={ DialogType.largeHeader }
        title={ title }
        isBlocking={ true }>
        <Spinner size={ SpinnerSize.large } label={ description } />
      </Dialog>, this.progressDialogElement.nativeElement);
  }
}
