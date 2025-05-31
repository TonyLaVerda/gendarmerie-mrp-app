const API_BASE = "/api"; // Utilise le proxy nginx

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function handleResponse(res, method, resource, id) {
  const isJSON = res.headers.get("content-type")?.includes("application/json");

  if (!res.ok) {
    const errorContent = isJSON ? await res.json() : await res.text();
    const message = typeof errorContent === "string" ? errorContent : errorContent?.error || "Erreur inconnue";
    console.error(`❌ [${method}] ${resource}${id ? `/${id}` : ""} → ${res.status}:`, message);
    throw new Error(`Erreur ${method} ${resource}${id ? ' ' + id : ''} : ${res.status} - ${message}`);
  }

  return isJSON ? res.json() : null;
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
