document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("workout-form");
  const workoutList = document.getElementById("workout-list");
  const totalWorkoutsEl = document.getElementById("total-workouts");
  const totalCaloriesEl = document.getElementById("total-calories");
  const averageDurationEl = document.getElementById("average-duration");
  const ctx = document.getElementById("workout-chart").getContext("2d");
  const motivationQuote = document.getElementById("motivation-quote");
  const goalInput = document.getElementById("goal");
  const progressInput = document.getElementById("progress");
  const progressBar = document.getElementById("progressBar");
  const message = document.getElementById("message");
  const reminderBtn = document.getElementById("reminder-btn");

  let workouts = [];

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = document.getElementById("workout-type").value;
    const duration = parseInt(document.getElementById("duration").value);
    const calories = parseInt(document.getElementById("calories").value);
    const date = document.getElementById("date").value;

    if (!type || !duration || !calories || !date) {
      alert("Please fill out all fields.");
      return;
    }

    const workout = { type, duration, calories, date };
    workouts.push(workout);
    updateWorkoutList();
    updateStatistics();
    updateChart();

    form.reset();
  });

  // Update the workout display
  function updateWorkoutList() {
    workoutList.innerHTML = ""; // Clear current list

    workouts.forEach((workout, index) => {
      const li = document.createElement("li");
      li.classList.add("workout-item"); // Add class for styling

      // Create workout description text
      const workoutText = document.createElement("span");
      workoutText.textContent = `${workout.date} - ${workout.type}: ${workout.duration} mins, ${workout.calories} kcal`;

      // Create the combined button (like + delete)
      const actionBtn = document.createElement("button");
      actionBtn.classList.add("action-btn");
      // Update the button text based on the workout's favorite status
      actionBtn.textContent = workout.isFavorite ? "💖 ❌" : "❤️ ❌";

      // Handle the click on the combined button
      actionBtn.onclick = () => {
        if (workout.isFavorite) {
          // If it's already favorited, delete the workout
          workouts.splice(index, 1);
          updateStatistics();
          updateChart();
        } else {
          // If it's not favorited, toggle the favorite status
          workouts[index].isFavorite = !workout.isFavorite;
        }
        updateWorkoutList(); // Re-render the list
      };

      // Append workout text and the action button to the list item
      li.appendChild(workoutText);
      li.appendChild(actionBtn);

      // Append the list item to the workout list
      workoutList.appendChild(li);
    });
  }

  // Update statistics
  function updateStatistics() {
    totalWorkoutsEl.textContent = workouts.length;
    const totalCalories = workouts.reduce(
      (sum, workout) => sum + workout.calories,
      0
    );
    totalCaloriesEl.textContent = totalCalories;

    const averageDuration =
      workouts.length > 0
        ? (
            workouts.reduce((sum, workout) => sum + workout.duration, 0) /
            workouts.length
          ).toFixed(2)
        : 0;
    averageDurationEl.textContent = averageDuration;

    if (duration <= 0 || calories <= 0) {
      alert("Please enter valid values for duration and calories.");
      return;
    }
  }

  // Chart.js Visualization
  let workoutChart;

  function updateChart() {
    const workoutTypes = [...new Set(workouts.map((w) => w.type))]; // Unique workout types
    const dataCounts = workoutTypes.map(
      (type) => workouts.filter((w) => w.type === type).length
    );

    if (workoutChart) {
      workoutChart.destroy();
    }

    workoutChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: workoutTypes,
        datasets: [
          {
            label: "Workout Count",
            data: dataCounts,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  let earnedBadges = [];

  // Badge conditions
  const badgeCriteria = {
    "🎉Beginner: First Workout Logged": (workouts) => workouts.length === 1,
    "🔥GymBro: 1000 Calories Burned": (workouts) =>
      totalCalories(workouts) >= 1000,
    "🔥Personal Trainer: 3000 Calories Burned": (workouts) =>
      totalCalories(workouts) >= 3000,
    "⏳Hardworker: First One Hour Workout": (workouts) =>
      workouts.some((w) => w.duration >= 60),
    "🏅Marathoner: First Two Hour Workout": (workouts) =>
      workouts.some((w) => w.duration >= 120),
    "💪Beast Mode: 500 Calories in Single Workout": (workouts) =>
      workouts.some((w) => w.calories >= 500),
  };

  function totalCalories(workouts) {
    return workouts.reduce((sum, workout) => sum + workout.calories, 0);
  }

  function checkAchievements(workouts) {
    for (const [badge, condition] of Object.entries(badgeCriteria)) {
      if (condition(workouts) && !earnedBadges.includes(badge)) {
        earnedBadges.push(badge);
        showAchievementPopup(badge);
      }
    }
  }

  function showAchievementPopup(badge) {
    const popup = document.createElement("div");
    popup.classList.add("achievement-popup");
    popup.textContent = `🏆 Achievement Unlocked: ${badge}!`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
  }

  function showAllBadges() {
    const badgePopup = document.createElement("div");
    badgePopup.classList.add("badge-popup");
    badgePopup.innerHTML = `
            <h2>🏅 Earned Badges</h2>
            <ul>${earnedBadges.map((b) => `<li>${b}</li>`).join("")}</ul>
            <button id="close-badge-popup">Close</button>
        `;
    document.body.appendChild(badgePopup);
    document
      .getElementById("close-badge-popup")
      .addEventListener("click", () => badgePopup.remove());
  }

  // Button to view all badges
  const badgeButton = document.createElement("button");
  badgeButton.textContent = "View Badges";
  badgeButton.classList.add("badge-button");
  badgeButton.addEventListener("click", showAllBadges);
  document.body.appendChild(badgeButton);

  // Hook into existing workout update logic
  setInterval(() => {
    if (typeof workouts !== "undefined") {
      checkAchievements(workouts);
    }
  }, 1000);

  //Countdown Timer
  let countdowns = [];

  function showCountdownPopup() {
    const popup = document.createElement("div");
    popup.classList.add("countdown-popup");
    popup.innerHTML = `
            <h2>Set Timer</h2>
            <label for="time-amount">Enter Time:</label>
            <input type="number" id="time-amount" min="1" required>
            <select id="time-unit">
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
                <option value="seconds">Seconds</option>
            </select>
            <button id="start-countdown">Start Timer</button>
            <button id="close-countdown">Close</button>
            <div id="countdown-list"></div>
        `;
    document.body.appendChild(popup);

    document
      .getElementById("start-countdown")
      .addEventListener("click", () => startCountdown(popup));
    document
      .getElementById("close-countdown")
      .addEventListener("click", () => popup.remove());
  }

  function startCountdown(popup) {
    const amount = parseInt(document.getElementById("time-amount").value);
    const unit = document.getElementById("time-unit").value;
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid time.");
      return;
    }

    let endTime;
    switch (unit) {
      case "days":
        endTime = Date.now() + amount * 24 * 60 * 60 * 1000;
        break;
      case "hours":
        endTime = Date.now() + amount * 60 * 60 * 1000;
        break;
      case "minutes":
        endTime = Date.now() + amount * 60 * 1000;
        break;
      case "seconds":
        endTime = Date.now() + amount * 1000;
        break;
    }

    const countdown = { id: Date.now(), endTime, interval: null };
    countdowns.push(countdown);
    updateCountdowns(popup);
    countdown.interval = setInterval(() => updateCountdowns(popup), 1000);
  }

  function updateCountdowns(popup) {
    const list = popup.querySelector("#countdown-list");
    if (!list) return;
    list.innerHTML = "";
    countdowns.forEach((countdown, index) => {
      const remaining = countdown.endTime - Date.now();
      if (remaining <= 0) {
        clearInterval(countdown.interval);
        countdowns.splice(index, 1);
        showCountdownEndPopup();
        return;
      }
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      const countdownItem = document.createElement("div");
      countdownItem.innerHTML = `
                Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s
                <button class="reset-button" data-id="${countdown.id}">Reset</button>
            `;
      list.appendChild(countdownItem);
    });

    document.querySelectorAll(".reset-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        resetCountdown(parseInt(event.target.dataset.id));
      });
    });
  }

  function resetCountdown(id) {
    countdowns = countdowns.filter((countdown) => countdown.id !== id);
  }

  function showCountdownEndPopup() {
    const endPopup = document.createElement("div");
    endPopup.classList.add("countdown-end-popup");
    endPopup.innerHTML = `
            <h2>Your timer has elapsed!</h2>
            <button id="close-end-popup">Close</button>
        `;
    document.body.appendChild(endPopup);

    document
      .getElementById("close-end-popup")
      .addEventListener("click", () => endPopup.remove());
  }

  const countdownButton = document.createElement("button");
  countdownButton.textContent = "Timer";
  countdownButton.classList.add("countdown-button");
  countdownButton.addEventListener("click", showCountdownPopup);
  document.body.appendChild(countdownButton);
  function updateStatistics() {
    const totalDur = workouts.reduce(
      (sum, workout) => sum + workout.duration,
      0
    );
    const totalCal = workouts.reduce(
      (sum, workout) => sum + workout.calories,
      0
    );
    totalWorkoutsEl.textContent = workouts.length;
    totalCaloriesEl.textContent = totalCal;
    averageDurationEl.textContent =
      workouts.length > 0 ? (totalDur / workouts.length).toFixed(2) : 0;
  }

  function setGoal() {
    document.getElementById("setGoalBtn").addEventListener("click", setGoal);
    let goal = Number(document.getElementById("goal").value);

    if (isNaN(goal) || goal <= 0) {
      alert("Please enter a valid goal greater than 0.");
      return;
    }
    progress = 0;
    progressBar.style.width = "0%";
    progressBar.innerText = "0%";
  }

  function updateProgress() {
    document
      .getElementById("updateProgressBtn")
      .addEventListener("click", updateProgress);
    let goal = Number(document.getElementById("goal").value);
    let newProgress = Number(progressInput.value);
    if (isNaN(newProgress) || newProgress <= 0) {
      alert("Please enter a valid progress amount.");
      return;
    } else if (newProgress > goal) {
      alert("Error!");
      return;
    }

    progress = newProgress;
    const percentage = Math.floor((progress / goal) * 100);
    progressBar.style.width = `${percentage}%`;
    progressBar.innerText = `${Math.round(percentage)}%`;

    if (percentage === 50) {
      message.innerText = "You're halfway there! Keep going!";
    } else if (percentage === 100) {
      message.innerText = "Congratulations, goal achieved!";
      /* document.getElementById("update-progress-btn").disabled = true; */
    } else if (percentage > 50) {
      message.innerText = "You're almost there!! You got this!";
    } else {
      message.innerText = "Just keep pushing!!";
    }
  }

  document
    .getElementById("updateProgressBtn")
    .addEventListener("click", updateProgress);
  document.getElementById("setGoalBtn").addEventListener("click", setGoal);
});
const motivationQuotes = [
  "Keep pushing yourself, because no one else is going to do it for you!",
  "The body achieves what the mind believes.",
  "Don't stop when you're tired. Stop when you're done!",
  "The secret of getting ahead is getting started.",
  "The real workout starts when you want to stop.",
  "The secret of getting ahead is getting started.",
];

function showMotivationalQuote(item) {
  let randomIndex = Math.floor(Math.random() * motivationQuotes.length);
  document.getElementById("motivation-quote").innerText =
    motivationQuotes[randomIndex];
}
