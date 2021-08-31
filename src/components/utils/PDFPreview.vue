<template>
  <failure-message
    v-if="isFailed"
    :message="'Menu se nepovedlo načíst'"
  />
  <div
    v-if="!isFailed"
    class="koalunch-pdf-container"
  >
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MenuPDFInfo } from "@/api/responses/Menu";
import { PropType } from "@vue/runtime-core";
import pdfjsLib_, { PDFPageProxy } from "pdfjs-dist/webpack";
import FailureMessage from "./FailureMessage.vue";

/* eslint-disable */
const pdfjsLib = require("pdfjs-dist/webpack");
/* eslint-enable */

type PDFLibType = typeof pdfjsLib_;

export default defineComponent({
  components: {
    FailureMessage
  },

  props: {
    pdfInfo: Object as PropType<MenuPDFInfo>
  },

  data() {
    return {
      isFailed: false,
      pdfLib: pdfjsLib as PDFLibType
    };
  },
  methods: {
    /**
     * Renders the PDF page
     */
    _renderPage(canvas: HTMLCanvasElement, scale: number, page: PDFPageProxy): void {
      const viewport = page.getViewport({
        scale: scale,
      });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: canvas.getContext("2d") as CanvasRenderingContext2D,
        viewport: viewport,
      });
    },

    /**
     * Loads the PDF file either from the remote URL or from the arraybuffer itself
     */
    async _loadPdf(source: ArrayBuffer, page: number): Promise<PDFPageProxy> {
      const document = await this.pdfLib.getDocument(source).promise;
      return document.getPage(page);
    }
  },

  async mounted(): Promise<void> {
    this.isFailed = false;

    if (!this.pdfInfo) {
      return;
    }

    const corsAwareUrl = `https://cors-anywhere.herokuapp.com/${this.pdfInfo.url}`;
    const pdfSource = this.pdfInfo.content ?? corsAwareUrl;

    try {
      const page = await this._loadPdf(pdfSource, this.pdfInfo.pages[0]);

      this._renderPage(this.$refs.canvas as HTMLCanvasElement, 0.9, page);
    } catch (e) {
      this.isFailed = true;
    }
  }
});
</script>

<style scoped>
.koalunch-pdf-container {
  overflow-x: auto;
}
</style>
