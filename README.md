## Getting Started

This application displays the most recent blocks of the EOSIO blockchain.
An instance of it is currently hosted here: https://ironcamel.github.io/eos-browser

To run this application locally, first install the dependencies:

    npm install

You will only need to do that once. Then run:

    npm start

Then open http://localhost:3000 to view it in your browser.

To run the tests:

    npm test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

* The most recent blocks of the blockchain are displayed on page load. 

* Clicking on the actions link in a given block will display a detailed view of
all the actions for that block.

* If an action has a contract, it will be rendered via markdown and displayed.

* Clicking the load button will refresh the list with the latest blocks.

* The number of blocks displayed can be changed by selecting a different value
from the dropdown in the upper right.
