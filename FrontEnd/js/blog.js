const destinations = [
  "Paris, France",
  "Rome, Italy",
  "Barcelona, Spain",
  "Santorini, Greece",
  "Bali, Indonesia"
];

const tips = [
  "Always carry a map and a local guidebook.",
  "Research local customs and etiquette before visiting a new place.",
  "Pack comfortable shoes for walking and exploring.",
  "Make copies of important documents, such as your passport and travel insurance policy.",
  "Budget for unexpected expenses, such as unexpected transportation costs or meals."
];

const destinationList = document.querySelector("#destination-list");

const tipList = document.querySelector("#tip-list");

destinations.forEach(destination => {
  const item = document.createElement("li");
  item.textContent = destination;
  destinationList.appendChild(item);
});

tips.forEach(tip => {
  const item = document.createElement("li");
  item.textContent = tip;
  tipList.appendChild(item);
});
