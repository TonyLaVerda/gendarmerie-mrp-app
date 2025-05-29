const API_BASE = "http://37.187.205.167:3001/api";

export async function getResource(resource) {
  const res = await fetch(`${API_BASE}/${resource}`);
  if (!res.ok) throw new Error(`Erreur GET ${resource}`);
  return res.json();
}

export async function postResource(resource, data) {
  const res = await fetch(`${API_BASE}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Erreur POST ${resource}`);
  return res.json();
}

export async function updateResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Erreur PUT ${resource} ${id}`);
  return res.json();
}

export async function patchResource(resource, id, data) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Erreur PATCH ${resource} ${id}`);
  return res.json();
}

export async function deleteResource(resource, id) {
  const res = await fetch(`${API_BASE}/${resource}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Erreur DELETE ${resource} ${id}`);
  return res.json();
}
