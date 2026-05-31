const baseUrl = "http://localhost:3001";

function normalizeItem(item) {
  return { ...item, _id: item._id ?? item.id };
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((items) => items.map(normalizeItem));
}

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then(normalizeItem);
}

export function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(checkResponse);
}
