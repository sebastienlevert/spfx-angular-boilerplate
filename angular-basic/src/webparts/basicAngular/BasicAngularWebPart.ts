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
import styles from './BasicAngular.module.scss';
import { BaseAngularWebPart } from './../../core/webparts/base-angular.webpart';
import { IBasicAngularWebPartProps } from './IBasicAngularWebPartProps';
import pnp from "sp-pnp-js";

import { ConfigurationService, ItemsService, MockItemsService } from "./app/shared/services";
import { AppRoutes } from './app';
import { HomeComponent } from './app/home';
import { ListComponent } from './app/list';

export default class BasicAngularWebPart extends BaseAngularWebPart<IBasicAngularWebPartProps> {
  
  protected importDeclarationTypes: any = [];

  protected get appDeclarationTypes(): any[] {
    return [
      HomeComponent,
      ListComponent
    ];
  }
  
  protected get routes(): ModuleWithProviders {
    return AppRoutes;
  }

  protected get providers(): any[] {
    if (Environment.type === EnvironmentType.Local) {
      return [
        // Provides the Configuration Service
        ConfigurationService,

        // Provides the ItemsService with its Mocked instance
        { provide: ItemsService, useClass: MockItemsService },

        // Initialized the ConfigurationService data based on the ClientWebPart configuration
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          mocked: true,
          listName: this.properties.listName,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    } else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      return [
        // Provides the Configuration Service
        ConfigurationService,

        // Provides the ItemsService with its Real instance
        { provide: ItemsService, useClass: ItemsService },

        // Initialized the ConfigurationService data based on the ClientWebPart configuration
        { provide: APP_INITIALIZER, useFactory: (configurationService: ConfigurationService) => () => configurationService.load({
          mocked: false,
          listName: this.properties.listName,
          description: this.properties.description,
          styles: styles
        }), deps: [ConfigurationService], multi: true }
      ];
    }    
  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {  
      pnp.setup({
        spfxContext: this.context
      });      
    });
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
