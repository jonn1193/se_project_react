const baseUrl = "http://localhost:3001";

function normalizeId(value) {
  if (value && typeof value === "object") {
    return value._id ?? value.id;
  }

  return value;
}

function normalizeItem(item) {
  return {
    ...item,
    _id: item._id ?? item.id,
    owner: normalizeId(item.owner),
    likes: Array.isArray(item.likes) ? item.likes.map(normalizeId) : [],
  };
}

function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
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

export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkResponse)
    .then(normalizeItem);
}

export function deleteItem(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  }).then(checkResponse);
}

export function updateUser({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export function addCardLike(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(token),
  })
    .then(checkResponse)
    .then(normalizeItem);
}

export function removeCardLike(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  })
    .then(checkResponse)
    .then(normalizeItem);
}
