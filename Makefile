pull-submodule:
	 git submodule update --init
## Ensure you have already started the dfx environment, and also deployed internet identity 
deploy-vdb:
	cd src/vector-database-icp && cargo update && dfx deploy

## After deploying, copy the vector databse canisterId and paste it i nexai canister

deploy:
	dfx deploy


##check for upstream changes in submodule
update:
	git submodule update --remote