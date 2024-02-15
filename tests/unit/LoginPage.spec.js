import { shallowMount } from "@vue/test-utils";
import LoginPage from "../../src/components/LoginPage.vue";

describe("LoginPage.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(LoginPage);
    expect(wrapper.text()).toMatch("Login");
  });
});
