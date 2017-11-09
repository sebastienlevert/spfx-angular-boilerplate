import { Injectable } from '@angular/core';
import { IApplicationConfigurationProps } from './interfaces/application.configuration.props';

@Injectable()
export class ConfigurationService {
  public mocked: boolean = false;
  public functionUrl: string = "";
  public functionKey: string = "";
  public description: string = "";
  public styles: any = null;

  public load(data: IApplicationConfigurationProps) {
    this.mocked = data.mocked;
    this.functionUrl = data.functionUrl ? data.functionUrl : "";
    this.functionKey = data.functionKey ? data.functionKey : "";
    this.description = data.description ? data.description : "";
    this.styles = data.styles;
  }

  public isConfigured() : boolean {
    return !(this.functionKey == "" || this.functionUrl == "") || this.mocked;
  }
}