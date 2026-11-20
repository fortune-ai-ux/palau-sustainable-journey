export interface Activity {id:string;title:string;description:string;time:string|null;location:string;placeId:string|null;category:string;isCustom:boolean}
export interface TripDay {id:string;date:string;dayNumber:number;title:string;description:string;activities:Activity[];sdgs:number[]}
export type PlaceCategory='海洋生態'|'自然環境'|'文化歷史'|'永續產業'|'市場經濟';
export interface Place {id:string;name:string;english?:string;category:PlaceCategory;description:string;query:string;days:number[];sdgs:number[];confirmed:boolean;image?:string;source?:string}
export interface CheckItem {id:string;title:string;category:string;checked:boolean;isCustom:boolean}
export type Currency='TWD'|'USD';
export interface Transaction {id:string;type:'income'|'expense';title:string;amount:string;currency:Currency;category:string;date:string;note:string}
export interface BudgetSettings {budget:string;rate:string}
