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
"nexai" : {
    "type" : "custom",
    "candid" : "https://github.com/Nexai-app/nexi-v1/releases/download/latest/external.did",
    "wasm" : "https://github.com/Nexai-app/nexi-v1/releases/download/latest/external.wasm",
    "remote" : {
        "id" : {
            "ic" : "CANISTER_ID HERE"
        }
    }
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


  "nexai" : {
    "type" : "custom",
    "candid" : "https://github.com/Nexai-app/nexi-v1/releases/download/latest/external.did",
    "wasm" : "https://github.com/Nexai-app/nexi-v1/releases/download/latest/external.wasm",
    "remote" : {
        "id" : {
            "ic" : "CANISTER_ID HERE"
        }
    }
  }
 },
}
```

Step 4: Save and Close dfx.json
Save the changes to the dfx.json file and close your code editor.

Step 5: Build and Deploy
To apply the changes, build and deploy your canister project using the DFX CLI. Run the following commands in your terminal:

```
dfx build nexai
```

```
dfx deploy nexai
```
