import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface External {
  'Greet' : ActorMethod<[string], string>,
  'VDBGetSimilar' : ActorMethod<[number, Array<number>, number], Result_1>,
  'test' : ActorMethod<[bigint], bigint>,
}
export type Result_1 = { 'Ok' : Array<[number, string]> } |
  { 'Err' : string };
export interface _SERVICE extends External {}
