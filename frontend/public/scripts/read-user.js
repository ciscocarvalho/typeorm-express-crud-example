import { onFormSubmit } from "./onFormSubmit.js";

const form = document.querySelector("form");

form?.addEventListener("submit", async (event) => {
  await onFormSubmit(event, (data) => ({ route: data["user-id"] }))
});
