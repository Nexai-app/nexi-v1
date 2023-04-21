# Nexai

Nexai is the first fully decentralized, autonomous, and integratable chatbot and assistant that runs on blockchain and artificial intelligence. The main goal of Nexai is to provide a personalized user experience and assist with various tasks on different platforms, from e-commerce to social media.

## Stage

Currently, the Nexai project has completed the frontend of the app, which was written in JavaScript (React). The frontend includes the landing page, sign up, sign in, dashboard, and a few other pages. We are actively developing the backend and working on integrating the chatbot into various platforms.

The Nexai project currently has five contributors: Dunsin, Ope, AJ, Bello, and myself. We are constantly seeking new contributors who are interested in joining our project and helping us bring our vision to life.

We welcome any feedback, suggestions, or questions about Nexai and are excited to continue working on this innovative project.

## Contributors

- Abisuwa Dunsin: [Dunsin-cyber](https://github.com/Dunsin-cyber) (Developer)
- Dare Onaopemipo: (Designer)
- Akinade Anjola: [Anjyfade](https://github.com/anjyfade1) (Developer)
- Bello Hadi: [Bello](https://github.com/Bello2609) (Developer)
- Olatokunbo David: [dvdslab](https://github.com/dvdslab) (Developer)

## Other Information

Please feel free to reach out to any of the contributors for more information about Nexai. 

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).


To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with nexai, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd nexai/
dfx help
dfx config --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

Additionally, if you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 8000.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`NODE_ENV` to `production` if you are using Webpack
- use your own preferred method to replace `process.env.NODE_ENV` in the autogenerated declarations
- Write your own `createActor` constructor
