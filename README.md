**ToGold**

The goal of this project is to explore the idea of building a decentralized tokenised gold marketplace. 
The project makes uses of - 

1. Okto Orchestration Layer for seamless onboarding of users
2. Solana Blockchain for on-chain interations
3. Solana Token Extensions - specifically the Permanent Delegate capability
4. Tried to use the Exa Protocol for decentralized storage and hosting of static site elements

The backend layer could potentially eventually some integration with existing Web2 APIs of a Gold Vault provider which will then eventually interact with the onchain capabilities to build a 
corresponding tokenised equivalent of the physical gold which a user purchases. 
User will then have the option to trade the gold in both physical and tokenised format and the Token Extensions make sure that both are in sync at all times. 

Here is how the high level flow works - 

1. User signs up to the platform through his google account -> made possible thanks to the integration with Okto
2. User sees the options to Buy gold which will be stored physically in a vault and then a tokenised equivalent of it is created on chain and is sent to the user's wallet
3. User will then be able to trade this gold in the marketplace
4. If the user decides to sell of the physical gold from the Vault at any point in time, the corresponding tokenised gold equivalents will be burnt by the contract without relying on user's signature, this is made possible due to the integration with Token Extensions in Solana


Current State - 
At the current moment, the DAPP can be run locally as follows - 

1. Generate the OKTO API key and Google OAuth API keys
2. Replace with the corresponding variables in the Api.js and Index.js files in the frontend folder
3. Then do the npm run build and npm start
4. This should run the front end component on your local machine
5. We couldn't host of version of it in time due to the challenges with Okta & Solana integraton at the RPC level
6. Also, couldn't make the Exa Protocol link to serve the static pages due to some challenges which couldn't be resolved in time.

I would love to build further on this project in the coming weeks. 

Here are some screenshots from the project - 

<img width="1054" alt="image" src="https://github.com/user-attachments/assets/a55dc925-f8c7-46c4-bfd9-d8ed5fdb0c46">

<img width="1790" alt="image" src="https://github.com/user-attachments/assets/715d9333-0547-4b9a-8795-f2d63458d0bb">

<img width="1507" alt="image" src="https://github.com/user-attachments/assets/a52c7637-8b4a-49dd-8a03-cb35f3d18afb">

<img width="1792" alt="image" src="https://github.com/user-attachments/assets/1466b645-8384-40b5-bf72-6b51d37dd147">

<img width="1791" alt="image" src="https://github.com/user-attachments/assets/84675f1f-b5ef-4d25-b604-d6360d7b0dd7">

Would love to discuss more, if you have any further questions / comments. 

Thanks for your time!! 

