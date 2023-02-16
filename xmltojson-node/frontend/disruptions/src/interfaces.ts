import { ReactNode } from "react"

export interface IChangeHistory {
    ChangedBy: string,
    LastChangedDate: string
  }
  
  export interface ISource {
    TwitterHashtag: string
  }
  
  export interface IValidityPeriod {
    StartTime: string
  }
  
  export interface IInfoLinks {
    InfoLink: IInfoLink
  }
  
  export interface IInfoLink {
    Uri: string,
    Label: string
  }
  
  export interface IAffects {
    Operators: IOperators,
    RoutesAffected: string
  }
  
  export interface IOperators {
    AffectedOperators: IAffectedOperators
  }
  
  export interface IAffectedOperators {
    OperatorRef: string,
    OperatorName: string
  }
  
  export interface IDisruptionData {
    CreationTime: string,
    ChangeHistory: IChangeHistory,
    ParticipantRef: string,
    IncidentNumber: string,
    Version: string,
    Source: ISource,
    ValidityPeriod: IValidityPeriod,
    Planned: string,
    Summary: string,
    Description: string,
    InfoLinks: IInfoLinks,
    Affects: IAffects,
    ClearedIncident: string,
    IncidentPriority: string, 
    map: (arg:any) => IDisruptionData;
  }