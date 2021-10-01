## Explainable Agents Functions

By [Débora Cristina Engelmann](https://github.com/DeboraEngelmann).



## Download database

```
$ gcloud config set project explainable-agent
$ gcloud firestore export gs://explainable-agent.appspot.com/firestore-explainable-agent
$ cd functions
$ gsutil -m cp -r gs://explainable-agent.appspot.com/firestore-explainable-agent . 
```

## Build

Run `npm run build` to build the project. Always before run locally or deploy.

## Development server

Run `firebase emulators:start --import ./firestore-explainable-agent` for a dev server with database. 
Run `firebase emulators:start --only functions` for a dev server without database.

## Deploy functions

Run `firebase deploy --only functions` to deploy the project.
