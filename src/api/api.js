const API_BASE = "/api";  // URL relative, passe par Nginx proxy

function getToken() {
  return localStorage.getItem("token"); // Ou sessionStorage si tu préfères
}

async function handleResponse(res, method, resource, id) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erreur ${method} ${resource}${id ? ' ' + id : ''} : ${res.status} - ${text}`);
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  } else {
    return null;
  }
}

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: `Bearer ${token}`,
  };
}

export async function getResource(resource) {
  const res = await fetch(`${API_BASE}/${resource}`, {
    headers: authHeaders(),
  });
  return handleResponse(res, "GET", resource);
}

export async function postResource(resource, data) {
  const res = await fetch(`${API_BASE}/${resource}`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  return handleResponse(res, "POST", resource);
}

export async function updateResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PUT",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  return handleResponse(res, "PUT", resource, id);
}

export async function patchResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  return handleResponse(res, "PATCH", resource, id);
}

export async function deleteResource(resource, id) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res, "DELETE", resource, id);
}
