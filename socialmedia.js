/**
 * Social Media Feed Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initLikeButtons();
  initFollowButtons();
  initCommentForms();
  initSearch();
  initStories();
});

/**
 * 1. Like Button Engine
 * Toggles 'active' state and updates the like counter dynamically.
 */
function initLikeButtons() {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const postCard = button.closest(".post-card");
      if (!postCard) return;

      const likesElement = postCard.querySelector("[data-likes]");
      if (!likesElement) return;

      const isLiked = button.classList.toggle("active");
      let currentLikes = parseInt(likesElement.textContent.replace(/,/g, ""), 10) || 0;

      currentLikes = isLiked ? currentLikes + 1 : currentLikes - 1;
      likesElement.textContent = currentLikes.toLocaleString();
    });
  });
}

/**
 * 2. Follow / Unfollow Toggle
 * Toggles 'following' class and updates button label text.
 */
function initFollowButtons() {
  const followButtons = document.querySelectorAll(".follow-btn");

  followButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isFollowing = button.classList.toggle("following");
      button.textContent = isFollowing ? "Following" : "Follow";
    });
  });
}

/**
 * 3. Dynamic Comment Submission
 * Creates and appends new comments to the post container.
 */
function initCommentForms() {
  const commentForms = document.querySelectorAll(".comment-form");

  commentForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = form.querySelector("input");
      if (!input) return;

      const text = input.value.trim();
      if (!text) return;

      const postCard = form.closest(".post-card");
      const commentsContainer = postCard?.querySelector(".user-comments");

      if (commentsContainer) {
        const commentRow = document.createElement("p");
        commentRow.className = "caption";

        const authorTag = document.createElement("strong");
        authorTag.textContent = "You";

        commentRow.appendChild(authorTag);
        commentRow.appendChild(document.createTextNode(` ${text}`));

        commentsContainer.appendChild(commentRow);
      }

      input.value = "";
    });
  });
}

/**
 * 4. Topbar Live Search Filter
 * Filters posts on the feed matching the author or caption text.
 */
function initSearch() {
  const searchInput = document.querySelector(".search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const posts = document.querySelectorAll(".post-card");

    posts.forEach((post) => {
      const name = post.querySelector(".name")?.textContent.toLowerCase() || "";
      const caption = post.querySelector(".caption")?.textContent.toLowerCase() || "";

      if (name.includes(query) || caption.includes(query)) {
        post.style.display = "";
      } else {
        post.style.display = "none";
      }
    });
  });
}

/**
 * 5. Interactive Story Click Handler
 */
function initStories() {
  const stories = document.querySelectorAll(".story");

  stories.forEach((story) => {
    story.addEventListener("click", () => {
      const username = story.querySelector("span")?.textContent || "User";
      console.log(`Viewing story for @${username}`);
    });
  });
}