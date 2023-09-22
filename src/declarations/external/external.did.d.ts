import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface External {
  'Greet' : ActorMethod<[string], string>,
  'test' : ActorMethod<[bigint], bigint>,
}
export interface _SERVICE extends External {}
