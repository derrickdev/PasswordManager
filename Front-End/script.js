const passwordCreatorChoiceBtn = document.getElementById('password_creator_choice');
const passwordGeneratorChoiceBtn = document.getElementById('password_generator_choice');
const passwordCreatorBtn = document.getElementById('password_creator_btn');
const passwordGeneratorBtn = document.getElementById('password_generator_btn');
const passwordCreator = document.getElementById('password_creator');
const passwordGenerator = document.getElementById('password_generator');
const websiteImput = document.getElementById('websiteImput');
const websiteInputError = document.getElementById('websiteInputError');
const passwordUsername = document.getElementById('passwordUsername');
const passwordInputError = document.getElementById('passwordInputError');
const passwordInput = document.getElementById('passwordInput');
const generatedPassword = document.getElementById('generatedPassword');
const modal = document.getElementById("myModal");
const modal2 = document.getElementById("myModal2");
const copyIcon = document.getElementById('copyIcon');
const generatedPasswordBox = document.querySelector('.generatedPasswordBox');
const passwordListBox = document.getElementById('passwordListBox');
const passwordList = document.getElementById('password-list');
const infoContainer = document.getElementById('infoContainer');
const websiteAdressContainer = document.getElementById('websiteAdressContainer');
const usernameContainer = document.getElementById('usernameContainer');
const passwordContainer = document.getElementById('passwordContainer');
const myModalInfo = document.getElementById('myModalInfo');
const infoModal = document.getElementById("testModal");
const infoModalContent = document.getElementById("infoModalContent");
const urlField = document.querySelector(".urlField");
const usernameField = document.querySelector(".usernameField");
const passwordField = document.querySelector(".passwordField");
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');
const quitInfoBtn = document.querySelector(".quitInfo");






passwordCreatorChoiceBtn.addEventListener('click', () => {
  modal.style.display = "block"
})
passwordGeneratorChoiceBtn.addEventListener('click', () => {
  modal2.style.display = "block"

})


//color choice for password container's bar

function chooseRandomColor() {
  const colors = ["#fddde4", "#cdebbc", "#d1e8f2", "#f6dbf6", "#fff2e5"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];

  return randomColor;
}

