const datePicker = document.getElementById("datePicker");
const fetchBtn = document.getElementById("fetchBtn");
const eventsDiv = document.getElementById("events");

const today = new Date();
datePicker.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

fetchBtn.addEventListener("click", () => {
  const selectedDate = new Date(datePicker.value);
  if (!selectedDate) return;

  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();

  eventsDiv.innerHTML = "<p>⏳ Loading events...</p>";

  fetch(`https://history.muffinlabs.com/date/${month}/${day}`)
    .then(response => response.json())
    .then(data => {
      const events = data.data.Events;
      if (events.length === 0) {
        eventsDiv.innerHTML = "<p>No events found for this date.</p>";
        return;
      }
      eventsDiv.innerHTML = "";
      events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
          <h3>${event.year}</h3>
          <p>${event.text}</p>
        `;
        eventsDiv.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error:", error);
      eventsDiv.innerHTML = "<p>Failed to fetch events. Please try again.</p>";
    });
});

fetchBtn.click();