import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {filter, map, scan, tap} from 'rxjs/operators';

@Injectable()
export class GameService {

  private gameScore$: BehaviorSubject<number> = new BehaviorSubject(0);
  private gameTime$: Subject<number> = new Subject();
  public gameLives$: BehaviorSubject<number> = new BehaviorSubject(3);


  constructor() {
    interval(1000/30).subscribe(this.gameTime$);
    this.getScore().pipe(
      filter((score: number) => {
        return score > 30;
      }),
      tap((score: number) => {
        this.addScore(-30 * Math.floor(score/30));
      }),
      map((score: number) => {
        return Math.floor(score / 30)
      }),
    ).subscribe(this.gameLives$)




    // ).subscribe((extraLives: number) => this.addGameLives(extraLives))
  }

  public calculateLives(score: number) {
    return Math.floor(score/30);
  }

  public addGameLives(lives: number) {
    this.gameLives$.next(lives);
  }

  public getGameLives(): Observable<number> {
    return this.gameLives$.asObservable().pipe(
      scan((firstNumber: number, secondNumber: number) => firstNumber + secondNumber)
    );
  }

  public getGameTime(): Observable<number> {
    return this.gameTime$.asObservable();
  }

  public addScore(scoreIncrement: number) {
    this.gameScore$.next(scoreIncrement);
  }

  public getScore(): Observable<number> {
    return this.gameScore$.asObservable().pipe(
      scan((firstNumber: number, secondNumber: number) => firstNumber + secondNumber)
    )
  }

}
