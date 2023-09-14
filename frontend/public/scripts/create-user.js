import { onFormSubmit } from "./onFormSubmit.js";

const form = document.querySelector("form");

form?.addEventListener("submit", async (event) => {
  await onFormSubmit(event, (data) => {
    return {
      method: "post",
      body: JSON.stringify({ name: data.name, email: data.email }),
      route: "",
    }
  })
});
