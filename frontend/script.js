async function userSignup() {
  console.log("user signup called");
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;
  const name = document.getElementById("user-name").value;

  try {
    const res = await axios.post("course-app-shwetanshu.up.railway.app/user/signup", {
      email,
      password,
      name,
    });

    alert("You are signed up as user!");
    console.log(res.data);
  } catch (err) {
    console.log(err);
    alert("Signup failed: " + (err.response?.data?.error || "server error"));
  }
}

async function userSignin() {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;
  try {
    const response = await axios.post("course-app-shwetanshu.up.railway.app/user/signin", {
      email: email,
      password: password,
    });
    localStorage.setItem("token", response.data.token);
    alert("you are signed in as user ");
  } catch (err) {
    console.log(err);
    alert("Signin failed: " + (err.response?.data?.error || "server error"));
  }
}
async function adminSignup() {
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;
  const name = document.getElementById("admin-name").value;
  try {
    await axios.post("http://localhost:3001/admin/signup", {
      email,
      password,
      name,
    });
    alert("you are signed up as admin");
  } catch (err) {
    alert("Signup failed: " + (err.response?.data?.error || "server error"));
  }
}

async function adminSignin(){
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;
  try{
    const response=await axios.post("course-app-shwetanshu.up.railway.app/admin/signin",{
      email,
      password
    });
    localStorage.setItem("token",response.data.token);
    alert("you are signed in as admin")
    window.location.href = "admin_page.html";

  }catch(err){
        alert("Signin failed: " + (err.response?.data?.error || "server error"));

  }
}

async function showCourses() {
  try {
    const response = await axios.get("course-app-shwetanshu.up.railway.app/course/preview");
    const courses = response.data.course;
    const container = document.getElementById("course-list");
    container.innerHTML = "";
    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      container.innerHTML +=
        "<div>" +
        "<h3>" +
        c.title +
        "</h3>" +
        "<p>" +
        c.description +
        "</p>" +
        "<p>Price: ₹" +
        c.price +
        "</p>" +
        "<img src='" +
        c.imageUrl +
        "' width='200'>" +
        "<hr>" +
        "</div>";
    }
  } catch (err) {
    console.log("Failed to load courses:", err);
    alert("Unable to load courses.");
  }
}


async function loadPurchases(){
  const token=localStorage.getItem("token");
  if(!token){
    alert("you arent logged in as user")
    return ;
  }
  try{
    const response=await axios.get("course-app-shwetanshu.up.railway.app/user/purchases",{
      headers:{
        token:token
      }
    });
    const purchases=response.data.purchases;
    const container=document.getElementById("purchased-list");
    container.innerHTML="";
    if(purchases.length==0){
      container.innerHTML="YOU HAVENT BOUGHT ANY COURSES YET :("
      return;
    }
    for (let i=0;i<purchases.length;i++){
      const p=purchases[i];
      container.innerHTML +=
        "<div>" +
        "<p><b>Course ID:</b> " + p.courseId + "</p>" +
        "<p><b>Purchase ID:</b> " + p._id + "</p>" +
        "<hr>" +
        "</div>";
    }

  }catch(err){
    alert("Failed to load purchases");
  }
}

function goToCourses() {
  window.location.href = "courses.html";
}
async function loadAllCourses(){
  try{
    const response = await axios.get("course-app-shwetanshu.up.railway.app/course/preview");
    const courses = response.data.course;
    const container = document.getElementById("course-list");
    container.innerHTML = "";

    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      container.innerHTML +=
        "<div>" +
          "<h3>" + c.title + "</h3>" +
          "<p>" + c.description + "</p>" +
          "<p>Price: ₹" + c.price + "</p>" +
          "<img src='" + c.imageUrl + "' width='200'><br>" +
          "<button onclick='buyCourse(\"" + c._id + "\")'>Buy Course</button>" +
          "<hr>" +
        "</div>";
    }
  }catch(err){
    alert("error loading courses")
  }
}


async function buyCourse(courseId){
  const token=localStorage.getItem("token");
  if(!token){
    alert("you arent logged in")
    return;
  }

  try{
    await axios.post("http://course-app-shwetanshu.up.railway.app/course/purchase",
      {courseId:courseId},
      {headers:{token:token}},
    )
    alert("you have successfully purchased the course ");
  }catch(err){
    alert("purchase failed")
  }
}


function purchasedCourse(){
  window.location.href = "purchase.html";
}
function go_to_admin(){
  window.location.href="admin_page.html"
}


async function create_course(){
  const token=localStorage.getItem("token");
  if(!token){
    alert("you arent logged in as admin");
    return;
  }
  const title = document.getElementById("course_title").value;
  const description = document.getElementById("course_description").value;
  const price = document.getElementById("course_price").value;
  const imageUrl = document.getElementById("course_url").value;

  try{
    await axios.post("course-app-shwetanshu.up.railway.app/admin/course",{
      title,
      description,
      price,
      imageUrl
    },{
      headers:{token:token}
    })
    alert("course created")



  }catch(err){
    alert("sorry unable to creat course")
  }


}

function logout() {
  localStorage.removeItem("token");   
  alert("You have been logged out");
  window.location.href = "index.html";
}


