# Serverless mern monorepo

STILL UNDER DEVELOPMENT

Requirement: Serverless, dynamodb-local

## setup

1. `yarn`
2. `lerna bootstrap`
3. Start dynamodb and seed `cd ./packages/tweetsService && npm run dynamodb-start && npm run dynamodb-seed`
4. `cd ./packages/tweetsService && npm run start`
5. `cd ./packages/apolloFederationGW && npm run start`
6. `cd ./packages/frontend && npm start`
7. Open `http://localhost:4000` and access tweets service throught federation GW