import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Voting from "./contracts/Voting.json";


import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {winner: 'Results', total: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      
      const instance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    
  };

  castVote = async (data) => {
    const { accounts, contract } = this.state;
  
  
    // Cast a vote.
    await contract.methods.castVote(data, Date.now()).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const total = await contract.methods.numberOfVotes().call();

    // Update state with the result.
    this.setState({ total });

      };

  checkWinner = async () => {

    const {  contract } = this.state;
    // Get the total democrat votes
    const democratVotes = await contract.methods.democrat().call();

    // Get the total republican votes
    const republicanVotes = await contract.methods.republican().call();
     
    //Count votes
    if(Number(democratVotes) > Number(republicanVotes)) {
         this.setState({ winner: 'The winner is the Democratic Party with ' + democratVotes + 'votes'})
    } else {
      this.setState({ winner: 'The winner is the Rebulican Party with ' + republicanVotes + 'votes'})
    }
     if ( this.state.total > 0 &&  democratVotes  === republicanVotes) {
      this.setState({ winner: 'This voting  ended in a tie. what a tight contest !'})
    } 
    console.log(democratVotes, republicanVotes)

  }

  



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="Voting">
        <h2 style={{textAlign: 'center'}}>Voting App</h2>
          <p style={{textAlign: 'center', marginBottom: '20px'}}>Vote for your favorite party</p>
          <p style={{textAlign: 'center', marginBottom: '10px'}}>To vote more than once you will have to use a different address</p>
       <div className="section1">
                  <div className="item">
           <img src="https://media.istockphoto.com/photos/elections-picture-id528483210?b=1&k=20&m=528483210&s=170667a&w=0&h=IplGi1x3C9YE4kLSAh62EiTPjKbd83uXpUHTmb1omzk="
            style={{ width: 250, height: 250}}

           />
           <h5>Vote Republican Candidate</h5>
           <button onClick={(e) => this.castVote('republican')}>Vote +</button>
         </div>
         <div className="item">
         <img src="https://media.istockphoto.com/photos/series-of
         -usa-ruffled-flags-with-democratic-party-symbol-over-it
         -picture-id675048688?b=1&k=20&m=675048688&s=170667a&w=0&h=OZUrXHtrAuJljf5lIruhfaVUPg_RVmNrPq0Ej6mRHew="
            alt="new"
            style={{ width: 250, height: 250}}
           />
           <h5>Vote Democratic Candidate</h5>
           <button onClick={(e) => this.castVote('democrat')}>Vote +</button>
         </div>
         
       </div>
       <h4 style={{textAlign: 'center', marginTop: '30px'}}>Total Votes Cast: {this.state.total} </h4>
       <div style={{ display: 'flex', justifyContent: 'center', padding: '25px' }}>
       <button style={{textAlign: 'center', padding: '12px'}} onClick={() => this.checkWinner()}>{this.state.winner} </button>
       </div>
      
      </div>
    );
  }
}

export default App;
