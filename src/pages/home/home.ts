import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }

  loadItems() {
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("removing item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removed the item - ' + index + ' successfully!',
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  shareItem(item, index) {
    console.log("Sharing item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing item - ' + index + ' successfully!',
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.Name + " - Quantity " + item.Quantity;
    let subject = "Shared via Groceries App";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("shared successfully!");
    }).catch((error) => {
      // Sharing via email is not possible
      console.error("Error while sharing ", error);
    });

  }

  editItem(item, index) {
    console.log("edit item - ", item, index);

    const toast = this.toastCtrl.create({
      message: 'editing item - ' + index + ' successfully!',
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  addItem() {
    console.log("Adding Item")
    this.inputDialogService.showPrompt();
  }

}

