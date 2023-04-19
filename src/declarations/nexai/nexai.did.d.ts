import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CardEntry {
  'question' : string,
  'answer' : string,
  'email' : string,
}
export interface CompanyEntry {
  'name' : string,
  'createdAt' : bigint,
  'email' : string,
}
export interface Nexai {
  'CheckPrincipal' : ActorMethod<[], Principal>,
  'createCompany' : ActorMethod<[string, string], boolean>,
  'createQCard' : ActorMethod<[string, string], undefined>,
  'getAllCompanies' : ActorMethod<[], Array<[Principal, CompanyEntry]>>,
  'getAnAnswer' : ActorMethod<[bigint], [] | [CardEntry]>,
  'greet' : ActorMethod<[string], string>,
  'logIn' : ActorMethod<[], boolean>,
}
export interface _SERVICE extends Nexai {}
