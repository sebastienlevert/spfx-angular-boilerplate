import { ISiteCreationInformation, ISiteCreationResponse } from "./../../models";
import { Observable } from 'rxjs/Observable';

export interface ISitesService {
  createSite(siteInformation: ISiteCreationInformation): Observable<ISiteCreationResponse>;
}