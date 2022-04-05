<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Quagga2 scanner</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="cam-container" ref="cameraRef"></div>
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
import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";

export default defineComponent({
  name: "Quagga2Page",
  components: { IonContent, IonPage, IonHeader, IonToolbar, IonTitle },
  data: function () {
    return {
      camera: null as HTMLDivElement | null,
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

    async onDetect(result: any) {
      console.log(result);
    },
  },
  mounted: async function () {
    this.camera = this.$refs.cameraRef as any;

    if (this.camera) {
      const constraints = {
        facingMode: "environment",
        width: 500,
        height: 320,
      };
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            constraints,
            target: this.camera,
          },
          decoder: {
            readers: ["code_128_reader", "code_39_reader"],
          },
        },
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
        }
      );

      Quagga.onDetected((result: QuaggaJSResultObject) => {
        console.log(result);
        this.codes.push(result.codeResult.code ?? "");
        this.openToast(result.codeResult.code ?? "");
      });
    }
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
  position: relative;
}

.results {
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  overflow-y: scroll;
}

.cam-container {
  position: relative;
  max-height: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
