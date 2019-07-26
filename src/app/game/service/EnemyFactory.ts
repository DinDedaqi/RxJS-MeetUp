import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {EnemyCharacterComponent} from '../enemy-character/enemy-character.component';
import {AppSettings} from '../../AppSettings';

@Injectable()
export class EnemyFactory{

  private factory: ComponentFactory<EnemyCharacterComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
    this.factory = this.resolver.resolveComponentFactory(EnemyCharacterComponent);
  }

  public createEnemy(viewContainer: ViewContainerRef, yPos: number): ComponentRef<EnemyCharacterComponent> {
    const ref: ComponentRef<EnemyCharacterComponent> = viewContainer.createComponent(this.factory);
    ref.instance.xPos = AppSettings.canvasWidth;
    ref.instance.yPos = yPos;
    return ref;
  }
}
