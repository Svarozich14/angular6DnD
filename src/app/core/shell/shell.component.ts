import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  private dragItem: HTMLElement;
  private evOffsetX: number;
  private evOffsetY: number;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private media: ObservableMedia) { }

  @HostListener('drop', ['$event']) public onDrop(ev: DragEvent) {
    this.dragItem.style.position = 'fixed';
     this.dragItem.style.left = (ev.clientX - this.evOffsetX) * 100 / ev.view.innerWidth + '%';
     this.dragItem.style.top = (ev.clientY - this.evOffsetY) * 100 / ev.view.innerHeight + '%';
    // suppose that this data go to server DB
    const key = this.dragItem.classList.contains('name') ? 'name' : 'image';
    localStorage.setItem('drag_state_' + key,
      JSON.stringify({
        left: this.dragItem.style.left,
        top: this.dragItem.style.top,
        position: 'fixed'
      }));
  }

  @HostListener('dragover', ['$event']) public dragover(ev: DragEvent) {
    //   console.log('dragover5');
    ev.preventDefault();
    ev.stopPropagation();
    return false;
  }

  @HostListener('dragstart', ['$event']) dragStart(ev: DragEvent) {
    //   console.log('drag start');
    this.dragItem = <HTMLElement>ev.target;
    this.evOffsetX = <number>ev.offsetX;
    this.evOffsetY = <number>ev.offsetY;
  }

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media.asObservable()
      .pipe(filter((change: MediaChange) => (change.mqAlias !== 'xs' && change.mqAlias !== 'sm')))
      .subscribe(() => this.sidenav.close());
  }

}
