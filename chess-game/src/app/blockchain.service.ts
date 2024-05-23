import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3: Web3 | undefined;
  private account: string | undefined;
  private contract: any;
  private accountSubject = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
    this.loadWeb3();
  }

  private async loadWeb3() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.loadAccount();
    } else if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
      this.loadAccount();
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  private async loadAccount() {
    if (this.web3) {
      const accounts = await this.web3.eth.getAccounts();
      this.account = accounts[0];
      this.accountSubject.next(this.account);
    }
  }

  getAccountObservable() {
    return this.accountSubject.asObservable();
  }

  // Add functions to interact with your smart contract here
  async loadContract(abi: any, address: string) {
    if (this.web3) {
      this.contract = new this.web3.eth.Contract(abi, address);
    }
  }

  async mintNFT(to: string) {
    if (this.contract && this.account) {
      return this.contract.methods.mint(to).send({ from: this.account });
    }
  }
}
