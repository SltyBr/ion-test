import { Service, signal } from '@angular/core';
import { Note } from '../models/note';

@Service()
export class Notes {
  private readonly _notes = signal<Note[]>([
    {
      id: 1,
      title: 'Купить продукты',
      text: 'Молоко, хлеб, яйца, кофе',
      createdAt: '2026-10-18T09:15:00.000Z',
    },
    {
      id: 2,
      title: 'Идея для пет-проекта',
      text: 'Офлайн-трекер привычек на Ionic + Capacitor',
      createdAt: '2026-10-19T14:40:00.000Z',
    },
    {
      id: 3,
      title: 'Парк у набережной',
      text: 'Хорошее место для пробежки, вернуться в выходные',
      createdAt: '2026-10-20T18:05:00.000Z',
      lat: 55.7512,
      lng: 37.6184,
    },
    {
      id: 4,
      title: 'Подготовка к собеседованию',
      text: 'Lifecycle ion-router-outlet, Capacitor vs Cordova, cap sync',
      createdAt: '2026-10-21T08:00:00.000Z',
    },
  ]);

  readonly notes = this._notes.asReadonly();

  add(data: Omit<Note, 'id' | 'createdAt'>): Note {
    const note: Note = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    this._notes.update(list => [note, ...list]);
    return note;
  }

  remove(id: number): void {
    this._notes.update(list => list.filter(note => note.id !== id));
  }

  getById(id: number): Note | undefined {
    return this._notes().find(note => note.id === id);
  }
}
