import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PlayerCharacterComponent} from './player-character/player-character.component';
import {BulletComponent} from './bullet/bullet.component';
import {PlayerService} from './service/player-service';
import {EnemyCharacterComponent} from './enemy-character/enemy-character.component';
import {GameService} from './service/game.service';
import {BulletFactory} from './service/BulletFactory';
import {EnemyFactory} from './service/EnemyFactory';
import {EnemyService} from './service/EnemyService';

@NgModule({
  declarations: [
    AppComponent,
    PlayerCharacterComponent,
    BulletComponent,
    EnemyCharacterComponent
  ],
  imports: [
    BrowserModule
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
