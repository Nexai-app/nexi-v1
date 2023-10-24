Step 1 : Locate your dfx.json File
The dfx.json file is located in the root directory of your Internet Computer project. Navigate to your project directory using your terminal.

code:
cd /path/to/your/project

Step 2: Open dfx.json in an Editor
pen the 'dfx.json' file in your preferred code editor. You will be adding configuration code to this file to enable communication with your canister.

Step 3: Add Nexai Canister Configuration
In the dfx.json file, add a "canisters" section if it doesn't already exist. This section defines the configuration for your canister

```
{
  "canisters": {
    "your_canister_name": {
      "main": "src/main.mo",
      "type": "motoko",
      "module": "your_canister_module"
    },
      // ... nexai configuration ...
  }

}
```

```
  "external" : {
      "type": "pull",
      "id" : "ouyx4-nyaaa-aaaag-qclkq-cai"
    },

    "nexai" : {
      "type": "pull",
      "id" : "aol7b-vqaaa-aaaak-aepsq-cai"
    },

    "vdb" : {
      "type" : "pull",
      "id" : "fnnlb-hqaaa-aaaao-a2igq-cai"
    }
```

```
{
  "canisters": {
    "your_canister_name": {
      "main": "src/main.mo",
      "type": "motoko",
      "module": "your_canister_module"
    },

    "external" : {
      "type": "pull",
      "id" : "ouyx4-nyaaa-aaaag-qclkq-cai"
    },

    "nexai" : {
      "type": "pull",
      "id" : "aol7b-vqaaa-aaaak-aepsq-cai"
    },

    "vdb" : {
      "type" : "pull",
      "id" : "fnnlb-hqaaa-aaaao-a2igq-cai"
    }
  }
},

  
  "

```

Step 4: Save and Close dfx.json
Save the changes to the dfx.json file.

Step 5: Build and Deploy
To apply the changes, build and deploy your canister project using the DFX CLI. Run the following commands in your terminal:

```
dfx deps pull
```

```
dfx deps init
```

```
dfx deps deploy
```

