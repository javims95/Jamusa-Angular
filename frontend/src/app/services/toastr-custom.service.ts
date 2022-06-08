import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastrCustomService {

  constructor(private toastrSvc: ToastrService) { }

  toastr(type: string, msg: string, title?: string) {
    switch (type) {
      case 'success':
        return this.toastrSvc.success(msg, title);
        break;
      case 'error':
        return this.toastrSvc.error(msg, title);
        break;
      case 'warning':
        return this.toastrSvc.warning(msg, title);
        break;
      case 'info':
        return this.toastrSvc.info(msg, title);
        break;
      default:
        return 0;
    }
  }
}
