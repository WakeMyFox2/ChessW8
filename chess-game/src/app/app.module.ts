import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; // Example additional module

import { AppComponent } from './app.component';
import { MintNftComponent } from './mint-nft/mint-nft.component';
import { BlockchainService } from './blockchain.service';

@NgModule({
  declarations: [
    AppComponent,
    MintNftComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule // Example additional module
  ],
  providers: [BlockchainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
