import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import MenuSection from "@/components/restaurant/MenuSection.vue";
import { MenuData } from "@/api/responses/Menu";

describe("restaurant/MenuSection.vue", () => {
  it("renders meals", () => {
    const wrapper = shallowMount(MenuSection, {
      props: {
        section: {
          meals: [{
            name: "Meal 1",
            price: "5 EUR"
          }, {
            name: "Meal 2",
            price: "10 EUR"
          }]
        } as MenuData
      },
    });

    const rows = wrapper.findAll("tr");
    const columns = [
      rows[0].findAll("td").map((cell) => cell.text()),
      rows[1].findAll("td").map((cell) => cell.text()),
    ];

    expect(rows.length).to.equal(2);

    expect(columns[0].length).to.equal(2);
    expect(columns[1].length).to.equal(2);

    expect(columns[0][0]).to.equal("Meal 1");
    expect(columns[0][1]).to.equal("5 EUR");

    expect(columns[1][0]).to.equal("Meal 2");
    expect(columns[1][1]).to.equal("10 EUR");
  });
});
