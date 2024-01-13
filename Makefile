build:
	dfx build nexai_llm

generate:
	scripts/generate-did.sh

redeploy:
	dfx deploy nexai_llm --mode=reinstall
	