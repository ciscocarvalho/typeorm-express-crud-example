import { onFormSubmit } from "./onFormSubmit.js";

const form = document.querySelector("form");

form?.addEventListener("submit", async (event) => {
  await onFormSubmit(event, ({ name, email, id }) => {
    return {
      method: "put",
      body: JSON.stringify({
        name: name === "" ? null : name,
        email: email === "" ? null : email,
      }),
      route: parseInt(id),
    }
  })
});
