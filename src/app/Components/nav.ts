import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavService {
  private _open = new BehaviorSubject<boolean>(false);
  isOpen$ = this._open.asObservable();

  open()   { this._open.next(true);  document.body.style.overflow = 'hidden'; }
  close()  { this._open.next(false); document.body.style.overflow = '';       }
  toggle() { this._open.value ? this.close() : this.open(); }
}    