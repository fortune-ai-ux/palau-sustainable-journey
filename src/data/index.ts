import rawDays from './itinerary.json';
import rawChecklist from './checklist.json';
import type { TripDay, CheckItem } from '../types';
const links:Record<string,string>={'d2-a1':'rock','d3-a1':'rock','d4-a1':'market','d4-a3':'farm','d4-a4':'clam','d5-a1':'museum','d5-a2':'airai','d5-a3':'bai','d5-a4':'airai','d5-a5':'airai','d6-a3':'hotel','d7-a1':'waterfall','d7-a2':'museum','d8-a1':'market','d8-a2':'surangel','d8-a3':'wctc','d9-a1':'rock','d10-a1':'stone','d10-a3':'mangrove','d10-a5':'stone','d11-a1':'glass','d12-a1':'resort','d12-a2':'embassy'};
export const defaultDays:TripDay[]=rawDays.map(d=>({...d,activities:d.activities.map(a=>({...a,placeId:links[a.id]??null}))}));
export const defaultChecklist:CheckItem[]=rawChecklist;
