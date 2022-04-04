<template>
  <ion-page>
    <ion-content :fullscreen="true">
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
import { IonPage, IonContent, toastController } from "@ionic/vue";
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
} from "@zxing/library";

const DELAY_MS = 1;

export default defineComponent({
  name: "HomePage",
  components: { IonContent, IonPage },
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
        width: 500,
        height: 320,
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
    // TRY_HARDER decreases performance, but improves recognition?
    // hints.set(DecodeHintType.TRY_HARDER, true);

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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}

.results {
  margin-top: 1rem;
  overflow-y: scroll;
}

.cam-container {
  width: 100%;
  max-height: 50%;
}

video {
  width: 100%;
  height: 100%;
}
</style>
