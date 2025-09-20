export async function getAllComments(postId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Errore nel recupero dei commenti");
  return res.json();
}

export async function createComment(postId, text) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Errore nella creazione del commento");
  return res.json();
}

export async function deleteComment(postId, commentId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Errore nell'eliminazione del commento");
  return res.json();
}

