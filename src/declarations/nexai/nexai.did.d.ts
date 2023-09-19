import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CardEntry {
  'question' : string,
  'vdbId' : number,
  'answer' : string,
}
export interface CompanyEntry {
  'vdbId' : number,
  'name' : string,
  'createdAt' : bigint,
  'description' : string,
  'email' : string,
}
export interface CompanyEntry__1 {
  'vdbId' : number,
  'name' : string,
  'createdAt' : bigint,
  'description' : string,
  'email' : string,
}
export interface Nexai {
  'CheckPrincipal' : ActorMethod<[], Principal>,
  'VDBAddQandA' : ActorMethod<
    [number, BigUint64Array | bigint[], Array<string>],
    Result
  >,
  'VDBBuildIndex' : ActorMethod<[Array<bigint>], Result>,
  'VDBGetSimilar' : ActorMethod<
    [bigint, BigUint64Array | bigint[], number],
    Result_1
  >,
  'VDBRegister' : ActorMethod<[string], Result_2>,
  'createCompany' : ActorMethod<
    [string, string, string, number],
    [] | [CompanyEntry]
  >,
  'createQCard' : ActorMethod<
    [string, string, BigUint64Array | bigint[], Array<string>],
    undefined
  >,
  'getAllCompanies' : ActorMethod<[], Array<[Principal, CompanyEntry__1]>>,
  'getAllQCards' : ActorMethod<[number], [] | [Array<CardEntry>]>,
  'getAnAnswer' : ActorMethod<[bigint], [] | [CardEntry]>,
  'getCompanyProfile' : ActorMethod<[], [] | [CompanyEntry]>,
  'greet' : ActorMethod<[string], string>,
  'logIn' : ActorMethod<[], boolean>,
  'makeManager' : ActorMethod<[], boolean>,
}
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : Array<[bigint, string]> } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : number } |
  { 'Err' : string };
export interface _SERVICE extends Nexai {}
