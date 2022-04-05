<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Zbar WASM scanner</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="cam-container">
          <video ref="cameraRef" autoplay></video>
        </div>
        <canvas ref="canvas" />
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
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  toastController,
} from "@ionic/vue";
import { scanImageData } from "zbar.wasm";

export default defineComponent({
  name: "ZbarWasmPage",
  components: { IonContent, IonPage, IonHeader, IonToolbar, IonTitle },
  data: function () {
    return {
      camera: null as HTMLVideoElement | null,
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

    // ---Zbar.wasm implementation TODO
    // const videoTracks = stream.getVideoTracks();
    // const track = videoTracks[0];
    // const capture = new ImageCapture(track);
    // const drawImageIntoCanvas = async (imgBitmap: ImageBitmap) => {
    //   const canvas = this.$refs.canvas as HTMLCanvasElement;
    //   const ctx = canvas.getContext("2d");
    //   if (!ctx) return;
    //   ctx.drawImage(imgBitmap, 0, 0);
    //   return ctx.getImageData(0, 0, imgBitmap.width, imgBitmap.height);
    // };

    // capture
    //   .grabFrame()
    //   .then((imgBitmap) => {
    //     drawImageIntoCanvas(imgBitmap).then((imgData) => {
    //       if (!imgData) return console.error("error :D");
    //       scanImageData(imgData).then((res) => {
    //         console.log(res[0].typeName); // ZBAR_QRCODE
    //         console.log(res[0].decode()); // Hello World
    //       });
    //     });
    //   })
    //   .catch((err) => {
    //     console.error("capture.grabFrame()", err);
    //   });
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
