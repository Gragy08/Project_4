// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue, update, remove, onChildAdded, get, child, onChildRemoved } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDk1fVhBgYYmMjQwVgSSaRtslXFDWJkeNQ",
//   authDomain: "chatapp-52d71.firebaseapp.com",
//   projectId: "chatapp-52d71",
//   storageBucket: "chatapp-52d71.firebasestorage.app",
//   messagingSenderId: "695928433500",
//   appId: "1:695928433500:web:e47539b044a1bec4cbef99",
//   measurementId: "G-DEJYQNRM5Z"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase();
// const dbRef = ref(getDatabase());
// const auth = getAuth(app);
// let currentUser = null;
// const chat = document.querySelector("[chat]");

// import { getDatabase, ref, push, set, onValue, update, remove, onChildAdded, get, child, onChildRemoved } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

const firebaseConfig = {
  apiKey: "AIzaSyBDu0WPvftXd979-iVv34MBTF2bgVxGm-E",
  authDomain: "curious-subject-399517.firebaseapp.com",
  databaseURL: "https://curious-subject-399517-default-rtdb.firebaseio.com",
  projectId: "curious-subject-399517",
  storageBucket: "curious-subject-399517.firebasestorage.app",
  messagingSenderId: "1035740727399",
  appId: "1:1035740727399:web:c485a0a7993809f3412cc2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());
const auth = getAuth(app);
let currentUser = null;
const chatsRef = ref(db, 'chats');


// // Kiểm tra trạng thái đăng nhập
// const buttonLogin = document.querySelector("[button-login]");
// const buttonRegister = document.querySelector("[button-register]");
// const buttonLogout = document.querySelector("[button-logout]");

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     buttonLogout.style.display = "inline-block";
//     chat.style.display = "block";
//     currentUser = user;
//   } else {
//     buttonLogin.style.display = "inline-block";
//     buttonRegister.style.display = "inline-block";
//     if(chat) {
//       chat.innerHTML = `<i>Vui lòng đăng nhập để sử dụng ứng dụng.</i>`;
//     }
//   }
// });
// // Hết Kiểm tra trạng thái đăng nhập

// // Register page
// const formRegister = document.querySelector("#form-register");
// if(formRegister) {
//     formRegister.addEventListener("submit", (event) => {
//         event.preventDefault();

//         const fullName = formRegister.fullName.value;
//         const email = formRegister.email.value;
//         const password = formRegister.password.value;
//         const chatsRef = ref(db, 'chats');

//         if(fullName && email && password) {
//             createUserWithEmailAndPassword(auth, email, password)
//                 .then((userCredential) => {
//                     // Signed up 
//                     const user = userCredential.user;

//                     if(user) {
//                         set(ref(db, `users/${user.uid}`), {
//                             fullName: fullName
//                         }).then(() => {
//                             window.location.href = "index.html"
//                         })
//                     }
//                 })
//                 .catch((error) => {
//                     //In ra ham Alert
//                     console.log(error);
//                 });
//         }
//     })
// }
// // End Register page

// // Login page
// const formLogin = document.querySelector("#form-login");
// if(formLogin) {
//     formLogin.addEventListener("submit", (event) => {
//         event.preventDefault;

//         const email = formRegister.email.value;
//         const password = formRegister.password.value;

//         if(email && password) {
//             signInWithEmailAndPassword(auth, email, password)
//                 .then((userCredential) => {
//                     const user = userCredential.user;
//                     if(user) {
//                         window.location.href = "index.html"
//                     } 
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }
//     })
// }
// // End Login page

// // Log out
// if(buttonLogout) {
//     buttonLogout.addEventListener("click", () => {
//         signOut(auth).then(() => {
//             window.location.href = "login.html"
//         }).catch((error) => {
//             console.log(error);
//         });
//     })
// }
// // End Log out

// Kiểm tra trạng thái đăng nhập
const buttonLogin = document.querySelector("[button-login]");
const buttonRegister = document.querySelector("[button-register]");
const buttonLogout = document.querySelector("[button-logout]");
const chat = document.querySelector("[chat]");

