export const apis = async ({ url, method, body }) => {
  try {
    const res = await fetch(`http://13.125.190.19:8080/api${url}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
