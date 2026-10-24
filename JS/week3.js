// Exercise 1 : Item array removal

const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];

const nameToRemove = "Ahmad";

// Write some code here
const index = names.indexOf(nameToRemove);

if (index !== -1) {
  names.splice(index, 1);
}
// Code done

console.log(names);

// Exercise 2 : When will we be there??

const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

function calculateTravelTime(travelInformation) {
  const hours = travelInformation.destinationDistance / travelInformation.speed;

  const fullHours = Math.floor(hours);
  const minutes = Math.round((hours - fullHours) * 60);

  return `${fullHours} hours and ${minutes} minutes`;
}

const travelTime = calculateTravelTime(travelInformation);

console.log(travelTime);

// Excercise 3 : Series duration of my life

const seriesDurations = [
  {
    title: "D.R House",
    days: 5,
    hours: 9,
    minutes: 4,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "Better call Saul",
    days: 7,
    hours: 10,
    minutes: 25,
  },
];

function logOutSeriesText() {
  const lifespanMinutes = 80 * 365 * 24 * 60;
  let totalPercentage = 0;

  for (const series of seriesDurations) {
    const daysInMinutes = series.days * 24 * 60;
    const hoursInMinutes = series.hours * 60;

    const totalMinutes = daysInMinutes + hoursInMinutes + series.minutes;

    const percentage = (totalMinutes / lifespanMinutes) * 100;

    console.log(`${series.title} took ${percentage.toFixed(3)}% of my life`);

    totalPercentage += percentage;
  }

  console.log(`In total that is ${totalPercentage.toFixed(3)}% of my life`);
}

logOutSeriesText();

// Excercise 4 : NOnoN0nOYes Note taking app

const notes = [];

function saveNote(content, id) {
  const note = {
    content: content,
    id: id,
  };

  notes.push(note);
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

function getNote(id) {
  if (typeof id !== "number") {
    console.log("Error: ID must be a number");
    return;
  }

  for (const note of notes) {
    if (note.id === id) {
      return note;
    }
  }

  return undefined;
}

const firstNote = getNote(1);
console.log(firstNote);

function logOutNotesFormatted() {
  for (const note of notes) {
    console.log(
      `The note with id: ${note.id}, has the following note text: ${note.content}`,
    );
  }
}

logOutNotesFormatted();

// 4. New feature: Delete a note :)
function deleteNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1);
      console.log("Deleted");
      return;
    }
  }

  console.log("Note not found");
}
