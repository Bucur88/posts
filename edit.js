async function init() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get("postId");

  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  const result = await response.json();
  render(result);
}

function render(post) {
  const textarea = document.createElement("textarea");
  const button = document.createElement("button");
  const input = document.createElement("input");
  textarea.innerHTML = post.body;
  input.setAttribute("value", post.title);
  button.innerHTML = "SAVE";
  const body = document.querySelector("body");
  body.appendChild(input);
  body.appendChild(textarea);
  body.appendChild(button);

  button.addEventListener("click", () =>
    updatePost(post.id, input.value, textarea.value)
  );
}

async function updatePost(id, title, body) {
  const response = await fetch(`https://dummyjson.com/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  const result = await response.json();
  console.log(result);
}
