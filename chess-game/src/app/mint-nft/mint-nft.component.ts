import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../blockchain.service';

@Component({
  selector: 'app-mint-nft',
  templateUrl: './mint-nft.component.html',
  styleUrls: ['./mint-nft.component.scss']
})
export class MintNftComponent implements OnInit {
  account: string | undefined;

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit(): void {
    this.blockchainService.getAccountObservable().subscribe(account => {
      this.account = account;
    });
  }

  mint() {
    if (this.account) {
      this.blockchainService.mintNFT(this.account);
    }
  }
}
