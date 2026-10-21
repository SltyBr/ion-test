import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonInput,
  IonTextarea,
  ModalController,
} from '@ionic/angular';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonInput,
    IonTextarea,
    ReactiveFormsModule,
  ],
})
export class NoteFormComponent {
  formBuilder = inject(FormBuilder);
  modalCtrl = inject(ModalController);

  note = this.formBuilder.group({
    title: this.formBuilder.control('', Validators.required),
    text: this.formBuilder.control(''),
  });
}
