import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Profile__init__ {
  'userName' : string,
  'access_priviledges' : Array<string>,
  'name' : string,
  'createdAt' : bigint,
  'email' : string,
  'updated' : boolean,
  'identity' : Principal,
}
export type Result = { 'ok' : string } |
  { 'err' : string };
export interface icfiles {
  'Fetch_All_Users' : ActorMethod<[], Array<[Principal, Profile__init__]>>,
  'Init_Profile' : ActorMethod<[string, string, string], Result>,
  'Test' : ActorMethod<[string, string], boolean>,
  'Test1' : ActorMethod<[string], string>,
  'Update_Email' : ActorMethod<[string], Result>,
  'Update_Username' : ActorMethod<[string], Result>,
  'logIn' : ActorMethod<[], boolean>,
}
export interface _SERVICE extends icfiles {}
