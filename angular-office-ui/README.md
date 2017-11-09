# SharePoint Framework Angular Office UI

## Summary
Angular sample Web Part that demonstrates the use of Angular and the integration of the Office UI Fabric React Components. Further more, this sample uses an Azure Function as a way to elevate priviledges of the currently logged in user to execute specific task (in that case, a Site Provisioning process).

![Screeshot of the Angular Basic web part in the Local Workbench](./assets/spfx-angular-basic-local-workbench.gif)

> The webpart uses mocked service when the sample is run from the Local Workbench.

![Screeshot of the Angular Basic web part in the Hosted Workbench](./assets/spfx-angular-basic-hosted-workbench.gif)

> The webpart uses the live servive (Azure Function) when the sample is run from the Hosted Workbench or any page in SharePoint Online.

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## Applies to

* [SharePoint Framework General Availability](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
spfx-angular-office-ui|Sébastien Levert (MVP, Valo Intranet, @sebastienlevert)


## Version history

Version|Date|Comments
-------|----|--------
1.0|August 21, 2017|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Create an Azure AD Application that is scoped to create new Modern Groups in Office 365
- Create an Azure Function that will invoque the created Azure AD to create new Modern Groups in Office 365
- In the command line run:
  - `npm install`
  - `gulp serve`
  - `Open the *workbench* from your Localhost`
  - `Open the *workbench* on your Office 365 Developer tenant`

## Create the Azure AD Application

## Create the Azure Function

## Features
The spfx-angular-office-ui web part creates a Modern Group (and all its components, including a SharePoint Modern Team Site) using an Azure Function based on the data provided in the New Site Form..

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using Angular as the UI Framework
* Using multiple Angular webparts on the same page
* Using Angular Router to navigate between states of the WebPart
* Using the Office UI Fabric React Components to deliver high quality and interactive user interfaces in Angular
* Using the Microsoft Graph to create content in Office 365
* Using an Azure Function to execute actions that are not necessary available to users using an elevated privileges approach.

A blog series is available to go through all the details of this solution. Please see it here : [SharePoint Framework and Angular](http://www.sebastienlevert.com/2017/07/31/sharepoint-framework-and-angular-introducing-the-spfx-angular-boilerplate)
