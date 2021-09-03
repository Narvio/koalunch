<template>
  <Modal ref="modal">
    <div class="container">
      <img src="@/assets/pencil.png" />

      <div
        class="notification is-warning"
      >{{ $t("contact.contactMessage")}}</div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.yourName") }}</label>

        <div class="control">
          <input
            class="input"
            type="text"
            v-model="name.value"
            :class="{
              'is-danger': !name.isValid
            }"
            @change="validate('name')"
          />
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >{{ $t("contact.message") }}</label>

        <div class="control">
          <textarea
            class="textarea"
            v-model="message.value"
            :class="{
              'is-danger': !message.isValid
            }"
            @change="validate('message')"
          ></textarea>
        </div>
      </div>

      <div
        class="field is-grouped is-grouped-right"
      >
        <div class="control">
          <button
            class="button is-link"
            @click="submit"
          >{{$t("contact.submit")}}</button>
        </div>
        <div class="control">
          <button
            class="button is-link is-light"
            @click="toggle"
          >{{$t("contact.cancel")}}</button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { ActionTypes } from "@/store/action-types";
import { ContactFeedbackData } from "@/store/actions";

import Modal from "@/components/utils/Modal.vue";
import ModalMixin from "@/components/utils/ModalMixin";
import createValidatorMixin from "@/components/contact/FormValidatorMixin";

export default defineComponent({
  mixins: [
    ModalMixin,
    createValidatorMixin([
      "name",
      "message"
    ])
  ],
  components: {
    Modal
  },
  data() {
    return {
      name: {
        value: "",
        isValid: true,
        isRequired: true
      },
      message: {
        value: "",
        isValid: true,
        isRequired: true
      }
    };
  },
  methods: {
    ...mapActions([
      ActionTypes.SendContactFeedback
    ]),

    async submit(): Promise<void> {
      if (!this.validate()) {
        return;
      }

      try {
        this.setBusy(true);

        await this[ActionTypes.SendContactFeedback]({
          name: this.name.value,
          note: this.message.value
        } as ContactFeedbackData);
      } finally {
        this.setBusy(false);
        this.resetFields();
        this.toggle();
      }
    }
  }
});

</script>

<style scoped>
.container {
  background-color: white;
  padding: 2rem;
}

.field {
  text-align: initial;
}

img {
  width: auto;
  height: 8rem;
}
</style>
