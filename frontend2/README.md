# Bare-bones front end interface for token distribution

## Launching

1. Run `npm i` to install dependencies.
2. Run `node .` within the `frontend2` directory to launch the application. Alternatively, whilst in development, you can install Nodemon with `npm install -g nodemon`. Then by running `nodemon` the app will execute and relaunch if changes are made to the code.

## Interacting with the application

- `localhost:3000/drop` is the payer page. 
- `localhost:3000/get` is the receiver page. 
- If you go to the receiver page, you can interact with the page by connecting your wallet. A button will then appear to "Get BT!"
- If this is not the right wallet, you can change your wallet within Metamask and connect again.
- Clicking this will send a request to the server and add you to the list of people to receive BT.
- Going to the payer page, you will see that your wallet address that you connected on the receiver end is listed! Clicking pay will redirect you to a notice that the list has been payed. This is a work in progress as they have not been payed, but the list does clear so if you revisit the payer page, you will see that all addresses are gone.
- If you have both windows open at the same time, you can see that the payer page updates in real time!