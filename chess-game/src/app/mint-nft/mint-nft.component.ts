import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../blockchain.service';

@Component({
  selector: 'app-mint-nft',
  templateUrl: './mint-nft.component.html',
  styleUrls: ['./mint-nft.component.scss']
})
export class MintNftComponent implements OnInit {
  accounts: string[] = [];
  mintedNfts: number[] = [];

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit(): void {
    this.blockchainService.getAccountObservable().subscribe(accounts => {
      if (accounts) {
        this.accounts = accounts;
      }
    });
  }

  async mint(account: string) {
    try {
      const result = await this.blockchainService.mintNFT(account);
      if (result && result.events && result.events.Transfer && result.events.Transfer.returnValues) {
        const tokenId = result.events.Transfer.returnValues.tokenId;
        this.mintedNfts.push(tokenId);
      }
    } catch (error) {
      console.error("Minting failed", error);
    }
  }
}