onAuthStateChanged(auth, (user) => {
  if (user) {
    buttonLogout.style.display = "inline-block";
    chat.style.display = "block";
    currentUser = user;
  } else {
    buttonLogin.style.display = "inline-block";
    buttonRegister.style.display = "inline-block";
    if(chat) {
      chat.innerHTML = `<i>Vui lòng đăng nhập để sử dụng ứng dụng.</i>`;
    }
  }
});
// Hết Kiểm tra trạng thái đăng nhập

// Trang đăng ký
const formRegister = document.querySelector("#form-register");
if(formRegister) {
  formRegister.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = formRegister.fullName.value;
    const email = formRegister.email.value;
    const password = formRegister.password.value;

    if(fullName && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if(user) {
            set(ref(db, `users/${user.uid}`), {
              fullName: fullName
            }).then(() => {
              window.location.href = "index.html";
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
}
// Hết Trang đăng ký

// Trang đăng nhập
const formLogin = document.querySelector("#form-login");
if(formLogin) {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = formLogin.email.value;
    const password = formLogin.password.value;

    if(email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          if(user) {
            window.location.href = "index.html";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
}
// Hết Trang đăng nhập

// Tính năng đăng xuất
if(buttonLogout) {
  buttonLogout.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    }).catch((error) => {
      console.log(error);
    });
  })
}
// Hết Tính năng đăng xuất

// Form chat
const formChat = document.querySelector("[chat] .inner-form");
if(formChat) {
  // Preview Images
  const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
    maxFileCount: 6,
    multiple: true
  });
  // End Preview Images

  formChat.addEventListener("submit", async (event) => {
    event.preventDefault();

    const content = formChat.content.value;
    const userId = auth.currentUser.uid;
    const images = upload.cachedFileArray || [];
    
    if((content || images.length > 0) && userId) {
      const imagesLink = [];

      if(images.length > 0) {
        const url = 'https://api.cloudinary.com/v1_1/duppjjzrh/image/upload';

        const formData = new FormData();
  
        for (let i = 0; i < images.length; i++) {
          let file = images[i];
          formData.append('file', file);
          formData.append('upload_preset', 'lmvlikx0');
      
          //chờ lấy ảnh xong mới chạy xuống đoạn code dưới, nhớ thêm async
          await fetch(url, {
            method: 'POST',
            body: formData,
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              imagesLink.push(data.url);
            });
        }
      }

      set(push(ref(db, "chats")), {
        content: content,
        images: imagesLink,
        userId: userId
      });

      formChat.content.value = "";
      upload.resetPreviewPanel(); // clear all selected images
    }
  })
}
// Hết Form chat

// Display default messege
const chatBody = document.querySelector("[chat] .inner-body");
if(chatBody) {
  onChildAdded(chatsRef, (data) => {
    const key = data.key;
    const userId = data.val().userId;
    const content = data.val().content;
    const images = data.val().images;

    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const fullName = snapshot.val().fullName;
        
        const newChat = document.createElement("div");
        newChat.setAttribute("chat-key", key);
        let htmlFullName = "";
        let htmlButtonDelete = "";

        if(userId == currentUser.uid) {
          newChat.classList.add("inner-outgoing");
          htmlButtonDelete = `
            <button class="button-delete">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          `;
        } else {
          newChat.classList.add("inner-incoming");
          htmlFullName = `
            <div class="inner-name">
              ${fullName}
            </div>
          `;
        }

        let htmlContent = "";
        if(content) {
          htmlContent = `
            <div class="inner-content">
              ${content}
            </div>
          `;
        }

        let htmlImages = "";
        if(images && images.length > 0) {
          htmlImages += `<div class="inner-images">`;
          
          for(const image of images) {
            htmlImages += `<img src="${image}" />`;
          }
        
          htmlImages += `</div>`;
        }

        newChat.innerHTML = `
          ${htmlFullName}
          ${htmlContent}
          ${htmlImages}
          ${htmlButtonDelete}
        `;

        chatBody.appendChild(newChat);

        chatBody.scrollTop = chatBody.scrollHeight;

        // Xóa tin nhắn
        const buttonDelete = newChat.querySelector(".button-delete");
        if(buttonDelete) {
          buttonDelete.addEventListener("click", () => {
            remove(ref(db, '/chats/' + key));
          })
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  });
}
// Display default messege

// Lister for func is deleted?
onChildRemoved(chatsRef, (data) => {
    const key = data.key;
    const chatItem = chatBody.querySelector(`[chat-key="${key}"]`);
    if(chatItem) {
        chatItem.remove();
    }
})
// End Lister for func is deleted?

// Chèn Icon
const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker) {
  const button = document.querySelector('.button-icon');
  const buttonIcon = document.querySelector('.button-icon i');
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(button, tooltip);
  button.addEventListener("click", () => {
    tooltip.classList.toggle('shown');
  });

  const inputChat = document.querySelector(".chat .inner-form input[name='content']");
  emojiPicker.addEventListener('emoji-click', event => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });

  document.addEventListener("click", (event) => {
    if(!emojiPicker.contains(event.target) && (event.target != button && event.target != buttonIcon)) {
      tooltip.classList.remove('shown');
    }
  })
}
// Hết Chèn Icon


// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getDatabase, ref, push, set, onValue, update, remove, onChildAdded, get, child, onChildRemoved } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// const firebaseConfig = {
//   apiKey: "AIzaSyBDu0WPvftXd979-iVv34MBTF2bgVxGm-E",
//   authDomain: "curious-subject-399517.firebaseapp.com",
//   databaseURL: "https://curious-subject-399517-default-rtdb.firebaseio.com",
//   projectId: "curious-subject-399517",
//   storageBucket: "curious-subject-399517.firebasestorage.app",
//   messagingSenderId: "1035740727399",
//   appId: "1:1035740727399:web:c485a0a7993809f3412cc2"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase();
// const dbRef = ref(getDatabase());
// const auth = getAuth(app);
// let currentUser = null;
// const chatsRef = ref(db, 'chats');

// // Kiểm tra trạng thái đăng nhập
// const buttonLogin = document.querySelector("[button-login]");
// const buttonRegister = document.querySelector("[button-register]");
// const buttonLogout = document.querySelector("[button-logout]");
// const chat = document.querySelector("[chat]");

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     buttonLogout.style.display = "inline-block";
//     chat.style.display = "block";
//     currentUser = user;
//   } else {
//     buttonLogin.style.display = "inline-block";
//     buttonRegister.style.display = "inline-block";
//     if(chat) {
//       chat.innerHTML = `<i>Vui lòng đăng nhập để sử dụng ứng dụng.</i>`;
//     }
//   }
// });
// // Hết Kiểm tra trạng thái đăng nhập

// // Trang đăng ký
// const formRegister = document.querySelector("#form-register");
// if(formRegister) {
//   formRegister.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const fullName = formRegister.fullName.value;
//     const email = formRegister.email.value;
//     const password = formRegister.password.value;

//     if(fullName && email && password) {
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           if(user) {
//             set(ref(db, `users/${user.uid}`), {
//               fullName: fullName
//             }).then(() => {
//               window.location.href = "index.html";
//             });
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   })
// }
// // Hết Trang đăng ký

// // Trang đăng nhập
// const formLogin = document.querySelector("#form-login");
// if(formLogin) {
//   formLogin.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const email = formLogin.email.value;
//     const password = formLogin.password.value;

//     if(email && password) {
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // Signed in 
//           const user = userCredential.user;
//           if(user) {
//             window.location.href = "index.html";
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   })
// }
// // Hết Trang đăng nhập

// // Tính năng đăng xuất
// if(buttonLogout) {
//   buttonLogout.addEventListener("click", () => {
//     signOut(auth).then(() => {
//       window.location.href = "login.html";
//     }).catch((error) => {
//       console.log(error);
//     });
//   })
// }
// // Hết Tính năng đăng xuất

// // Form chat
// const formChat = document.querySelector("[chat] .inner-form");
// if(formChat) {
//   // Preview Images
//   const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
//     maxFileCount: 6,
//     multiple: true
//   });
//   // End Preview Images

//   formChat.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const content = formChat.content.value;
//     const userId = auth.currentUser.uid;
//     const images = upload.cachedFileArray || [];
    
//     if((content || images.length > 0) && userId) {
//       const imagesLink = [];

