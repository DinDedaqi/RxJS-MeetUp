import {Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ICoordinates, PlayerService} from '../service/player-service';
import {fromEvent} from 'rxjs';
import {filter, repeat, takeUntil, tap, throttleTime} from 'rxjs/operators';
import {BulletFactory} from '../service/BulletFactory';
import {BulletComponent} from '../bullet/bullet.component';

@Component({
  selector: 'player-character',
  templateUrl: './player-character.component.html',
  styleUrls: ['./player-character.component.css']
})
export class PlayerCharacterComponent implements OnInit {

  public width: number;
  public height: number;

  @Input('initialYPos')
  public yPos: number;

  @Input('initialXPos')
  public xPos: number;

  @ViewChild('bullets', {read: ViewContainerRef})
  private viewContainer: ViewContainerRef;


  constructor(private playerService: PlayerService,
              private bulletFactory: BulletFactory) {
  }

  ngOnInit() {
    const componentRef: Map<number, ComponentRef<BulletComponent>> = new Map<number, ComponentRef<BulletComponent>>();

    fromEvent(document, 'keydown').pipe(
      filter((event: KeyboardEvent) => event.key === ' '),
      // nuk funksionon
      throttleTime(1000),
      takeUntil(fromEvent(document, 'keyup')),
      repeat(),
      tap((index: number) => {
        componentRef.set(index, this.bulletFactory.createBullet(this.viewContainer, 0, this.yPos, true));
      })
    ).subscribe((index: number) => {
      componentRef.get(index).instance.destroyEvent.subscribe(() => {
        componentRef.get(index).destroy();
      });
    });

    this.width = this.playerService.width;
    this.height = this.playerService.height;

    this.playerService.setCoordinates(0, this.yPos);
    this.playerService.getPositionObservable().subscribe((coordinates: ICoordinates) => {
      this.yPos = coordinates.yPos;
      this.xPos = coordinates.xPos;
    });
  }

}
