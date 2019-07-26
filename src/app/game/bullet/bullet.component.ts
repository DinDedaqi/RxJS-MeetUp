import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ICoordinates, PlayerService} from '../service/player-service';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {GameService} from '../service/game.service';
import {AppSettings} from '../../AppSettings';

@Component({
  selector: 'bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.css']
})
export class BulletComponent implements OnInit, OnDestroy {

  private moveLeft: boolean;

  private a: number;

  ngOnDestroy(): void {

  }

  private b: number;

  private playerCoordinates: ICoordinates;

  public height: number = 20;
  public width: number = 20;

  constructor(private playerService: PlayerService,
              private gameTimeService: GameService) {
  }

  @Input()
  public fromPlayer: boolean;

  @Input('initialXPos')
  public xPos: number;

  @Input('initialYPos')
  public yPos: number;

  @Output()
  public destroyEvent: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    if (this.xPos) {
      this.moveToPlayer();
    } else {
      this.moveFromPlayer();
    }
  }

  moveFromPlayer() {
    this.gameTimeService.getGameTime()
      .pipe(
        tap(() => {
          this.xPos += 20;
        }),
        filter(() => this.xPos >= AppSettings.canvasWidth),
        takeUntil(this.destroyEvent)
      )
      .subscribe(() => {
        this.destroyEvent.emit();
      });
  }

  moveToPlayer() {
    this.playerService.getPositionObservable().pipe(
      tap((coordinates: ICoordinates) => {
        if (!this.a) {
          this.setLineBAndA(coordinates);
        }
        this.playerCoordinates = coordinates;
      }),
      takeUntil(this.destroyEvent)
    ).subscribe();

    this.gameTimeService.getGameTime().pipe(takeUntil(this.destroyEvent)).subscribe(() => {
      this.move();
      if (this.checkCollision()) {
        this.destroyEvent.emit();
        this.gameTimeService.addGameLives(-1);
      } else if (this.checkOutOfBounds()) {
        this.destroyEvent.emit();
        this.gameTimeService.addScore(5);
      }
    });


  }

  checkOutOfBounds(): boolean {
    return this.xPos <= 0 || this.xPos >= AppSettings.canvasWidth || this.yPos <= 0 || this.yPos >= AppSettings.canvasHeight;
  }

  getYFromX(x: number) {
    return this.a * x + this.b;
  }

  setLineBAndA(coordinates: ICoordinates) {
    const x1 = coordinates.xPos;
    const y1 = coordinates.yPos;
    const x0 = this.xPos;
    const y0 = this.yPos;

    this.a = (y0 - y1) / (x0 - x1);
    this.b = y0 - this.a * x0;

    if (this.xPos > coordinates.xPos) {
      this.moveLeft = false;
    } else if (this.xPos < coordinates.xPos) {
      this.moveLeft = true;
    }

  }

  move() {
    if (this.moveLeft) {
      this.xPos += 10;
    } else {
      this.xPos -= 10;
    }
    this.yPos = this.getYFromX(this.xPos);
  }

  checkCollision() {
    return this.playerCoordinates.xPos < this.xPos + this.width &&
      this.playerCoordinates.xPos + this.playerService.width > this.xPos &&
      this.playerCoordinates.yPos < this.yPos + this.height &&
      this.playerCoordinates.yPos + this.playerService.height > this.yPos;
  }
}
