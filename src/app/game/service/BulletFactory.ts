import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {BulletComponent} from '../bullet/bullet.component';

@Injectable()
export class BulletFactory {

  private factory: ComponentFactory<BulletComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
    this.factory = this.resolver.resolveComponentFactory(BulletComponent);
  }

  public createBullet(viewContainer: ViewContainerRef, xPos: number, yPos: number, fromPlayer: boolean) {
    const ref: ComponentRef<BulletComponent> = viewContainer.createComponent(this.factory);
    ref.instance.xPos = xPos;
    ref.instance.yPos = yPos;
    ref.instance.fromPlayer = false;
    return ref;
  }
}
