import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3: Web3 | undefined;
  private accounts: string[] = [];
  private contract: any;
  private accountSubject = new BehaviorSubject<string[]>([]);

  constructor() {
    this.loadWeb3();
  }

  private async loadWeb3() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.loadAccounts();
    } else if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
      this.loadAccounts();
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  private async loadAccounts() {
    if (this.web3) {
      this.accounts = await this.web3.eth.getAccounts();
      this.accountSubject.next(this.accounts);
    }
  }

  getAccountObservable() {
    return this.accountSubject.asObservable();
  }

  async loadContract(abi: any, address: string) {
    if (this.web3) {
      this.contract = new this.web3.eth.Contract(abi, address);
    }
  }

  async mintNFT(to: string) {
    if (this.contract && this.accounts.length > 0) {
      return this.contract.methods.mint(to).send({ from: this.accounts[0] });
    }
  }
}
