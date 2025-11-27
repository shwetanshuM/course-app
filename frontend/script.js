console.log("🔥 script.js LOADED");

async function userSignup() {
  console.log("user signup called")
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;
  const name = document.getElementById("user-name").value;

  try {
    const res = await axios.post("http://localhost:3001/user/signup", {
      email,
      password,
      name
    });

    alert("You are signed up as user!");
    console.log(res.data);

  } catch (err) {
    console.log(err);
    alert("Signup failed: " + (err.response?.data?.error || "server error"));
  }
}

async function userSignin() {
  const email=document.getElementById("user-email").value;
  const password=document.getElementById("user-password").value;
  const response=await axios.post("http://localhost:3001/user/signin",{
    email:email,
    password:password,
  })
  localStorage.setItem("token",response.data.token);
  alert("you are signend in ")
}
