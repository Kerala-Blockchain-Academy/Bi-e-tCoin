import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { EthcontractService } from "./ethcontract.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DealerComponent } from "./dealer/dealer.component";
import { CommunityComponent } from "./community/community.component";
import { WagerComponent } from "./wager/wager.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { HomeComponent } from "./home/home.component";
import { IcoComponent } from "./ico/ico.component";
import { BiddingComponent } from './bidding/bidding.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DealerComponent,
    CommunityComponent,
    WagerComponent,
    TransactionComponent,
    HomeComponent,
    IcoComponent,
    BiddingComponent,
    SettingsComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [EthcontractService],
  bootstrap: [AppComponent]
})
export class AppModule {}
