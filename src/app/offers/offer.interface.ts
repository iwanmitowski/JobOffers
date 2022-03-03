export interface Offer{
    "id": number,
    "title": string,
    "description": string,
    "type": string,
    "isActive": boolean,
    "category": string,
    "creatorId": number,
    "candidates": number[],
    "approved": number[]
}