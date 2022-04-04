<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="container">
        <div class="cam-container">
          <video ref="cameraRef" autoplay></video>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  toastController,
} from "@ionic/vue";
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
} from "@zxing/library";

export default defineComponent({
  name: "Tab1Page",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data: function () {
    return {
      camera: null as HTMLVideoElement | null,
      reader: null as BrowserMultiFormatReader | null,
    };
  },
  methods: {
    async openToast(message: string) {
      const toast = await toastController.create({
        message,
        duration: 2000,
      });
      return toast.present();
    },
  },
  mounted: async function () {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "environment",
        width: 640,
        height: 480,
        // frameRate: 30,
      },
    });

    this.camera = this.$refs.cameraRef as any;

    if (this.camera) {
      this.camera.srcObject = stream;
    }

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.CODE_39,
    ]);

    this.reader = new BrowserMultiFormatReader(hints);

    this.reader.decodeFromVideoDevice(null, this.camera, (result) => {
      if (result) {
        console.log(result);
        this.openToast(result.toString());
      }
    });
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.cam-container {
  margin-left: auto;
  margin-right: auto;
  width: 640px;
  height: 480px;
}

video {
  width: 100%;
  height: 100%;
}
</style>
