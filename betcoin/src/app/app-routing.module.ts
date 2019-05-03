import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { CommunityComponent } from "./community/community.component";
import { DealerComponent } from "./dealer/dealer.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { WagerComponent } from "./wager/wager.component";
import { IcoComponent } from "./ico/ico.component";
import { BiddingComponent } from "./bidding/bidding.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "wager",
        component: WagerComponent
      },
      {
        path: "transaction",
        component: TransactionComponent
      },
      {
        path: "dealer",
        component: DealerComponent
      },
      {
        path: "community",
        component: CommunityComponent
      },
      {
        path: "ico",
        component: IcoComponent
      },
      {
        path: "bidding",
        component: BiddingComponent
      },
      {
        path: "settings",
        component: SettingsComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  // CommonModule

  declarations: []
})
export class AppRoutingModule {}
