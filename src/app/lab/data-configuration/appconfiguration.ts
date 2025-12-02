import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class appconfiguration {
  private apiUrl!: string;
  private webUrl!: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setUrls();
  }

  private setUrls(): void {
    const host = this.document.location.hostname;
    const protocol = this.document.location.protocol;

    if (host === 'localhost') {
      this.apiUrl = `https://localhost:7265/api/`;
      this.webUrl = `${protocol}//localhost:4200/`;
    } else if (host.startsWith('')) {
      this.apiUrl = ``;
      this.webUrl = ``;
    } else {
      
    }
  }
  getApiUrl(): string {
    return this.apiUrl;
  }
  getWebUrl(): string {
    return this.webUrl;
  }
}
