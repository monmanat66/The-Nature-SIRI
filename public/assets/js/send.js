document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // ป้องกันการรีเฟรชหน้า

  let formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  fetch("https://us-central1-thenaturesiri-81025.cloudfunctions.net/submitContactForm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      return response.text(); // ถ้า response สำเร็จ จะส่งข้อความ
    } else {
      throw new Error("Error: " + response.statusText); // ถ้า response ไม่สำเร็จ
    }
  })
  .then(data => {
    let responseMessage = document.getElementById("response-message");
    responseMessage.innerText = data;
    responseMessage.style.display = "block";

    if (data.includes("สำเร็จ")) {
      document.getElementById("contact-form").reset(); // รีเซ็ตฟอร์มถ้าส่งสำเร็จ
    }
  })
  .catch(error => {
    console.error("Error:", error);
    let responseMessage = document.getElementById("response-message");
    responseMessage.innerText = "ไม่สามารถส่งข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง";
    responseMessage.style.display = "block";
  });
});
