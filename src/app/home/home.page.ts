import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    Camera.requestPermissions();
  }
  
  imagenParaMostrar: string = ""; // Inicializa la variable con una cadena vacía

  async getPicture() {
    const imagenTomada = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    
    if (imagenTomada) {
      this.imagenParaMostrar = imagenTomada.webPath || ''; // Asegúrate de asignar un valor válido
    }
  }

  async openImage() {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        imageSrc: this.imagenParaMostrar || '' // Asegúrate de asignar un valor válido
      }
    });
    return await modal.present();
  }
}
