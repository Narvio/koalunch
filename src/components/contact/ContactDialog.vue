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
            @change="_validate('name')"
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
            @change="_validate('message')"
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
import Modal from "@/components/utils/Modal.vue";
import { mapActions } from "vuex";
import { ActionTypes } from "@/store/action-types";
import { ContactFeedbackData } from "@/store/actions";

interface InputField {
  value: string;
  isValid: boolean;
  isRequired: boolean;
}

export default defineComponent({
  components: {
    Modal
  },
  data() {
    return {
      asd: "",
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

    modal(): InstanceType<typeof Modal> {
      return this.$refs.modal as InstanceType<typeof Modal>;
    },

    toggle() {
      this.modal().toggle();
    },

    async submit(): Promise<void> {
      if (!this._validate()) {
        return;
      }

      try {
        this.modal().isBusy = true;

        await this[ActionTypes.SendContactFeedback]({
          name: this.name.value,
          note: this.message.value
        } as ContactFeedbackData);
      } finally {
        this._reset();
        this.toggle();
      }
    },

    _validate(fieldName?: string): boolean {
      const fields = fieldName ? [(this as any)[fieldName] as InputField] : [this.name, this.message];

      fields.forEach((field) => {
        field.isValid = !field.isRequired || Boolean(field.value);
      });

      return fields.every((field) => field.isValid);
    },

    _reset() {
      this.modal().isBusy = false;

      [this.name, this.message].forEach((field) => {
        field.value = "";
        field.isValid = true;
      });
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
