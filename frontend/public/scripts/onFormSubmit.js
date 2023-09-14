export const onFormSubmit = async (event, fn) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  let { method, body, route } = fn(Object.fromEntries(formData));
  route = route ?? "";

  try {
    const result = await fetch(`http://localhost:5000/user/${route}`, {
      headers: { ["Content-Type"]: "application/json" },
      method,
      body,
    });

    alert(JSON.stringify(await result.json()));
  } catch (e) {
    alert("Error");
  }
};
