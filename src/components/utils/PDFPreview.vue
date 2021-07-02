<template>
  <div v-if="isFailed" class="koalunch-failure">
    <p class="koalunch-failure-text">Menu se nepovedlo načíst</p>
    <img src="../../assets/wrong.png" class="koalunch-failure-image" />
  </div>
  <div v-if="!isFailed">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { MenuPDFInfo } from "@/api/responses/Menu";
import { PropType } from "@vue/runtime-core";
import { Vue, Options } from "vue-class-component";
import pdfjsLib_, { PDFPageProxy } from "pdfjs-dist/webpack";

/* eslint-disable */
const pdfjsLib = require("pdfjs-dist/webpack");
/* eslint-enable */

type PDFLibType = typeof pdfjsLib_;

@Options({
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

  private async loadPdf(
    source: ArrayBuffer,
    page: number
  ): Promise<PDFPageProxy> {
    const document = await this.pdfLib.getDocument(source).promise;
    return document.getPage(page);
  }

  private renderPage(
    canvas: HTMLCanvasElement,
    scale: number,
    page: PDFPageProxy
  ): void {
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
.koalunch-failure-text {
  font-size: 1.5rem;
  height: 2rem;
}
.koalunch-failure {
  width: 100%;
  height: 100%;
}
.koalunch-failure-image {
  height: 75%;
  width: auto;
  object-fit: contain;
}
</style>
