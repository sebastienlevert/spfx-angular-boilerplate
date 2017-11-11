import { Injectable } from '@angular/core';
import { IApplicationConfigurationProps } from './application.configuration.props';

@Injectable()
export class ConfigurationService {
  public description: string = "";

  public load(data: IApplicationConfigurationProps) {
    this.description = data.description ? data.description : "";
  }
}
