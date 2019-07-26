import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PlayerCharacterComponent} from './game/player-character/player-character.component';
import {BulletComponent} from './game/bullet/bullet.component';
import {PlayerService} from './game/service/player-service';
import {EnemyCharacterComponent} from './game/enemy-character/enemy-character.component';
import {GameService} from './game/service/game.service';
import {BulletFactory} from './game/service/BulletFactory';
import {EnemyFactory} from './game/service/EnemyFactory';
import {EnemyService} from './game/service/EnemyService';
import {GameComponent} from './game/game.component';
import {VictoryScreenComponent} from './win/victory-screen.component';
import {LossScreenComponent} from './loss/loss-screen.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PlayerCharacterComponent,
    BulletComponent,
    EnemyCharacterComponent,
    GameComponent,
    VictoryScreenComponent,
    LossScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PlayerService,
    GameService,
    BulletFactory,
    EnemyFactory,
    EnemyService
  ],
  entryComponents: [
    BulletComponent,
    EnemyCharacterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
