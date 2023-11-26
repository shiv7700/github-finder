// api url => // https://api.github.com/search/users?q=${username}
//  data of specific user =>  https://api.github.com/users/${user}

const form = document.querySelector("form");
const rester = document.querySelector(".rester");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  getData();
});

async function getData() {
  const searchInput = document.querySelector(".search-input");
  const result = document.querySelector(".result");

  if (searchInput.value === "") {
    result.innerHTML = `<h1 class="text-3xl m-4">search box is empty 🥺🥺🥺 </h1>`;
  } else {
    try {
      const url = `https://api.github.com/search/users?q=${searchInput.value}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("status error");
      const data = await res.json();
      const users = data.items;
      console.log(users);
      result.innerHTML = "";
      if (users.length === 0) {
        result.innerHTML = `<h1 class="text-3xl m-4">no user with exits</h1>`;
      }
      // now hit api and put result
      for (let i = 0; i < users.length; i++) {
        const res = await fetch(
          `https://api.github.com/users/${users[i].login}`
        );
        const dats = await res.json();
        console.log(dats);
        const login = document.createElement("p");
        const repo = document.createElement("a");
        const dp = document.createElement("img");
        const gitUrl = document.createElement("a");
        const div = document.createElement("div");
        const type = document.createElement("p");
        const follower = document.createElement("p");
        const following = document.createElement("p");
        div.append(dp, login, gitUrl, repo, type, follower, following);
        login.innerHTML = `Username : ${users[i].login}`;
        dp.src = `${users[i].avatar_url}`;
        gitUrl.textContent = `Github : open in new tab`;
        gitUrl.target = "_blank";
        gitUrl.href = users[i].html_url;
        type.innerHTML = `type : ${users[i].type}`;
        repo.innerHTML = `repo link : open in new tab`;
        follower.innerHTML = `<span>followers : ${dats.followers}</span>`;
        following.innerHTML = `<span>following : ${dats.following}</span>`;
        repo.href = `https://github.com/${users[i].login}?tab=repositories`;
        repo.target = "_blank";
        result.append(div);
        // userObject(users[i].login);
      }
    } catch (error) {
      console.log("error is", error);
      result.innerHTML = `<h1 class="text-3xl m-4">failed to connect to api </h1>`;
    }
  }
  searchInput.value = "";
}

rester.addEventListener("click", function () {
  const result = document.querySelector(".result");
  result.innerHTML = `<h1 class="text-3xl m-4">data is rest 🫡🫡🫡</h1>`;
});

// async function userObject(user) {
//   const res = await fetch(`https://api.github.com/users/${user}`);
//   const data = await res.json();
//   console.log(data);
// }
