import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  constructor(private notifications: ToastrService) { }

  toastr(type: string, msg: string, title?: string) {
    switch (type) {
      case 'success':
        return this.notifications.success(msg, title);
        break;
      case 'error':
        return this.notifications.error(msg, title);
        break;
      case 'warning':
        return this.notifications.warning(msg, title);
        break;
      case 'info':
        return this.notifications.info(msg, title);
        break;
      default:
        return 0;
    }
  }
}
