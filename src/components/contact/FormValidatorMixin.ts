import { defineComponent } from "vue";

interface InputField {
  value: string;
  isValid: boolean;
  isRequired: boolean;
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function createMixin(fieldNames: string[]) {
  return defineComponent({
    computed: {
      allFields(): InputField[] {
        return fieldNames.map((name) => (this as any)[name]);
      }
    },
    methods: {
      validate(fieldName?: string): boolean {
        const fields = fieldName ? [(this as any)[fieldName] as InputField] : this.allFields;

        fields.forEach((field) => {
          field.isValid = !field.isRequired || Boolean(field.value);
        });

        return fields.every((field) => field.isValid);
      },

      resetFields() {
        this.allFields.forEach((field) => {
          field.value = "";
          field.isValid = true;
        });
      }
    }
  });
}

export default createMixin;
