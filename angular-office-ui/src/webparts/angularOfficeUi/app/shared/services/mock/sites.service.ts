import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { ISitesService } from "./../interfaces/sites.service";
import { ISiteCreationInformation, ISiteCreationResponse } from "./../../models";

@Injectable()
export class MockSitesService implements ISitesService {
  public createSite(siteInformation: ISiteCreationInformation): Observable<ISiteCreationResponse> {
    return Observable.of<ISiteCreationResponse>({
      description: `${siteInformation.description} (Mocked)`,
      email: `${siteInformation.url}@mocked.onmicrosoft.com`,
      id: "00000000-0000-0000-0000-000000000000",
      title: `${siteInformation.title} (Mocked)`,
      url: `#${siteInformation.url}`
    }).delay(2000);
  }
}
