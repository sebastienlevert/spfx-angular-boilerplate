import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Component, OnInit, ElementRef, Inject, ViewChild, NgZone } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton, DefaultButton, Button, ButtonType } from "office-ui-fabric-react/lib/Button";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { DialogComponent } from "./dialog.component";
import { SitesService } from "./../../shared/services";
import { ISiteCreationInformation } from "./../../shared/models";
import { BaseNavigatingComponent } from './../../../../../core/components/navigating.component';

@Component({
  selector: "sites-form",
  template: require("./templates/sites.form.template.html") as string
})
export class SitesFormComponent extends BaseNavigatingComponent implements OnInit {

  @ViewChild('siteTitleElement') private siteTitleElement: ElementRef;
  @ViewChild('siteDescriptionElement') private siteDescriptionElement: ElementRef;
  @ViewChild('siteUrlElement') private siteUrlElement: ElementRef;
  @ViewChild('sitePrivateElement') private sitePrivateElement: ElementRef;
  @ViewChild('buttonSectionElement') private buttonSectionElement: ElementRef;
  @ViewChild(DialogComponent) private dialogComponent: DialogComponent;

  private siteTitle: string = "";
  private siteDescription: string = "";
  private siteUrl: string = "";
  private sitePrivate: boolean = true;
  private siteAbsoluteUrl: string = "";

  public dialog = {
    title: "Creating Modern Site",
    description: "Hold on. That should be quick!",
    isOpen: false
  };

  public errorMessage = "";

  constructor(@Inject(NgZone) protected zone: NgZone, @Inject(Router) protected router: Router, @Inject(SitesService) private sitesService: SitesService) {
    super(zone, router);
  }

  public ngOnInit() {
    ReactDOM.render(<TextField label='Site Title' required={ true } onChanged={ this._onSiteTitleChanged } />, this.siteTitleElement.nativeElement);
    ReactDOM.render(<TextField label='Site Description' multiline rows={ 4 } onChanged={ this._onSiteDescriptionChanged } />, this.siteDescriptionElement.nativeElement);
    ReactDOM.render(<TextField label='Site URL' required={ true } onChanged={ this._onSiteUrlChanged } />, this.siteUrlElement.nativeElement);
    ReactDOM.render(<Toggle defaultChecked={ true } label='Site is Private' onText='Yes' offText='No' onChanged={ this._onSitePrivateChanged } />, this.sitePrivateElement.nativeElement);
    ReactDOM.render(
      <div className="ms-Grid">
        <div className="ms-Grid-row ms-u-textAlignRight">
          <div className="ms-Grid-col ms-u-hiddenMdDown ms-u-lg8" />
          <div className="ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg4">
            <PrimaryButton onClick={ this._onCreateSite }>Create Site</PrimaryButton>
            <DefaultButton onClick={ this._onCancel }>Cancel</DefaultButton>
          </div>
        </div>
      </div>, this.buttonSectionElement.nativeElement);
  }

  private resetForm() {
    this.siteDescription = "";
    this.siteTitle = "";
    this.siteUrl = "";
  }

  @autobind
  private _onCreateSite() {
    let siteInformation: ISiteCreationInformation = {
      title: this.siteTitle,
      description: this.siteDescription,
      url: this.siteUrl,
      private: this.sitePrivate
    };

    this.dialogComponent.toggle();
    this.sitesService
      .createSite(siteInformation)
      .subscribe(
        site => {
          this.dialogComponent.toggle();
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "data": JSON.stringify(site)
            },
            skipLocationChange: true
          };
          this.navigate(["/sites", site.id], navigationExtras);
        },
        error =>  this.errorMessage = error);
  }

  @autobind
  private _onCancel() {
    this.navigate(['/']);
  }

  @autobind
  private _onSiteTitleChanged(value: any) {
    this.siteTitle = value;
  }

  @autobind
  private _onSiteDescriptionChanged(value: any) {
    this.siteDescription = value;
  }

  @autobind
  private _onSiteUrlChanged(value: any) {
    this.siteUrl = value;
  }

  @autobind
  private _onSitePrivateChanged(value: any) {
    this.sitePrivate = value;
  }
}
