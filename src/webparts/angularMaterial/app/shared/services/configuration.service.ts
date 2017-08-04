import { Injectable } from '@angular/core';
import { IApplicationConfigurationProps } from './application.configuration.props';

@Injectable()
export class ConfigurationService {
  public mocked: boolean = false;
  public listName: string = "";
  public description: string = "";
  public styles: any = null;

  public load(data: IApplicationConfigurationProps) {
    this.mocked = data.mocked;
    this.description = data.description ? data.description : "";
    this.listName = data.listName ? data.listName : "";
    this.styles = data.styles ? data.styles : null;
  }
}