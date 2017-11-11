# SharePoint Framework Angular Boilerplate

## Summary
Placeholder SPFx Project allowing simple copy to use to start any SPFx project without doing all the integration in a brand new SPFx project.

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## Applies to

* [SharePoint Framework General Availability](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
spfx-angular-boilerplate|Sébastien Levert (MVP, Valo Intranet, @sebastienlevert)


## Version history

Version|Date|Comments
-------|----|--------
1.0|November 11, 2017|Inital release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Remove all .git folders
- Change all tokens {SolutionName}, {SolutionId}, {SolutionTitle} by your actual solution you want to create
- in the command line run:
  - `yo @microsoft/sharepoint`
  - `Use Options *WebPart* and *No Framework* in the generator`
  - `Change the Base Class of your WebPart to be the BaseAngularClientWebPart`
  - `Create your Angular App in the app folder`
  - `Implement missing methods on your WebPart Class`
  - `npm install`
  - `gulp serve`
  - `Open the *workbench* from your Localhost`
  - `Open the *workbench* on your Office 365 Developer tenant`

## Features
The spfx-angular-boilerplate project enables a simple starting point for any new SPFx project using Angular.

A blog series is available to go through all the details of this solution. Please see it here : [SharePoint Framework and Angular](http://www.sebastienlevert.com/2017/07/31/sharepoint-framework-and-angular-introducing-the-spfx-angular-boilerplate)
