/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Angular2 web part base class
 */

import "reflect-metadata";
require("Zone");

import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';

import { AppComponent } from './../components/app.component';
import { NgModule, ApplicationRef, NgZone, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

/**
 * All Angular2 client side web parts should inherit from this class.
 */
export abstract class BaseAngularWebPart<TProperties> extends BaseClientSideWebPart<TProperties> {
  /**
   * Reference to the root application.
   */
  private _app: any;

  /**
   * Reference to the zone of the angular2 application to put execution (and all async tasks) in the Angular controlled zone.
   */
  private _zone: any;

  /**
   * Reference to the root component.
   */
  private _component: AppComponent;

  /**
   * Array of class references for the NgModule declarations.
   */
  protected abstract get appDeclarationTypes(): any;
  
  /**
   * Array of class references for the NgModule imports.
   */
  protected abstract get importDeclarationTypes(): any;
  
  /**
   * Array of class references for the NgModule declarations.
   */
  protected abstract get routes(): ModuleWithProviders;
  
  /**
   * Array of class references for the NgModule declarations.
   */
  protected abstract get providers(): any[];

  /**
   * On property change.
   */
  public onPropertyChange(propertyPath: string, newValue: any): void {
    // Trigger app/root-component refresh
    this._zone.run(() => { console.log('Outside Done!'); });
  }

  /**
   * Render the web part. This causes the Angular2 app to be bootstrapped which
   * in turn bootsraps the Angular2 web part root component.
   */
  public render(): void {
    // @todo: most likely we need to make this width:100%
    this.domElement.innerHTML = `<angular-${this.context.instanceId} />`;
    this._bootStrapModule();
  }

  /**
   * Bootstrap the root component of the web part.
   */
  private _bootStrapModule(): void {
    var self = this;
    
    platformBrowserDynamic().bootstrapModule(self._getModule()).then(
      ngModuleRef => {

        if(self._app["_rootComponents"] != undefined && self._app["_rootComponents"].length > 0) {
          self._component = self._app['_rootComponents'][0]['_component'] as AppComponent;
          self._zone.run(() => { console.log('Outside Done!'); });
        }
      }, err => {
        console.log(err);
      }
    );
  }

  /**
   * Get the NgModule reference that will act as the root of this web part.
   */
  private _getModule(): any {
    const component: any = AppComponent.getComponent(this.context.instanceId);
    const declarations = this.appDeclarationTypes.concat(component);
    const imports = this.importDeclarationTypes;
    const routes = this.routes;
    const providers = this.providers;
    const webPart = this;
    /**
    * Our goal is to define a single module class definition to be instantiated for each
      webpart (like instances of a class). When an instance of the module class is bootstrapped Angular2
      will create an annotation and attach it to the module class. However, when multiple instances of the
      same module class are bootstrapped, only the first annotation associated with the module class will be parsed.
      This results in any other module class instances on the page to not function.
      To allow multiple modules of the same class definitoin on one page to work, we need to define the
      class in a closure to create a new environment for each instance class, so that each annotation
      object will be parsed.
    */
    const AppModule = (() => {
      function AppModule(applicationRef, ngZone) {
        webPart._app = applicationRef; // applicationRef gives us a reference to the Angular2 component's properties
        webPart._zone = ngZone;
      }
      // We now attach required metadata for Angular2 that is allowable within a clousure
      const AppModule1 = Reflect.decorate([
        NgModule({
          imports: [BrowserModule, FormsModule, HttpModule, routes, imports],
          declarations: declarations,
          bootstrap: [component],
          exports: [RouterModule],
          providers: providers
        }),

        Reflect.metadata('design:paramtypes', [ApplicationRef, NgZone]) // This allows Angular2's DI to inject dependencies
      ], AppModule);
      return AppModule1;
    })();
    return AppModule;
  }
}

//export default BaseAngularWebPart;