import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {from, fromEvent, interval} from 'rxjs';
import {filter, repeat, switchMap, takeUntil, tap} from 'rxjs/operators';
import {PlayerService} from './service/player-service';
import {EnemyFactory} from './service/EnemyFactory';
import {AppSettings} from './AppSettings';
import {GameService} from './service/game.service';
import {EnemyCharacterComponent} from './enemy-character/enemy-character.component';
import index from '@angular/cli/lib/cli';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-meetup';

  @ViewChild('enemies', {read: ViewContainerRef})
  private viewContainer: ViewContainerRef;

  constructor(private playerService: PlayerService,
              private enemyFactory: EnemyFactory,
              private gameService: GameService) {
  }

  public canvasWidth = AppSettings.canvasWidth;
  public canvasHeight = AppSettings.canvasHeight;

  public score: number;
  public lives: number;
  public playerYPos = this.canvasHeight / 2;
  public playerXPos = 0;

  ngOnInit() {

    this.gameService.getGameLives().subscribe((lives: number) => {
      // console.log(this.lives)
      this.lives = lives;
    });

    this.gameService.getScore().subscribe((score: number) => {
      this.score = score;
    });

    // interval(3000).subscribe(() => {
    //   this.enemyFactory.createEnemy(this.viewContainer, Math.floor(Math.random() * Math.floor(AppSettings.canvasHeight)));
    // });


    // interval(3000).pipe(
    //   tap((index: number) => {
    //     componentRef.set(index, this.enemyFactory.createEnemy(this.viewContainer, Math.floor(Math.random() * Math.floor(AppSettings.canvasHeight))));
    //   })
    // )

    const componentRef: Map<number, ComponentRef<EnemyCharacterComponent>> = new Map<number, ComponentRef<EnemyCharacterComponent>>();

    interval(3000).pipe(
      tap((index: number) => {
        componentRef.set(index, this.enemyFactory.createEnemy(this.viewContainer, Math.floor(Math.random() * Math.floor(AppSettings.canvasHeight))));
      })
      // switchMap((index: number) => {
      //   return componentRef.get(index).instance.destroy
      // })).subscribe(() => {
    ).subscribe((index: number) => {
        componentRef.get(index).instance.destroy.subscribe(() => componentRef.get(index).destroy());
    });

    // let component: ComponentRef<EnemyCharacterComponent> = this.enemyFactory.createEnemy(this.viewContainer, Math.floor(Math.random() * Math.floor(AppSettings.canvasHeight)));

    // component.instance.destroy.subscribe(() => {
    //   console.log("wasa");
    // })

    fromEvent(document, 'keydown')
      .pipe(
        // filter((input: KeyboardEvent) => input.key === 'ArrowDown' || input.key === 'ArrowUp' || input.key === 'ArrowLeft' || input.key === 'ArrowRight'),
        takeUntil(fromEvent(document, 'keyup')),
        repeat()
      )
      .subscribe((input: KeyboardEvent) => {
        if (input.key === 'ArrowDown') {
          this.playerService.addYPos(10);
        }

        if (input.key === 'ArrowUp') {
          this.playerService.addYPos(-10);
        }

        if (input.key === 'ArrowLeft') {
          this.playerService.addXPos(-10);
        }

        if (input.key === 'ArrowRight') {
          this.playerService.addXPos(10)
        }

      });
  }

}
