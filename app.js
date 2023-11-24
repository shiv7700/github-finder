// api url : // https://api.github.com/search/users?q=${username}
// user object : https://api.github.com/users/${username}

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
      // now hit api and put result
      for (let i = 0; i < users.length; i++) {
        const login = document.createElement("p");
        const repo = document.createElement("a");
        const dp = document.createElement("img");
        const gitUrl = document.createElement("a");
        const div = document.createElement("div");
        div.append(dp, login, gitUrl, repo);
        login.innerHTML = `Name : ${users[i].login}`;
        dp.src = `${users[i].avatar_url}`;
        gitUrl.textContent = `Github : ${users[i].html_url}`;
        gitUrl.target = "_blank";
        gitUrl.href = users[i].html_url;
        repo.innerHTML = `repo link : https://github.com/orgs/${users[i].login}/repositories`;
        repo.href = `https://github.com/${users[i].login}?tab=repositories`;
        repo.target = "_blank";
        result.append(div);
        // userObject();
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
  result.innerHTML = "";
});

// async function userObject() {
//   const username = users[i].url;
//   const res = await fetch(`https://api.github.com/users/${username}`);
//   const data = await res.json();
//   console.log(data);
// }
