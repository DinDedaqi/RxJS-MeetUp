import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable()
export class PlayerService {

  public width = 80;
  public height = 80;

  private playerCoordinates: ICoordinates = {
    xPos: 0,
    yPos: 0
  };

  private playerPositions$: ReplaySubject<ICoordinates> = new ReplaySubject(1);

  public setXPos(position: number): void {
    const newCoordinates: ICoordinates = {
      xPos: position,
      yPos: this.playerCoordinates.yPos,
    };
    this.playerPositions$.next(newCoordinates);
  }

  public setYPos(position: number): void {
    const newCoordinates: ICoordinates = {
      xPos: this.playerCoordinates.xPos,
      yPos: position,
    };
    this.playerPositions$.next(newCoordinates);
  }

  public addXPos(increment: number): void {
    this.setXPos(this.playerCoordinates.xPos + increment);
  }

  public addYPos(increment: number): void {
    this.setYPos(this.playerCoordinates.yPos + increment);
  }

  public setCoordinates(xPos: number, yPos: number) {
    const newCoordinates: ICoordinates = {
      xPos: xPos,
      yPos: yPos
    };
    this.playerPositions$.next(newCoordinates);
  }

  public addCoordinates(xIncrement: number, yIncrement: number) {
    this.addXPos(xIncrement);
    this.addYPos(yIncrement);
  }

  constructor() {
    this.getPositionObservable().subscribe((coordinates: ICoordinates) => this.playerCoordinates = coordinates);
  }

  public getPositionObservable(): Observable<ICoordinates> {
    return this.playerPositions$;
  }
}

export interface ICoordinates {
  xPos: number;
  yPos: number;
}
