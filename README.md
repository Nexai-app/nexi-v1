#### our other repositories powering Nexai
- [Vector-database](https://github.com/Nexai-app/vector-database-icp/tree/noperm) . The vector database stores questions as vectors and groups similar questions closely together in a multi-dimensional space. It searches for similar questions to provide context-aware responses. Questions are stored as vectors in the database, each with a length of 384. Similar questions are placed near each other in the vector space. It also houses, the chat functions and other exposed enpoints called from the client library

- [Client library](https://github.com/Nexai-app/assistant). This is a frontend lbrabry published on [NPM](https://www.npmjs.com/package/nexai-assistant) that easily connects works on the blockchain and communicates with the vector database housing the nexai's features.

- [Test dApp that has integrated Nexai](https://github.com/Nexai-app/coin-gift). This is testing a dApp that has Nexai integrated to it.


# Content
 - About Nexai
 - How We Built It (Technical Review with Refreneces)
 - Roadmap
 - Team
 - Start up Locally
 - Stage

 
## About Nexai

Nexai is the first fully decentralized, autonomous, and integratable chatbot and assistant that runs on blockchain and artificial intelligence. The main goal of Nexai is to provide a personalized user experience and assist with various tasks on different platforms, from e-commerce to social media. Acting as an intelligent chatbot, Nexai effortlessly handles customer inquiries, offers real-time assistance, and guides users through websites.

### our super power
- Nexai boasts advanced natural language processing and machine learning capabilities, ensuring it delivers intelligent and context-aware responses to customer questions. Leveraging blockchain technology, Nexai guarantees data security, transparency, and privacy in all customer interactions.

- By harnessing the power of blockchain, Nexai eliminates the need for intermediaries and third-party entities in customer-business relationships. This ensures that all communications remain secure, tamper-proof, and efficient. Businesses can now automate repetitive tasks and provide Natural Language-based responses, customized based on each customer's past interactions and preferences.

- Nexai empowers businesses with advanced AI capabilities and granular analytics, providing unparalleled visibility into customer activities. This enables companies to deliver personalized follow-up messages and automate the entire customer engagement process.


## How we Built It
Nexai's foundation lies in a meticulously crafted vector database, meticulously designed and implemented in Rust. This database harnesses the power of fast approximate nearest neighbor search via the HNSW index, delivering instant-distance calculations. What sets it apart is its innate intelligence and adaptability, achieved through the processing of embedded vector coordinates, each spanning a length of 384. These coordinates serve as the essence of Nexai's learning capability.

The key to Nexai's intelligence is the proximity-based approach it employs. In essence, it creates a virtual landscape where questions and answers are encoded as vector matrices. This landscape allows Nexai to discern the similarity between user queries and existing knowledge, thereby providing contextually relevant and intelligent responses.

This approach shares a resemblance with industry giants like Google, renowned for leveraging vector databases for image classification, text search, and other data-intensive tasks. Nexai's vector database serves as the bedrock of its capabilities.

Now, let's dive into the components that make Nexai function seamlessly:

#### The Nexai Canister

At the core of Nexai's operation lies the Nexai Canister, a secure middleman between users and the system(vecto. It not only enhances security but also orchestrates the flow of data between the various components. It plays a dual role by serving as a database where companies can store their information and query it effectively.

#### Vector Database Canister

The vector database stores questions as vectors and groups similar questions closely together in a multi-dimensional space. It searches for similar questions to provide context-aware responses. Questions are stored as vectors in the database, each with a length of 384. Similar questions are placed near each other in the vector space.

#### From the Company's Perspective:

For companies, the Nexai journey unfolds as follows:

- Begin by registering your company, which initiates instances on both the vector and Nexai databases.
- rain your Nexai assistant by providing it with question-answer pairs, enabling it to comprehend and respond intelligently.
- Store these valuable training sets within the Motoko canister (Nexai) and as embeddings within the vector database.
- Prior to integrating Nexai into your dApp, ensure your bot's functionality meets your specific requirements.
From the User's Perspective:

For users, Nexai promises a seamless experience:

- Formulate your query or question.
- Encode you[text](https://discord.com/channels/1083965978645368893/1085701727459737670)r inquiry using an on-chain model, designed to accommodate substantial data loads with a size of 100MB.
- Submit your inquiry to the Nexai canister, crafted using the Motoko programming language. The canister handles validation and redirects as needed.
- The question is then seamlessly transmitted to the vector database for processing.
- The vector database promptly retrieves an answer, based on the proximity of vector coordinates in the personalized training space tailored to your company's unique knowledge.
- The retrieved answer undergoes further refinement through an LLM (Large Language Model), benefiting from the computational prowess of WebGPU. The result is a well-informed response that swiftly reaches your screen.

In essence, Nexai is not just an assistant; it's an innovative solution, underpinned by cutting-edge technology, designed to empower both businesses and users alike.

## Roadmap

- Milestone 1: Client Library Expansion
Objective: Develop client libraries for various frontend frameworks (e.g., Angular, Vanilla JavaScript) to facilitate seamless communication with Nexai.

- Milestone 3: Individual Canister Creation
Objective: Implement the automatic creation of an individual canister for each company upon signing up, housing all company information, data, and customer data.

- Milestone 4: Canister Funding with ckBTC and ckETH
Objective: Enable users to fund their unique canisters using various stablecoins, integrating ckBTC and ckETH for flexible funding transactions.

- Milestone 5: Enhanced Template Encryption
Objective: Revise Nexai's template to incorporate advanced encryption for securing company data during interactions with the language model.

- Milestone 6: UI/UX Enhancement
Objective: Revamp Nexai's user interface to ensure optimal clarity, simplicity, and ease of navigation for customers.

- Milestone 7: Real-Time Onchain Notifications via WebSocket
Objective: Integrate real-time on-chain notifications for companies using WebSocket on the IC blockchain, allowing for instant communication during office hours.




## Team

- Abisuwa Dunsin: [Dunsin-cyber](https://github.com/Dunsin-cyber) (Blockchain Developer/ AI Engineer)
- Olatokunbo David: [dvdslab](https://github.com/dvdslab) (Full Stack Developer)
- Dare Onaopemipo: [Horpemipor](https://github.com/Horpemipor) (Product Designer)
- Abisuwa Samuel: [Sammycoderr](https://github.com/Sammycoderr) (Blockchain Developer)
- Success Aje: [successaje](https://github.com/successaje) (Blockchain Developer)
- Akanmu Abiola : Community Manager

## Starting the Project Locally



## Stage

At present, Nexai has made substantial progress, reaching a significant milestone resembling an MVP (Minimum Viable Product). We are actively engaged in rigorous testing and refinement of the platform.

<!--We are constantly seeking new contributors who are interested in joining our project and helping us bring our vision to life.-->

We welcome any feedback, suggestions, or questions about Nexai and are excited to continue working on this innovative project.




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



### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`NODE_ENV` to `production` if you are using Webpack
- use your own preferred method to replace `process.env.NODE_ENV` in the autogenerated declarations
- Write your own `createActor` constructor
