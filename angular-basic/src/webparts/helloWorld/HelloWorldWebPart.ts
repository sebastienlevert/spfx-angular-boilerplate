import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
import { BaseAngularWebPart } from '../../core/webparts/base-angular.webpart';
import { HomeComponent } from './app/home/home.component';
import { ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { AppRoutes } from './app/app.routes';
import { ConfigurationService } from './app/shared/services/configuration.service';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPartWebPart extends BaseAngularWebPart<IHelloWorldWebPartProps> {

  protected importDeclarationTypes: any = [];

  protected get appDeclarationTypes(): any[] {
    return [
      HomeComponent
    ];
  }

  protected get routes(): ModuleWithProviders {
    return AppRoutes;
  }

  protected get providers(): any[] {
    return [
      // Provides the Configuration Service
      ConfigurationService,

      // Initialized the ConfigurationService data based on the ClientWebPart configuration
      { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
        description: this.properties.description
      }), deps: [ConfigurationService], multi: true }
    ];
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
