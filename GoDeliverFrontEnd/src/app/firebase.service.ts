import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  cart: AngularFirestoreCollection<Cart>;
  carts: Observable<Cart[]>;
  cartDoc: AngularFirestoreDocument<Cart>;

  wishlist: AngularFirestoreCollection<Cart>;
  wishlists: Observable<Cart[]>;
  wishlistDoc: AngularFirestoreDocument<Cart>;

  add: AngularFirestoreCollection<Address>;
  address: Observable<Address[]>;
  addDoc: AngularFirestoreDocument<Address>;

  profile: AngularFirestoreCollection<Profile>;
  profiles: Observable<Profile[]>;
  profileDoc: AngularFirestoreDocument<Profile>;

  idName:any;
  constructor(public fs: AngularFirestore) {
    if(JSON.parse(localStorage.getItem('uid'))!=null){
      this.idName=JSON.parse(localStorage.getItem('uid'));
      console.log(this.idName);
      }
      else {
      this.idName=JSON.parse(localStorage.getItem('currentUserEmail'));
      console.log(this.idName);
      }
    this.cart = this.fs.collection("users/" + this.idName + "/cart");
    // this.carts=this.fs.collection('cart').valueChanges();
    this.carts = this.cart.snapshotChanges().pipe(
      map(changes =>
        changes.map(a => {
          const data = a.payload.doc.data() as Cart;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    this.wishlist = this.fs.collection("users/" + this.idName + "/wishlist");
    // this.carts=this.fs.collection('cart').valueChanges();
    this.wishlists = this.wishlist.snapshotChanges().pipe(
      map(changes =>
        changes.map(a => {
          const data = a.payload.doc.data() as Cart;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    this.profile = this.fs.collection("users/" + this.idName + "/profile");
    // this.carts=this.fs.collection('cart').valueChanges();
    this.profiles = this.profile.snapshotChanges().pipe(
      map(changes =>
        changes.map(a => {
          const data = a.payload.doc.data() as Profile;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    this.add = this.fs.collection("users/" + this.idName + "/address");
    // this.carts=this.fs.collection('cart').valueChanges();
    this.address = this.add.snapshotChanges().pipe(
      map(changes =>
        changes.map(a => {
          const data = a.payload.doc.data() as Address;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getCart() {
    return this.carts;
  }

  addItem(carts: Cart) {
    this.cart.add(carts);
  }

  getUserProfile() {
    return this.profiles;
  }

  getWishlist() {
    return this.wishlists;
  }

  addItemToWishlist(wishlists: Cart) {
    this.wishlist.add(wishlists);
  }

  addAddress(address: Address) {
    this.add.add(address);
  }

  getAddress() {
    return this.address;
  }

  deleteItem(item: Cart) {
  
    this.cartDoc = this.fs.doc(`users/` + this.idName + `/cart/${item.id}`);
    this.cartDoc.delete();
  }

  removeFromWishlist(item: Cart) {

    this.cartDoc = this.fs.doc(`users/` + this.idName + `/wishlist/${item.id}`);
    this.cartDoc.delete();
  }

  deleteAdd(item: Address) {
    this.cartDoc = this.fs.doc(`users/` + this.idName + `/address/${item.id}`);
    this.cartDoc.delete();
  }

  updateItem(item: Cart) {
    this.cartDoc = this.fs.doc(`users/` + this.idName + `/cart/${item.id}`);
    this.cartDoc.update(item);
  }

  updateUserProfile(profile: Profile) {
    this.cartDoc = this.fs.doc(`users/` + this.idName + `/profile/${profile.id}`);
    this.cartDoc.update(profile);
  }
 
}

export interface Cart {
  bookISBN_10?: string;
  title?: string;
  cost?: number;
  genre?: string;
  poster?: string;
  id?: string;
  quantity?: number;
  totalPrice?: number;
  volume?: number;
  totalVolume?: number;
}

export interface Address {
  address?: string;
  name?: string;
  email?: string;
  phone?: string;
  id?: string;
  city?: string;
  addLat?: string;
  addLng?: string;
}

export interface Profile {
  mobile: string;
  gender: string;
  email: string;
  id?: string;
}

export interface Wishlist {
  bookISBN_10?: string;
  title?: string;
  cost?: number;
  genre?: string;
  poster?: string;
  id?: string;
  quantity?: number;
  totalPrice?: number;
  author?: string;
  publisher?: string;
  volume?: number;
}
