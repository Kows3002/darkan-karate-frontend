export type EventStatus="Upcoming"|"Completed";
export type AcademyEvent={slug:string;title:string;date:string;displayDate:string;status:EventStatus;venue:string;description:string};
export const events:AcademyEvent[]=[
 {slug:"grading-june-2025",title:"Belt Grading",date:"2025-06-29",displayDate:"29 June 2025",status:"Completed",venue:"",description:"Students completed their belt grading on 29 June 2025."},
 {slug:"grading-december-2025",title:"Belt Grading",date:"2025-12-21",displayDate:"21 December 2025",status:"Completed",venue:"",description:"Students completed their year-end belt grading on 21 December 2025."},
 {slug:"tournament-july-2026",title:"National Tournament",date:"2026-07-12",displayDate:"12 July 2026",status:"Completed",venue:"",description:"Darkan students represented their dojos at the Chennai Karate Kobudo Championship and returned with medals, certificates and competition experience."},
 {slug:"grading-august-2026",title:"Belt Grading",date:"2026-08-16",displayDate:"16 August 2026",status:"Upcoming",venue:"",description:""},
];
