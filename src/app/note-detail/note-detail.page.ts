import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
  IonText,
  NavController,
  ViewWillEnter,
  ViewDidEnter,
  ViewWillLeave,
  ViewDidLeave,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { Notes } from '../services/notes';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
  imports: [
    DatePipe,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
    IonText,
  ],
})
export class NoteDetailPage
  implements
    OnInit,
    OnDestroy,
    ViewWillEnter,
    ViewDidEnter,
    ViewWillLeave,
    ViewDidLeave
{
  id = input.required<string>();
  private noteService = inject(Notes);
  private navCtrl = inject(NavController);

  note = computed(() => this.noteService.getById(+this.id()));

  constructor() {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    console.log(`[Detail ${this.id()}] ngOnInit`);
  }

  ionViewWillEnter() {
    console.log(`[Detail ${this.id()}] ionViewWillEnter`);
  }

  ionViewDidEnter() {
    console.log(`[Detail ${this.id()}] ionViewDidEnter`);
  }

  ionViewWillLeave() {
    console.log(`[Detail ${this.id()}] ionViewWillLeave`);
  }

  ionViewDidLeave() {
    console.log(`[Detail ${this.id()}] ionViewDidLeave`);
  }

  ngOnDestroy() {
    console.log(`[Detail ${this.id()}] ngOnDestroy`);
  }

  remove() {
    const note = this.note();
    if (!note) return;

    this.noteService.remove(note.id);
    this.navCtrl.navigateBack('/tabs/tab1');
  }
}
