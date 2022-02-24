# Voting-Dapp
<p> This project demonstrates how voting works between two parties in government </p>
<p> It was built on the ethereum blockchain </p>

## Tools and stack Used
<ul>
  <li> solidity </li>
  <li> react </li>
  <li> truffle </li>
  <li> ganache </li>
  <li> web3.js </li>
</ul>

## Steps to run the project
<ul>
  <li> Clone or download the repo </li>
  <li> Cd into the repo  </li>
  <li> Run truffle compile. This should compile the code </li>
  <li> In truffle-config.js file the port and network has already been set to the port of ganache </li>
  <li> Run truffle migrate --compile-all --reset --network ganache . This should deploy your contract and show the details of thew deployed contract </li>
  <li> Run truffle console --network ganache. This will open the ganache console. While in the console, run Voting.address . This should show the contract address</li>
  <li> Configure metamask. Ensure that the network is ganache network. Use "http://127.0.0.1:7545" and 1337 as the chainId </li>
  <li> Import a test account from ganache into metamask</li>
  <li> Cd into the client folder and run npm install. After installation run npm start</li>
</ul>

## Features 
<p> Recording the votes with Ethereum blockchain </p> 
<p> Announcing the winner in a swift manner </p>
<p> Prevention of duplicate votes </p>
<p> Displaying of the total number of casted votes  </p>
<p> Client side app to interact with the contract using web3  </p>
