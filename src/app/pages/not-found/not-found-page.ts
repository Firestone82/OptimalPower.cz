import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';
import { LanguageLinkPipe } from '../../pipes/language-link.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Icon, TranslatePipe, LanguageLinkPipe],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export default class NotFoundPage {}
