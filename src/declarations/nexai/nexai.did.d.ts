import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CardEntry {
  'username' : string,
  'question' : string,
  'answer' : string,
}
export interface CompanyEntry {
  'about' : string,
  'username' : string,
  'founderName' : string,
  'name' : string,
  'createdAt' : bigint,
}
export interface Nexai {
  'CheckPrincipal' : ActorMethod<[], Principal>,
  'createCompany' : ActorMethod<[string, string, string, string], undefined>,
  'createQCard' : ActorMethod<[string, string], undefined>,
  'getAllCompanies' : ActorMethod<[], Array<[Principal, CompanyEntry]>>,
  'getAnAnswer' : ActorMethod<[bigint], [] | [CardEntry]>,
  'greet' : ActorMethod<[string], string>,
}
export interface _SERVICE extends Nexai {}