//       if(images.length > 0) {
//         const url = 'https://api.cloudinary.com/v1_1/dxhwpfxxn/image/upload';

//         const formData = new FormData();
  
//         for (let i = 0; i < images.length; i++) {
//           let file = images[i];
//           formData.append('file', file);
//           formData.append('upload_preset', 'tzo8xiql');
      
//           await fetch(url, {
//             method: 'POST',
//             body: formData,
//           })
//             .then((response) => {
//               return response.json();
//             })
//             .then((data) => {
//               imagesLink.push(data.url);
//             });
//         }
//       }

//       set(push(ref(db, "chats")), {
//         content: content,
//         images: imagesLink,
//         userId: userId
//       });

//       formChat.content.value = "";
//       upload.resetPreviewPanel(); // clear all selected images
//     }
//   })
// }
// // Hết Form chat

// // Hiển thị tin nhắn mặc định
// const chatBody = document.querySelector("[chat] .inner-body");
// if(chatBody) {
//   onChildAdded(chatsRef, (data) => {
//     const key = data.key;
//     const userId = data.val().userId;
//     const content = data.val().content;
//     const images = data.val().images;

//     get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//       if (snapshot.exists()) {
//         const fullName = snapshot.val().fullName;
        
//         const newChat = document.createElement("div");
//         newChat.setAttribute("chat-key", key);
//         let htmlFullName = "";
//         let htmlButtonDelete = "";

//         if(userId == currentUser.uid) {
//           newChat.classList.add("inner-outgoing");
//           htmlButtonDelete = `
//             <button class="button-delete">
//               <i class="fa-regular fa-trash-can"></i>
//             </button>
//           `;
//         } else {
//           newChat.classList.add("inner-incoming");
//           htmlFullName = `
//             <div class="inner-name">
//               ${fullName}
//             </div>
//           `;
//         }

//         let htmlContent = "";
//         if(content) {
//           htmlContent = `
//             <div class="inner-content">
//               ${content}
//             </div>
//           `;
//         }

//         let htmlImages = "";
//         if(images && images.length > 0) {
//           htmlImages += `<div class="inner-images">`;
          
//           for(const image of images) {
//             htmlImages += `<img src="${image}" />`;
//           }
        
//           htmlImages += `</div>`;
//         }

//         newChat.innerHTML = `
//           ${htmlFullName}
//           ${htmlContent}
//           ${htmlImages}
//           ${htmlButtonDelete}
//         `;

//         chatBody.appendChild(newChat);

//         chatBody.scrollTop = chatBody.scrollHeight;

//         // Xóa tin nhắn
//         const buttonDelete = newChat.querySelector(".button-delete");
//         if(buttonDelete) {
//           buttonDelete.addEventListener("click", () => {
//             remove(ref(db, '/chats/' + key));
//           })
//         }
//       } else {
//         console.log("No data available");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
//   });
// }
// // Hết Hiển thị tin nhắn mặc định

// // Lắng nghe xem có tin nhắn nào bị xóa không
// onChildRemoved(chatsRef, (data) => {
//   const key = data.key;
//   const chatItem = chatBody.querySelector(`[chat-key="${key}"]`);
//   if(chatItem) {
//     chatItem.remove();
//   }
// });
// // Hết Lắng nghe xem có tin nhắn nào bị xóa không

// // Chèn Icon
// const emojiPicker = document.querySelector('emoji-picker');
// if(emojiPicker) {
//   const button = document.querySelector('.button-icon');
//   const buttonIcon = document.querySelector('.button-icon i');
//   const tooltip = document.querySelector('.tooltip');
//   Popper.createPopper(button, tooltip);
//   button.addEventListener("click", () => {
//     tooltip.classList.toggle('shown');
//   });

//   const inputChat = document.querySelector(".chat .inner-form input[name='content']");
//   emojiPicker.addEventListener('emoji-click', event => {
//     const icon = event.detail.unicode;
//     inputChat.value = inputChat.value + icon;
//   });

//   document.addEventListener("click", (event) => {
//     if(!emojiPicker.contains(event.target) && (event.target != button && event.target != buttonIcon)) {
//       tooltip.classList.remove('shown');
//     }
//   })
// }
// // Hết Chèn Icon