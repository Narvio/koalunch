<template>
  <failure-message
    v-if="isFailed"
    :message="'Menu se nepovedlo načíst'"
  />
  <div v-if="!isFailed">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { MenuPDFInfo } from "@/api/responses/Menu";
import { PropType } from "@vue/runtime-core";
import { Vue, Options } from "vue-class-component";
import pdfjsLib_, { PDFPageProxy } from "pdfjs-dist/webpack";
import FailureMessage from "./FailureMessage.vue";

/* eslint-disable */
const pdfjsLib = require("pdfjs-dist/webpack");
/* eslint-enable */

type PDFLibType = typeof pdfjsLib_;

@Options({
  components: {
    FailureMessage: FailureMessage
  },
  props: {
    pdfInfo: Object as PropType<MenuPDFInfo>,
  },
})
export default class PDFPreview extends Vue {
  isFailed = false;
  pdfInfo!: MenuPDFInfo;

  pdfLib: PDFLibType = pdfjsLib;

  async mounted(): Promise<void> {
    this.isFailed = false;

    const corsAwareUrl = `https://cors-anywhere.herokuapp.com/${this.pdfInfo.url}`;
    const pdfSource = this.pdfInfo.content ?? corsAwareUrl;

    try {
      const page = await this.loadPdf(pdfSource, this.pdfInfo.pages[0]);

      this.renderPage(this.$refs.canvas as HTMLCanvasElement, 0.75, page);
    } catch (e) {
      this.isFailed = true;
    }
  }

  private async loadPdf(source: ArrayBuffer, page: number): Promise<PDFPageProxy> {
    const document = await this.pdfLib.getDocument(source).promise;
    return document.getPage(page);
  }

  private renderPage(canvas: HTMLCanvasElement, scale: number, page: PDFPageProxy): void {
    const viewport = page.getViewport({
      scale: scale,
    });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    page.render({
      canvasContext: canvas.getContext("2d") as CanvasRenderingContext2D,
      viewport: viewport,
    });
  }
}
</script>

<style scoped>
</style>
