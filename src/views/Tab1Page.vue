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
        <div class="results">
          <div v-for="code in codes" :key="code">
            {{ code }}
          </div>
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

const DELAY_MS = 1;

export default defineComponent({
  name: "Tab1Page",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data: function () {
    return {
      camera: null as HTMLVideoElement | null,
      reader: null as BrowserMultiFormatReader | null,
      codes: [] as string[],
    };
  },
  methods: {
    async openToast(message: string) {
      const toast = await toastController.create({
        message,
        duration: 1000,
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
      BarcodeFormat.CODE_128,
    ]);
    hints.set(DecodeHintType.TRY_HARDER, true);

    this.reader = new BrowserMultiFormatReader(hints, DELAY_MS);
    this.reader.decodeFromVideoDevice(null, this.camera, (result, err) => {
      if (result) {
        console.log(result);
        this.openToast(result.toString());
        this.codes.push(result.toString());
      }

      if (err && err.getKind() !== "NotFoundException") {
        console.error(err.getKind());
        this.openToast(err.getKind());
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
  flex-direction: column;
}

.results {
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 640px;
  height: 640px;
  overflow-y: scroll;
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
