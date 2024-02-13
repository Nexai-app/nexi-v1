import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface CardEntry {
  'question' : string,
  'vdbId' : number,
  'answer' : string,
}
export interface CompanyEntry {
  'vdbId' : number,
  'premium' : [] | [boolean],
  'name' : string,
  'createdAt' : bigint,
  'description' : string,
  'email' : string,
  'documentId' : [] | [bigint],
}
export interface CompanyEntry__1 {
  'vdbId' : number,
  'premium' : [] | [boolean],
  'name' : string,
  'createdAt' : bigint,
  'description' : string,
  'email' : string,
  'documentId' : [] | [bigint],
}
export interface ConnectionEntry {
  'id' : bigint,
  'createdAt' : bigint,
  'account1' : Principal,
  'account2' : Principal,
}
export type FloatMatrix = Array<FloatVector>;
export type FloatVector = Array<number>;
export interface MessageEntry {
  'id' : bigint,
  'body' : string,
  'createdAt' : bigint,
  'connectionId' : bigint,
  'sender' : Principal,
}
export interface Nexai {
  'CheckPrincipal' : ActorMethod<[], Principal>,
  'Check_Principal' : ActorMethod<[Principal], Principal>,
  'VDBAddQandA' : ActorMethod<[number, FloatMatrix, Array<string>], Result__1>,
  'VDBBuildIndex' : ActorMethod<[number], Result__1>,
  'VDBGetSimilar' : ActorMethod<[number, FloatVector, number], Result_1>,
  'VDBRegister' : ActorMethod<[string], Result_2>,
  'check_for_premium' : ActorMethod<[], [] | [boolean]>,
  'createCompany' : ActorMethod<
    [string, string, string, number],
    [] | [CompanyEntry]
  >,
  'createQCard' : ActorMethod<
    [string, string, FloatMatrix, Array<string>],
    Result
  >,
  'deleteQCard' : ActorMethod<[bigint], undefined>,
  'editCompanyDetails' : ActorMethod<
    [string, string, string],
    [] | [CompanyEntry]
  >,
  'editQCard' : ActorMethod<[bigint, string, string], undefined>,
  'getAllCompanies' : ActorMethod<[], Array<[Principal, CompanyEntry__1]>>,
  'getAllConnections' : ActorMethod<[], [] | [Array<ConnectionEntry>]>,
  'getAllQCards' : ActorMethod<[number], [] | [Array<CardEntry>]>,
  'getAnAnswer' : ActorMethod<[bigint], [] | [CardEntry]>,
  'getCompanyProfile' : ActorMethod<[], [] | [CompanyEntry]>,
  'getMessage' : ActorMethod<[bigint], [] | [MessageEntry]>,
  'getMessages' : ActorMethod<[Principal], Array<MessageEntry>>,
  'getMyAccountIdentifier' : ActorMethod<[], string>,
  'getVDB_ID' : ActorMethod<[bigint], number>,
  'greet' : ActorMethod<[string], string>,
  'icp_balance' : ActorMethod<[], bigint>,
  'icp_balance_dfx' : ActorMethod<[], Tokens>,
  'logIn' : ActorMethod<[], boolean>,
  'makeManager' : ActorMethod<[], boolean>,
  'sendMessage' : ActorMethod<[Principal, string], [] | [null]>,
  'set_premium' : ActorMethod<[boolean], boolean>,
  'toAccount' : ActorMethod<
    [{ 'canister' : Principal, 'caller' : Principal }],
    Account
  >,
  'toSubaccount' : ActorMethod<[Principal], Uint8Array | number[]>,
  'transferICP' : ActorMethod<[string, Tokens, TimeStamp], bigint>,
}
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'Ok' : Array<[number, string]> } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : number } |
  { 'Err' : string };
export type Result__1 = { 'Ok' : null } |
  { 'Err' : string };
export interface TimeStamp { 'timestamp_nanos' : bigint }
export interface Tokens { 'e8s' : bigint }
export interface _SERVICE extends Nexai {}
