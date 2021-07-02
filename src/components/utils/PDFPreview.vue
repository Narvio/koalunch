<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { MenuPDFInfo } from "@/api/responses/Menu";
import { PropType } from "@vue/runtime-core";
import { Vue, Options } from "vue-class-component";

/* eslint-disable */
let x = { a: 42 };

let y = x?.a;
const pdfjsLib = require("pdfjs-dist/webpack");
/* eslint-enable */

@Options({
  props: {
    pdfInfo: Object as PropType<MenuPDFInfo>,
  },
})
export default class PDFPreview extends Vue {
  pdfInfo!: MenuPDFInfo;

  /* eslint-disable */
  pdfLib = pdfjsLib;

  async mounted(): Promise<void> {
    const corsAwareUrl = `https://cors-anywhere.herokuapp.com/${this.pdfInfo.url}`;
    const pdfSource = this.pdfInfo.content ?? corsAwareUrl;

    let page = await this.loadPdf(pdfSource, this.pdfInfo.pages[0]);

    this.renderPage(this.$refs.canvas as HTMLCanvasElement, 0.75, page);
  }

  private async loadPdf(source: any, page: number): Promise<any> {
    let document = await this.pdfLib.getDocument(source).promise;
    return await document.getPage(page);
  }

  private renderPage(
    canvas: HTMLCanvasElement,
    scale: number,
    page: any
  ): void {
    debugger;
    let viewport = page.getViewport({
      scale: scale,
    });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: viewport,
    });
  }
}
</script>

<style scoped>
.koalunch-busyIndicator {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  text-align: center;
  justify-content: center;
}
</style>
