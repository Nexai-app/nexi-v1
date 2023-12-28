import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface CardEntry {
  question: string;
  vdbId: number;
  answer: string;
}
export interface CompanyEntry {
  vdbId: number;
  name: string;
  createdAt: bigint;
  description: string;
  email: string;
}
export interface CompanyEntry__1 {
  vdbId: number;
  name: string;
  createdAt: bigint;
  description: string;
  email: string;
}
export interface Conversation {
  messages: Array<Message>;
  conversationID: [] | [string];
}
export type FloatMatrix = Array<FloatVector>;
export type FloatVector = Array<number>;
export interface Message {
  id: bigint;
  customer: Principal;
  body: string;
  time: bigint;
  company: Principal;
}
export interface Nexai {
  CheckPrincipal: ActorMethod<[], Principal>;
  VDBAddQandA: ActorMethod<[number, FloatMatrix, Array<string>], Result__1>;
  VDBBuildIndex: ActorMethod<[number], Result__1>;
  VDBGetSimilar: ActorMethod<[number, FloatVector, number], Result_1>;
  VDBRegister: ActorMethod<[string], Result_2>;
  createCompany: ActorMethod<
    [string, string, string, number],
    [] | [CompanyEntry]
  >;
  createQCard: ActorMethod<
    [string, string, FloatMatrix, Array<string>],
    Result
  >;
  deleteQCard: ActorMethod<[bigint], undefined>;
  editCompanyDetails: ActorMethod<
    [string, string, string],
    [] | [CompanyEntry]
  >;
  editQCard: ActorMethod<[bigint, string, string], undefined>;
  getAllCompanies: ActorMethod<[], Array<[Principal, CompanyEntry__1]>>;
  getAllQCards: ActorMethod<[number], [] | [Array<CardEntry>]>;
  getAnAnswer: ActorMethod<[bigint], [] | [CardEntry]>;
  getCompanyProfile: ActorMethod<[], [] | [CompanyEntry]>;
  getMessage: ActorMethod<[string], [] | [Conversation]>;
  getVDB_ID: ActorMethod<[bigint], number>;
  greet: ActorMethod<[string], string>;
  logIn: ActorMethod<[], boolean>;
  makeManager: ActorMethod<[], boolean>;
  sendMessage: ActorMethod<[Principal, string, [] | [string]], undefined>;
}
export type Result = { ok: string } | { err: string };
export type Result_1 = { Ok: Array<[number, string]> } | { Err: string };
export type Result_2 = { Ok: number } | { Err: string };
export type Result__1 = { Ok: null } | { Err: string };
export interface _SERVICE extends Nexai {}
