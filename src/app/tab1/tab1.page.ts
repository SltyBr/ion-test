import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  viewChild,
  ElementRef,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  RefresherCustomEvent,
  SearchbarCustomEvent,
  ViewWillEnter,
  ModalController,
  IonRouterOutlet,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Notes } from '../services/notes';
import { NoteFormComponent } from '../components/note-form/note-form.component';
import { Note } from '../models/note';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    DatePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
  ],
})
export class Tab1Page implements OnInit, ViewWillEnter {
  private notesService = inject(Notes);
  private modalCtrl = inject(ModalController);
  private routerOutlet = inject(IonRouterOutlet);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private ionFab = viewChild(IonFab, { read: ElementRef });

  search = signal('');

  filtered = computed(() => {
    const query = this.search().trim().toLowerCase();
    return this.notesService
      .notes()
      .filter((note) => note.title.toLowerCase().includes(query));
  });

  constructor() {
    addIcons({ add });
  }

  ngOnInit() {
    console.log('[Tab1] ngOnInit');
  }

  ionViewWillEnter() {
    console.log('[Tab1] ionViewWillEnter');
  }

  onSearch(event: SearchbarCustomEvent) {
    this.search.set(event.detail.value ?? '');
  }

  onRefresh(event: RefresherCustomEvent) {
    setTimeout(() => event.target.complete(), 1000);
  }

  async remove(id: number, sliding: IonItemSliding) {
    await sliding.close();
    const alert = await this.alertCtrl.create({
      header: 'Точно хотите удалить?',
      message: 'Данные пропадут',
      buttons: [
        { text: 'Отмена', role: 'cancel' },
        { text: 'Удалить', role: 'destructive' },
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'destructive') {
      this.notesService.remove(id);

      const toast = await this.toastCtrl.create({
        message: 'Заметка удалена',
        duration: 2000,
        position: 'bottom',
        positionAnchor: this.ionFab()?.nativeElement,
      });

      await toast.present();
    }
  }

  async openCreate() {
    const modal = await this.modalCtrl.create({
      component: NoteFormComponent,
      // presentingElement: document.querySelector('.ion-page') as HTMLElement,
      // presentingElement: this.routerOutlet.nativeEl,
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.8,
    });
    await modal.present();
    const { data, role } =
      await modal.onWillDismiss<Omit<Note, 'id' | 'createdAt'>>();

    if (role === 'confirm' && data) {
      this.notesService.add(data);
    }
  }
}
