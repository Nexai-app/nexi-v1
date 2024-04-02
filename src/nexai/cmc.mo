// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type AccountIdentifier = Text;
  public type BlockIndex = Nat64;
  public type CanisterSettings = {
    controller : ?Principal;
    freezing_threshold : ?Nat;
    controllers : ?[Principal];
    reserved_cycles_limit : ?Nat;
    memory_allocation : ?Nat;
    compute_allocation : ?Nat;
  };
  public type CreateCanisterArg = {
    subnet_selection : ?SubnetSelection;
    settings : ?CanisterSettings;
    subnet_type : ?Text;
  };
  public type CreateCanisterError = {
    #Refunded : { create_error : Text; refund_amount : Nat };
    #RefundFailed : { create_error : Text; refund_error : Text };
  };
  public type CreateCanisterResult = {
    #Ok : Principal;
    #Err : CreateCanisterError;
  };
  public type Cycles = Nat;
  public type CyclesCanisterInitPayload = {
    exchange_rate_canister : ?ExchangeRateCanister;
    cycles_ledger_canister_id : ?Principal;
    last_purged_notification : ?Nat64;
    governance_canister_id : ?Principal;
    minting_account_id : ?AccountIdentifier;
    ledger_canister_id : ?Principal;
  };
  public type ExchangeRateCanister = { #Set : Principal; #Unset };
  public type IcpXdrConversionRate = {
    xdr_permyriad_per_icp : Nat64;
    timestamp_seconds : Nat64;
  };
  public type IcpXdrConversionRateResponse = {
    certificate : Blob;
    data : IcpXdrConversionRate;
    hash_tree : Blob;
  };
  public type Memo = ?Blob;
  public type NotifyCreateCanisterArg = {
    controller : Principal;
    block_index : BlockIndex;
    subnet_selection : ?SubnetSelection;
    settings : ?CanisterSettings;
    subnet_type : ?Text;
  };
  public type NotifyCreateCanisterResult = {
    #Ok : Principal;
    #Err : NotifyError;
  };
  public type NotifyError = {
    #Refunded : { block_index : ?BlockIndex; reason : Text };
    #InvalidTransaction : Text;
    #Other : { error_message : Text; error_code : Nat64 };
    #Processing;
    #TransactionTooOld : BlockIndex;
  };
  public type NotifyMintCyclesArg = {
    block_index : BlockIndex;
    deposit_memo : Memo;
    to_subaccount : Subaccount;
  };
  public type NotifyMintCyclesResult = {
    #Ok : NotifyMintCyclesSuccess;
    #Err : NotifyError;
  };
  public type NotifyMintCyclesSuccess = {
    balance : Nat;
    block_index : Nat;
    minted : Nat;
  };
  public type NotifyTopUpArg = {
    block_index : BlockIndex;
    canister_id : Principal;
  };
  public type NotifyTopUpResult = { #Ok : Cycles; #Err : NotifyError };
  public type PrincipalsAuthorizedToCreateCanistersToSubnetsResponse = {
    data : [(Principal, [Principal])];
  };
  public type Subaccount = ?Blob;
  public type SubnetFilter = { subnet_type : ?Text };
  public type SubnetSelection = {
    #Filter : SubnetFilter;
    #Subnet : { subnet : Principal };
  };
  public type SubnetTypesToSubnetsResponse = {
    data : [(Text, [Principal])];
  };
  public type Self = ?CyclesCanisterInitPayload -> async actor {
    create_canister : shared CreateCanisterArg -> async CreateCanisterResult;
    get_build_metadata : shared query () -> async Text;
    get_icp_xdr_conversion_rate : shared query () -> async IcpXdrConversionRateResponse;
    get_principals_authorized_to_create_canisters_to_subnets : shared query () -> async PrincipalsAuthorizedToCreateCanistersToSubnetsResponse;
    get_subnet_types_to_subnets : shared query () -> async SubnetTypesToSubnetsResponse;
    notify_create_canister : shared NotifyCreateCanisterArg -> async NotifyCreateCanisterResult;
    notify_mint_cycles : shared NotifyMintCyclesArg -> async NotifyMintCyclesResult;
    notify_top_up : shared NotifyTopUpArg -> async NotifyTopUpResult;
  };
};
