let exerciseName = document.getElementById("exerciseName");
let exerciseWeight = document.getElementById("exerciseWeight");
let exerciseReps = document.getElementById("exerciseReps");
let saveBtn = document.getElementById("saveBtn");
let message = document.getElementById("message");
let workoutList = document.getElementById("workoutList");

let workouts = [];
let editindex = null;

let savedWorkouts = localStorage.getItem("workouts");

if (savedWorkouts !== null) {
    workouts = JSON.parse(savedWorkouts);
}

function saveWorkouts() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

function displayWorkouts(){
    workoutList.innerHTML = "";
    
    workouts.forEach(function(workout, index){
        workoutList.innerHTML += `
        <div class="product-card">
            <h3>${workout.name}</h3>
            <p>Weight: ${workout.weight} KG</p>
            <p>Reps/Sets: ${workout.reps}</p>
            <button onclick="editWorkout(${index})">Edit</button>
            <button onclick="deleteWorkout(${index})">Delete</button>
        </div>
        `;
    });
}

saveBtn.addEventListener("click", function(){
    let workout = {
        name: exerciseName.value,
        weight: exerciseWeight.value,
        reps: exerciseReps.value
    };

    if (editindex === null) {
       workouts.push(workout);
       message.textContent = "Workout Logged Successfully";
    } else {
        workouts[editindex] = workout;
        editindex = null;
        saveBtn.textContent = "Log Workout";
        message.textContent = "Workout Updated Successfully";
    }

    saveWorkouts();
    displayWorkouts();

    exerciseName.value = "";
    exerciseWeight.value = "";
    exerciseReps.value = "";
});

function editWorkout (index) {
    exerciseName.value = workouts[index].name;
    exerciseWeight.value = workouts[index].weight;
    exerciseReps.value = workouts[index].reps;

    editindex = index;
    saveBtn.textContent = "Update Workout";
}

function deleteWorkout (index) {
    workouts.splice(index, 1);

    saveWorkouts();
    displayWorkouts();
    message.textContent = "Workout Deleted Successfully";
}

displayWorkouts();