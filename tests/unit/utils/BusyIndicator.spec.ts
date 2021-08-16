import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import BusyIndicator from "@/components/utils/BusyIndicator.vue";

describe("utils/BusyIndicator.vue", () => {
  it("renders image", () => {
    const wrapper = shallowMount(BusyIndicator, {
      props: {},
    });
    expect(wrapper.find("img")).to.not.equal(undefined);
  });
});
