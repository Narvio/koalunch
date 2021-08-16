import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import FailureMessage from "@/components/utils/FailureMessage.vue";

describe("utils/FailureMessage.vue", () => {
  it("renders message when passed", () => {
    const message = "new message";
    const wrapper = shallowMount(FailureMessage, {
      props: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
});
