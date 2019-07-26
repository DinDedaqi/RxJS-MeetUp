import {Route, RouterModule} from '@angular/router';
import {GameComponent} from './game/game.component';
import {VictoryScreenComponent} from './win/victory-screen.component';
import {LossScreenComponent} from './loss/loss-screen.component';
import {NgModule} from '@angular/core';

const routes: Route[] = [
  {
    path: "",
    component: GameComponent,
    pathMatch: "full"
  },
  {
    path: "win",
    component: VictoryScreenComponent,
    pathMatch: "full"
  },
  {
    path: "lose",
    component: LossScreenComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
