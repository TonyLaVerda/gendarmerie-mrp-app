const API_BASE = "/api"; // Proxy via nginx

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

async function handleResponse(res, method, resource, id) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erreur ${method} ${resource}${id ? ' ' + id : ''} : ${res.status} - ${text}`);
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

export async function getResource(resource) {
  const res = await fetch(`${API_BASE}/${resource}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(res, "GET", resource);
}

export async function postResource(resource, data) {
  const res = await fetch(`${API_BASE}/${resource}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res, "POST", resource);
}

export async function updateResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res, "PUT", resource, id);
}

export async function patchResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(res, "PATCH", resource, id);
}

export async function deleteResource(resource, id) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res, "DELETE", resource, id);
}
