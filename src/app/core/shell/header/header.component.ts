import { Title } from '@angular/platform-browser';
import {Component, AfterViewInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  @Input() sidenav: MatSidenav;

  constructor(private router: Router,
              private titleService: Title,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService) {}

  ngAfterViewInit() {
    // suppose that this data come from server side
    ['image', 'name'].forEach(key => {
      // suppose that this data come from server side
      const settings = JSON.parse( localStorage.getItem('drag_state_' + key));
      if (settings) {
        const el: HTMLElement = document.querySelector(`.${key}`);
        for ( const prop of Object.keys(settings)) {
          el.style[prop] = settings[prop];
        }
      }
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }



}
