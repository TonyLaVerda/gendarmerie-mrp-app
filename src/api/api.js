const API_BASE = "/api";  // URL relative, passe par Nginx proxy

async function handleResponse(res, method, resource, id) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erreur ${method} ${resource}${id ? ' ' + id : ''} : ${res.status} - ${text}`);
  }
  // Si réponse vide (ex DELETE souvent), retourne vide sinon json
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  } else {
    return null;
  }
}

export async function getResource(resource) {
  const res = await fetch(`${API_BASE}/${resource}`);
  return handleResponse(res, "GET", resource);
}

export async function postResource(resource, data) {
  const res = await fetch(`${API_BASE}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "POST", resource);
}

export async function updateResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "PUT", resource, id);
}

export async function patchResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "PATCH", resource, id);
}

export async function deleteResource(resource, id) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res, "DELETE", resource, id);
}
