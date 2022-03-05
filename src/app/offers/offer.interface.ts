import { User } from "../users/user.interface";

export interface Offer{
    "id": number,
    "title": string,
    "description": string,
    "type": string,
    "isActive": boolean,
    "category": string,
    "creatorId": number,
    "creator": User,
    "candidateIds": number[],
    "candidates": User[],
    "approvedIds": number[],
    "approved": User[],
}