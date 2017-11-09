import {
  Version,
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import {
  APP_INITIALIZER,
  ModuleWithProviders
} from '@angular/core';

import styles from './AngularOfficeUi.module.scss';
import { BaseAngularWebPart } from './../../core/webparts/base-angular.webpart';
import { IAngularOfficeUiWebPartProps } from './IAngularOfficeUiWebPartProps';

import { SitesComponent } from './app/components/sites/sites.component';
import { SitesHomeComponent } from './app/components/sites/sites.home.component';
import { SitesFormComponent } from './app/components/sites/sites.form.component';
import { SitesViewComponent } from './app/components/sites/sites.view.component';
import { DialogComponent } from './app/components/sites/dialog.component';
import { AppRoutes } from "./app/app.routes";
import { ConfigurationService, SitesService, MockSitesService } from "./app/shared/services";

export default class AngularOfficeUiWebPart extends BaseAngularWebPart<IAngularOfficeUiWebPartProps> {

  protected importDeclarationTypes: any = [];

  protected get appDeclarationTypes(): any {
    return [
      DialogComponent,
      SitesComponent,
      SitesHomeComponent,
      SitesFormComponent,
      SitesViewComponent];
  }

  protected get providers(): any {
    if (Environment.type === EnvironmentType.Local) {
      return [
        ConfigurationService,
        { provide: SitesService, useClass: MockSitesService },
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          mocked: true,
          functionUrl: this.properties.functionUrl,
          functionKey: this.properties.functionKey,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      return [
        ConfigurationService,
        { provide: SitesService, useClass: SitesService },
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          mocked: false,
          functionUrl: this.properties.functionUrl,
          functionKey: this.properties.functionKey,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    }
  }

  protected get routes(): ModuleWithProviders {
    return AppRoutes;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Angular Webpart"
          },
          groups: [
            {
              groupName: "General Configuration",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Home Title"
                })
              ]
            },
            {
              groupName: "API Configuration",
              groupFields: [
                PropertyPaneTextField('functionUrl', {
                  label: "Function URL"
                }),
                PropertyPaneTextField('functionKey', {
                  label: "Function Key"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
