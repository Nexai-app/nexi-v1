pull-submodule:
	 git submodule update --init
## Ensure you have already started the dfx environment, and also deployed internet identity 
update/deploy-vdb:
	cd src/vector-database-icp && cargo update && dfx deploy

deploy-vdb:
	cd src/vector-database-icp && dfx deploy

## After deploying, copy the vector databse canisterId and paste it i nexai canister

deploy:
	dfx deploy


##check for upstream changes in submodule
update:
	git submodule update --remote

symbolic-link:
	ln -s /Users/macbookpro/Documents/GitHub/vector-database-icp/src/declarations/vector_database_backend /Users/macbookpro/Documents/GitHub/nexi-v1/src