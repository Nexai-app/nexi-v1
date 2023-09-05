import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BatchId = bigint;
export type BatchOperationKind = { 'CreateAsset' : CreateAssetArguments } |
  { 'UnsetAssetContent' : UnsetAssetContentArguments } |
  { 'DeleteAsset' : DeleteAssetArguments } |
  { 'SetAssetContent' : SetAssetContentArguments } |
  { 'Clear' : ClearArguments };
export type ChunkId = bigint;
export type ClearArguments = {};
<<<<<<< HEAD:src/declarations/nexai_assets/nexai_assets.did.d.ts
=======
export interface CommitBatchArguments {
  'batch_id' : BatchId,
  'operations' : Array<BatchOperationKind>,
}
export interface CommitProposedBatchArguments {
  'batch_id' : BatchId,
  'evidence' : Uint8Array | number[],
}
export interface ComputeEvidenceArguments {
  'batch_id' : BatchId,
  'max_iterations' : [] | [number],
}
export interface ConfigurationResponse {
  'max_batches' : [] | [bigint],
  'max_bytes' : [] | [bigint],
  'max_chunks' : [] | [bigint],
}
export interface ConfigureArguments {
  'max_batches' : [] | [[] | [bigint]],
  'max_bytes' : [] | [[] | [bigint]],
  'max_chunks' : [] | [[] | [bigint]],
}
>>>>>>> 749c460 (debugging dfx v 0.14.3):src/declarations/nexai_assets/service.did.d.ts
export interface CreateAssetArguments {
  'key' : Key,
  'content_type' : string,
  'headers' : [] | [Array<HeaderField>],
  'allow_raw_access' : [] | [boolean],
  'max_age' : [] | [bigint],
  'enable_aliasing' : [] | [boolean],
}
export interface DeleteAssetArguments { 'key' : Key }
export interface GrantPermission {
  'permission' : Permission,
  'to_principal' : Principal,
}
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type Key = string;
export interface ListPermitted { 'permission' : Permission }
export type Permission = { 'Prepare' : null } |
  { 'ManagePermissions' : null } |
  { 'Commit' : null };
export interface RevokePermission {
  'permission' : Permission,
  'of_principal' : Principal,
}
export interface SetAssetContentArguments {
  'key' : Key,
  'sha256' : [] | [Uint8Array | number[]],
  'chunk_ids' : Array<ChunkId>,
  'content_encoding' : string,
}
export interface SetAssetPropertiesArguments {
  'key' : Key,
  'headers' : [] | [[] | [Array<HeaderField>]],
  'allow_raw_access' : [] | [[] | [boolean]],
  'max_age' : [] | [[] | [bigint]],
}
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackToken {
  'key' : Key,
  'sha256' : [] | [Uint8Array | number[]],
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : [Principal, string],
    }
  };
export type Time = bigint;
export interface UnsetAssetContentArguments {
  'key' : Key,
  'content_encoding' : string,
}
export type ValidationResult = { 'Ok' : string } |
  { 'Err' : string };
export interface _SERVICE {
  'authorize' : ActorMethod<[Principal], undefined>,
  'certified_tree' : ActorMethod<
    [{}],
    { 'certificate' : Uint8Array | number[], 'tree' : Uint8Array | number[] }
  >,
  'clear' : ActorMethod<[ClearArguments], undefined>,
  'commit_batch' : ActorMethod<
    [{ 'batch_id' : BatchId, 'operations' : Array<BatchOperationKind> }],
    undefined
  >,
<<<<<<< HEAD:src/declarations/nexai_assets/nexai_assets.did.d.ts
=======
  'compute_evidence' : ActorMethod<
    [ComputeEvidenceArguments],
    [] | [Uint8Array | number[]]
  >,
  'configure' : ActorMethod<[ConfigureArguments], undefined>,
>>>>>>> 749c460 (debugging dfx v 0.14.3):src/declarations/nexai_assets/service.did.d.ts
  'create_asset' : ActorMethod<[CreateAssetArguments], undefined>,
  'create_batch' : ActorMethod<[{}], { 'batch_id' : BatchId }>,
  'create_chunk' : ActorMethod<
    [{ 'content' : Uint8Array | number[], 'batch_id' : BatchId }],
    { 'chunk_id' : ChunkId }
  >,
  'deauthorize' : ActorMethod<[Principal], undefined>,
  'delete_asset' : ActorMethod<[DeleteAssetArguments], undefined>,
  'get' : ActorMethod<
    [{ 'key' : Key, 'accept_encodings' : Array<string> }],
    {
      'content' : Uint8Array | number[],
      'sha256' : [] | [Uint8Array | number[]],
      'content_type' : string,
      'content_encoding' : string,
      'total_length' : bigint,
    }
  >,
  'get_asset_properties' : ActorMethod<
    [Key],
    {
      'headers' : [] | [Array<HeaderField>],
      'allow_raw_access' : [] | [boolean],
      'max_age' : [] | [bigint],
    }
  >,
  'get_chunk' : ActorMethod<
    [
      {
        'key' : Key,
        'sha256' : [] | [Uint8Array | number[]],
        'index' : bigint,
        'content_encoding' : string,
      },
    ],
    { 'content' : Uint8Array | number[] }
  >,
  'get_configuration' : ActorMethod<[], ConfigurationResponse>,
  'grant_permission' : ActorMethod<[GrantPermission], undefined>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'http_request_streaming_callback' : ActorMethod<
    [StreamingCallbackToken],
    [] | [StreamingCallbackHttpResponse]
  >,
  'list' : ActorMethod<
    [{}],
    Array<
      {
        'key' : Key,
        'encodings' : Array<
          {
            'modified' : Time,
            'sha256' : [] | [Uint8Array | number[]],
            'length' : bigint,
            'content_encoding' : string,
          }
        >,
        'content_type' : string,
      }
    >
  >,
  'list_authorized' : ActorMethod<[], Array<Principal>>,
  'list_permitted' : ActorMethod<[ListPermitted], Array<Principal>>,
  'revoke_permission' : ActorMethod<[RevokePermission], undefined>,
  'set_asset_content' : ActorMethod<[SetAssetContentArguments], undefined>,
  'set_asset_properties' : ActorMethod<
    [SetAssetPropertiesArguments],
    undefined
  >,
  'store' : ActorMethod<
    [
      {
        'key' : Key,
        'content' : Uint8Array | number[],
        'sha256' : [] | [Uint8Array | number[]],
        'content_type' : string,
        'content_encoding' : string,
      },
    ],
    undefined
  >,
  'take_ownership' : ActorMethod<[], undefined>,
  'unset_asset_content' : ActorMethod<[UnsetAssetContentArguments], undefined>,
<<<<<<< HEAD:src/declarations/nexai_assets/nexai_assets.did.d.ts
=======
  'validate_commit_proposed_batch' : ActorMethod<
    [CommitProposedBatchArguments],
    ValidationResult
  >,
  'validate_configure' : ActorMethod<[ConfigureArguments], ValidationResult>,
>>>>>>> 749c460 (debugging dfx v 0.14.3):src/declarations/nexai_assets/service.did.d.ts
  'validate_grant_permission' : ActorMethod<
    [GrantPermission],
    ValidationResult
  >,
  'validate_revoke_permission' : ActorMethod<
    [RevokePermission],
    ValidationResult
  >,
}
