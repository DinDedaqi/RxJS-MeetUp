import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ICoordinates, PlayerService} from '../service/player-service';
import {BulletComponent} from '../bullet/bullet.component';
import {GameService} from '../service/game.service';
import {interval, Subject} from 'rxjs';
import {BulletFactory} from '../service/BulletFactory';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {AppSettings} from '../AppSettings';

@Component({
  selector: 'enemy-character',
  templateUrl: 'enemy-character.component.html',
  styleUrls: ['enemy-character.component.css']
})

export class EnemyCharacterComponent implements OnInit, OnDestroy, AfterViewInit {

  public playerCoordinates: ICoordinates;

  public width: number = 80;
  public height: number = 80;

  @Input('initialXPos')
  public xPos: number;

  @Input('initialYPos')
  public yPos: number;

  @Output()
  public destroy: EventEmitter<void> = new EventEmitter();

  private factory: ComponentFactory<BulletComponent>;

  @ViewChild('bullets', {read: ViewContainerRef})
  private viewContainer: ViewContainerRef;

  constructor(private playerService: PlayerService,
              private r: ComponentFactoryResolver,
              private bulletFactory: BulletFactory,
              private gameTimeService: GameService) {
    this.factory = this.r.resolveComponentFactory(BulletComponent);
  }

  checkCollision() {
    return this.playerCoordinates.xPos < this.xPos + this.width &&
      this.playerCoordinates.xPos + this.playerService.width > this.xPos &&
      this.playerCoordinates.yPos < this.yPos + this.height &&
      this.playerCoordinates.yPos + this.playerService.height > this.yPos
  }

  ngAfterViewInit() {
    this.playerService.getPositionObservable().pipe(takeUntil(this.destroy)).subscribe((coordinates: ICoordinates) => {
      this.playerCoordinates = coordinates;
    });

    this.gameTimeService.getGameTime().pipe(
      takeUntil(this.destroy),
    ).subscribe(() => {
      if (this.checkCollision()) {
        this.gameTimeService.addGameLives(-1);
        this.destroy.emit();
      } else if (this.xPos > 0) {
        this.xPos -= 5;
      } else {
        this.destroy.emit();
      }
    });

    const componentRefMap: Map<number, ComponentRef<BulletComponent>> = new Map<number, ComponentRef<BulletComponent>>();

    interval(2000).pipe(
      takeUntil(this.destroy),
      tap((index: number) => {
        componentRefMap.set(index, this.bulletFactory.createBullet(this.viewContainer, this.xPos, this.yPos, false))
      })
    ).subscribe((index: number) => {
        componentRefMap.get(index).instance.destroyEvent.subscribe(() => {
          componentRefMap.get(index).destroy();
        })
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
