import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HostCartInfo } from '../model/models';
import { first, map } from 'rxjs/operators';

@Injectable()
export class ItemsService {
  constructor(private firestore: AngularFirestore) {}

  getItemList() {
    return this.firestore
      .collection('items')

      .snapshotChanges()
      .pipe(
        map((snaps) =>
          snaps.map((snap: any) => {
            console.log(snap.payload.doc.id);
            console.log(snap.payload.doc.data());
            return {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data(),
            };
          })
        ),
        first()
      );
  }
 

  get(cartId:string) {
   
    return  this.firestore
    .collection('items').doc(cartId).snapshotChanges();
  }
}
