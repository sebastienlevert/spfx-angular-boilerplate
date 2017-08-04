declare interface IBasicAngularStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'basicAngularStrings' {
  const strings: IBasicAngularStrings;
  export = strings;
}
