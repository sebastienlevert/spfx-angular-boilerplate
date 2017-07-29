import { 
  Version,
  Environment,
  EnvironmentType  
} from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { APP_INITIALIZER } from '@angular/core';
import styles from './BasicAngular.module.scss';
import BaseAngularWebPart from './../../core/BaseAngularWebPart';
import { IBasicAngularWebPartProps } from './IBasicAngularWebPartProps';

import { ConfigurationService, ItemsService, MockItemsService } from "./app/shared/services";
import { AppComponent, AppRoutes } from './app';
import { HomeComponent } from './app/home';
import { ListComponent } from './app/list';

export default class BasicAngularWebPart extends BaseAngularWebPart<IBasicAngularWebPartProps, AppComponent> {

  protected get rootComponentType(): any {
    return AppComponent;
  }

  protected get appDeclarationTypes(): any {
    return [
      HomeComponent,
      ListComponent
    ];
  }
  
  protected get routes(): any {
    return AppRoutes;
  }

  protected get providers(): any {
    if (Environment.type === EnvironmentType.Local) {
      return [
        ConfigurationService,
        { provide: ItemsService, useClass: MockItemsService },
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          mocked: true,
          listName: this.properties.listName,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      return [
        ConfigurationService,
        { provide: ItemsService, useClass: ItemsService },
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          mocked: false,
          listName: this.properties.listName,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    }    
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Angular Basic Webpart"
          },
          groups: [
            {
              groupName: "General Configuration",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Title"
                })
              ]
            },
            {
              groupName: "List Configuration",
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: "List Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
