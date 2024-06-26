#!/bin/bash

# Switching to Minter Identity
echo -e "\n Switching identity to Minter Princicpal......"

dfx identity new minter
dfx identity use minter
MINT_ACC=$(dfx ledger account-id)
export MINT_ACC

dfx identity use default

LEDGER_ACC=$(dfx ledger account-id)
export LEDGER_ACC

ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export ARCHIVE_CONTROLLER

export TOKEN_NAME="ICP"
export TOKEN_SYMBOL="ICP"

# dfx canister uninstall-code icp_ledger

dfx deploy icp_ledger --argument "(variant {Init =record {minting_account = \"${MINT_ACC}\";
initial_values = vec { record {  \"${LEDGER_ACC}\";
record { e8s=100_000_000_000 } } } ; archive_options = opt record {num_blocks_to_archive = 1000000; trigger_threshold = 1000000; \
  controller_id = principal  \"${ARCHIVE_CONTROLLER}\"; }; send_whitelist = vec {}}})" --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai

export OWNER=$(dfx identity get-principal)

dfx deploy --network local ckbtc_ledger --argument '
  (variant {
    Init = record {
      token_name = "Local ckBTC";
      token_symbol = "LCKBTC";
      minting_account = record { owner = principal "'${OWNER}'";};
      initial_balances = vec { record { record { owner = principal "'${OWNER}'";}; 100_000_000_000; }; };
      metadata = vec {};
      transfer_fee = 10;
      archive_options = record {
        trigger_threshold = 2000;
        num_blocks_to_archive = 1000;
        controller_id = principal "'${OWNER}'";
      }
    }
  })
'

export LEDGER_PRINCIPAL=$(dfx canister --network local id ckbtc_index)

dfx deploy --network local ckbtc_ledger --argument '
  record {
   ledger_id = (principal "'${LEDGER_PRINCIPAL}'");
  }
'

dfx deploy icp_index --specified-id qhbym-qaaaa-aaaaa-aaafq-cai --argument '(record {ledger_id = principal "ryjl3-tyaaa-aaaaa-aaaba-cai"})'

dfx deploy

