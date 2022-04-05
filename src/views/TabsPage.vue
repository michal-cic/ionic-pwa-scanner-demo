<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="zxing" href="/tabs/zxing">
            <ion-icon :icon="scan"></ion-icon>
            <ion-label>Zxing</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="quagga2" href="/tabs/quagga2">
            <ion-icon :icon="scan"></ion-icon>
            <ion-label>Quagga2</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="zbar-wasm" href="/tabs/zbar-wasm">
            <ion-icon :icon="scan"></ion-icon>
            <ion-label>Zbar WASM</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
} from "@ionic/vue";
import { scan } from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonContent,
    IonIcon,
    IonLabel,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonRouterOutlet,
  },
  setup() {
    return {
      scan,
    };
  },
});
</script>

<style></style>