function getPasswords() {
  const login_div = document.querySelector(".login_div");
  login_div.innerHTML=`<h3>hey buddy !</h3> 
  <button type="button" class="btn btn-outline-primary mr-4 login-btn" 
  onclick=window.location.replace("login.html")>log out</button>`
  const storedToken = localStorage.getItem("accessToken");
          console.log(storedToken)
        
          // if (storedToken) {
          //   headers = {
          //     ...options.headers,
          //     Authorization: `Bearer ${storedToken}`
          //   };
          // }
  fetch( "http://localhost:8080/api/password", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
              // Authorization: `Bearer ${storedToken}`,
              //  "Access-Control-Allow-Origin":"*"
          },
      })
      .then(response => response.json())
    .then(result => {
      passwordListBox.innerHTML = ""
      result.map(res => {
        console.log(res);
        const newDiv = document.createElement("div");
        newDiv.classList.add("infoContainer");
        newDiv.innerHTML = `
          <p class="newDivP" ><i class="fa fa-globe"></i> ${res.url}</p>
          <i class="fa fa-chevron-right"></i>`;
        newDiv.style.backgroundColor = chooseRandomColor();
        newDiv.addEventListener("click", () => {
          showModal(res.id)
        });
        // Back button click handler
        quitInfoBtn.addEventListener("click", () => {
          infoModal.style.display = "none"; // Close the info modal
        });
       
       
        passwordListBox.appendChild(newDiv);
      })
     



    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function showModal(id) {
  const url = `http://localhost:8080/api/password/${id}`;

  fetch(url,{
     headers: {
        'Content-Type': 'application/json',
         "Access-Control-Allow-Origin":"*"
      },
  })
    .then(response =>
      response.json()
    )
    .then(result => {
      console.log(result);
      urlField.textContent = result.url
      passwordField.textContent = result.password
      usernameField.textContent = result.username
      infoModal.style.display = "block";
      // delete button click handler
      const deleteInfoBtn= document.querySelector(".delete");
      deleteInfoBtn.addEventListener("click", () => {
        deleteRow(result.id);
        infoModal.style.display = "none"; 
      });
      
    })
    .catch(error => {
      console.error('Error:', error);
    });


  


}
function deleteRow(id) {
  const url = `http://localhost:8080/api/password/${id}`;

  fetch(url,{
    method: 'DELETE',
     headers: {
        'Content-Type': 'application/json'
        //  "Access-Control-Allow-Origin":"*"
      },
  })
  

    .then(result => {
      console.log(result)
      getPasswords();
      
    })
    .catch(error => {
      console.error('Error:', error);
    });


  


}

getPasswords()


passwordCreatorBtn.addEventListener('click', () => {
  const websiteValue = websiteImput.value;
  const usernameValue = passwordUsername.value;
  const passwordValue = passwordInput.value;


  // Reset any previous error styles and messages
  websiteImput.style.borderBottom = "1px solid #ccc";
  websiteInputError.innerHTML = "";
  passwordInputError.innerHTML = "";

  if (!websiteValue.includes(".")) {
    websiteImput.style.borderBottom = "1px solid red";
    websiteInputError.innerHTML = "Your website address should contain a domain extension(.com,..etc)";
    websiteInputError.style.color = "red";
  } else if (websiteValue.includes(" ") || passwordValue.includes(" ")) {
    websiteImput.style.borderBottom = "1px solid red";
    websiteInputError.innerHTML = "Website address should not contain spaces";
    websiteInputError.style.color = "red";
    passwordInput.style.borderBottom = "1px solid red";
    passwordInputError.innerHTML = "Password cannot contain spaces";
    passwordInputError.style.color = "red";
  } else if (!passwordValue) {
    passwordInput.style.borderBottom = "1px solid red";
    passwordInputError.innerHTML = "You must enter a password";
    passwordInputError.style.color = "red";
  }
  else {
  
    const url = 'http://localhost:8080/api/password';
    const data = {
      url: `${websiteValue}`,
      username: `${usernameValue}`,
      password: `${passwordValue}`
    };
      const token ='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaW9uZWxAZ21haWwuY…0NjR9.NFFoFnFXqlxrQFjmuPQl-ZPxik9uKTdpngEIMuaegjw';


     fetch( url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
               "Access-Control-Allow-Origin":"*"
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        getPasswords()
      })
      .catch(error => {
        console.error('Error:', error);
      });

    infoModal.style.display = "none";
    modal.style.display = "none";



  }
});


// passwordGeneratorBtn.addEventListener('click', () => {
//   generatedPasswordBox.style.display = "flex";
//   let length = document.getElementById('rangeInput').value;
//   let password = '';
//   let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@%£$_';
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     password += characters.charAt(randomIndex);
//   }
//   // return password;
//   console.log(password);
//   generatedPassword.innerHTML = password;
//   copyIcon.classList.add('fa-copy');
//  const quitgeneratorBtn = document.querySelector(".quitgenerator");
//  quitgeneratorBtn.addEventListener("click", () => {
//   modal2.style.display = "none";
// });

// })

passwordGeneratorBtn.addEventListener('click', () => {
  generatedPasswordBox.style.display = "flex";
  let length = document.getElementById('rangeInput').value;
  let password = '';
  let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  
  // Check if the specialCharsCheckbox is checked
  if (document.getElementById('specialCharsCheckbox').checked) {
    characters += '@%£$_'; // Add special characters to the character pool
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  console.log(password);
  generatedPassword.innerHTML = password;
  copyIcon.classList.add('fa-copy');
  
  const quitgeneratorBtn = document.querySelector(".quitgenerator");
  quitgeneratorBtn.addEventListener("click", () => {
    modal2.style.display = "none";
  });
});

function copy() {
  const passwordText = generatedPassword.textContent;

  if (passwordText.includes(' ')) {
    alert('nothing to copy');
  }
  else if (passwordText) {
    const textArea = document.createElement('textarea');
    textArea.value = passwordText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    copyIcon.classList.remove('fa-copy');
    copyIcon.classList.add('fa-check')
  }
};

// update range input
rangeInput.addEventListener('input', (event) => {
  rangeValue.textContent = event.target.value;
});

function search() {
  const searchBtn = document.getElementById("search").value;
  fetch(`http://localhost:8080/api/password/search?query=${searchBtn}`)
  .then(response => response.json())
  .then(result => {
     passwordListBox.innerHTML = ""
      result.map(res => {
        console.log(res);
        const newDiv = document.createElement("div");
        newDiv.classList.add("infoContainer");
        newDiv.innerHTML = `
          <p class="newDivP" ><i class="fa fa-globe"></i> ${res.url}</p>
          <i class="fa fa-chevron-right"></i>`;
        newDiv.style.backgroundColor = chooseRandomColor();
        newDiv.addEventListener("click", () => {
          showModal(res.id)
        });
        // Back button click handler
        quitInfoBtn.addEventListener("click", () => {
          infoModal.style.display = "none"; // Close the info modal
        });
       
       
        passwordListBox.appendChild(newDiv);
      })
    })
}



//Register page

   
    function register () {
      const submitButton = document.getElementById("submitBtn");
      const firstname = document.querySelector('input[placeholder="Firstname"]');
      const lastname = document.querySelector('input[placeholder="Lastname"]');
      const email = document.querySelector('input[placeholder="Email"]');
      const password = document.querySelector('input[placeholder="Password"]');
      const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]');

        if (firstname.value=='') {
          firstname.style.borderBottom = "2px solid red";
        }
        else if (lastname.value=='') {
          lastname.style.borderBottom = "2px solid red";
        }
        else if (email.value=='') {
          email.style.borderBottom = "2px solid red";
        }
        else if (password.value !== confirmPassword.value||password.value==''||confirmPassword.value=='') {
          password.style.borderBottom = "1px solid red";
        }
        else {
        // Create a data object to send in the POST request
        const data = {
          firstname: firstname.value,
          lastname: lastname.value,
          email: email.value,
          password: password.value,
      };

      // Make a POST request to your API endpoint

      fetch( "http://localhost:8080/api/v1/auth/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
              //  "Access-Control-Allow-Origin":"*"
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(responseData => {
          // Handle the API response as needed
          console.log(responseData);
          const accessToken = responseData.access_token;

        // Stockage du token dans le localStorage
        localStorage.setItem("accessToken", accessToken);
        function fetchWithToken(url, options = {}) {
          const storedToken = localStorage.getItem("accessToken");
          console.log(storedToken)
        
          if (storedToken) {
            options.headers = {
              ...options.headers,
              Authorization: `Bearer ${storedToken}`
            };
          }
        
          return fetch(url, options);
        }
          if (responseData.access_token) {
            window.location.replace("index.html")
            
            
          }
      })
      .catch(error => {
          console.error("Error:", error);
      });
        }


      }

      //Login page

      function login() {
        
      
        const submitButton = document.querySelector(".submitBtn");
        
        submitButton.addEventListener("click", function () {
          console.log("clicked");
            const email = document.querySelector("input[name='email']").value;
            const password = document.querySelector("input[name='password']").value;
            
            const data = {
                email: email,
                password: password
            };
            
            
            fetch( "http://localhost:8080/api/v1/auth/authenticate", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
              //  "Access-Control-Allow-Origin":"*"
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(responseData => {
          // Handle the API response as needed
          console.log(responseData);
          if (responseData.access_token) {
            window.location.replace("index.html")
          }
      })
      .catch(error => {
          console.error("Error:", error);
      });
        });
       
      }