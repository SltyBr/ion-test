import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonToggle,
  IonIcon,
  IonLabel,
} from '@ionic/angular';
import { Theme } from '../services/theme';
import { addIcons } from 'ionicons';
import { moonOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToggle,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
  ],
})
export class Tab3Page {
  theme = inject(Theme);

  constructor() {
    addIcons({ moonOutline });
  }

  themeToggle(event: Event) {
    console.log(event);
  }
}
