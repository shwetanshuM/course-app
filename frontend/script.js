async function userSignup() {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;
  const name = document.getElementById("user-name").value;

  try {
    const res = await axios.post("https://course-app-shwetanshu.up.railway.app/user/signup", {
      email, password, name
    });

    alert("You are signed up as user!");
  } catch (err) {
    alert("Signup failed: " + (err.response?.data?.error || "server error"));
  }
}

async function userSignin() {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;

  try {
    const response = await axios.post("https://course-app-shwetanshu.up.railway.app/user/signin", {
      email, password
    });

    localStorage.setItem("token", response.data.token);
    alert("you are signed in as user ");
  } catch (err) {
    alert("Signin failed: " + (err.response?.data?.error || "server error"));
  }
}

async function adminSignup() {
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;
  const name = document.getElementById("admin-name").value;

  try {
    await axios.post("https://course-app-shwetanshu.up.railway.app/admin/signup", {
      email, password, name
    });

    alert("you are signed up as admin");
  } catch (err) {
    alert("Signup failed");
  }
}

async function adminSignin() {
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

  try {
    const response = await axios.post("https://course-app-shwetanshu.up.railway.app/admin/signin", {
      email, password
    });

    localStorage.setItem("token", response.data.token);
    alert("you are signed in as admin");

    window.location.href = "admin_page.html";
  } catch (err) {
    alert("Signin failed");
  }
}

async function showCourses() {
  try {
    const response = await axios.get("https://course-app-shwetanshu.up.railway.app/course/preview");
    const courses = response.data.course;

    const container = document.getElementById("course-list");
    container.innerHTML = "";

    for (let c of courses) {
      container.innerHTML +=
        `<div>
           <h3>${c.title}</h3>
           <p>${c.description}</p>
           <p>Price: ₹${c.price}</p>
           <img src="${c.imageUrl}" width="200">
           <hr>
         </div>`;
    }
  } catch (err) {
    alert("Unable to load courses.");
  }
}

async function loadPurchases() {
  const token = localStorage.getItem("token");
  if (!token) return alert("You aren't logged in");

  try {
    const response = await axios.get("https://course-app-shwetanshu.up.railway.app/user/purchases", {
      headers: { token }
    });

    const purchases = response.data.purchases;
    const container = document.getElementById("purchased-list");

    container.innerHTML = "";

    if (purchases.length === 0) {
      container.innerHTML = "You haven't bought any courses yet";
      return;
    }

    for (let p of purchases) {
      container.innerHTML +=
        `<div>
           <p><b>Course ID:</b> ${p.courseId}</p>
           <p><b>Purchase ID:</b> ${p._id}</p>
           <hr>
         </div>`;
    }
  } catch (err) {
    alert("Failed to load purchases");
  }
}

function goToCourses() {
  window.location.href = "courses.html";
}

async function loadAllCourses() {
  try {
    const response = await axios.get("https://course-app-shwetanshu.up.railway.app/course/preview");
    const courses = response.data.course;

    const container = document.getElementById("course-list");
    container.innerHTML = "";

    for (let c of courses) {
      container.innerHTML +=
        `<div>
           <h3>${c.title}</h3>
           <p>${c.description}</p>
           <p>Price: ₹${c.price}</p>
           <img src="${c.imageUrl}" width="200"><br>
           <button onclick="buyCourse('${c._id}')">Buy Course</button>
           <hr>
         </div>`;
    }
  } catch (err) {
    alert("error loading courses");
  }
}

async function buyCourse(courseId) {
  const token = localStorage.getItem("token");
  if (!token) return alert("You aren't logged in");

  try {
    await axios.post(
      "https://course-app-shwetanshu.up.railway.app/course/purchase",
      { courseId },
      { headers: { token } }
    );

    alert("Course purchased successfully");
  } catch (err) {
    alert("purchase failed");
  }
}

async function create_course() {
  const token = localStorage.getItem("token");
  if (!token) return alert("You aren't logged in as admin");

  const title = document.getElementById("course_title").value;
  const description = document.getElementById("course_description").value;
  const price = document.getElementById("course_price").value;
  const imageUrl = document.getElementById("course_url").value;

  try {
    await axios.post(
      "https://course-app-shwetanshu.up.railway.app/admin/course",
      { title, description, price, imageUrl },
      { headers: { token } }
    );

    alert("Course created");
  } catch (err) {
    alert("Unable to create course");
  }
}

function logout() {
  localStorage.removeItem("token");
  alert("You have been logged out");
  window.location.href = "index.html";
}
