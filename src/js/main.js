const generateBtn = document.getElementById('generate-btn');
const floorsInput = document.getElementById('floors-input');
const liftsInput = document.getElementById('lifts-input');
const floorsGroup = document.getElementById('floors-group');

generateBtn.addEventListener('click', () => {
  const floorsCount = Number(floorsInput.value);
  const liftsCount = Number(liftsInput.value);

  floorsGroup.innerHTML = '';

  buildSimulation(floorsCount, liftsCount);
});

function buildSimulation(floors, lifts) {
  const floorsArray = [];

  const liftsGroup = document.createElement('div');
  liftsGroup.setAttribute('class', 'lifts');

  for (let i = 0; i < lifts; i++) {
    const lift = document.createElement('div');
    lift.setAttribute('class', 'lift');
    lift.setAttribute('data-floor', `1`);
    lift.setAttribute('data-lift', `${i + 1}`);
    liftsGroup.append(lift);
  }

  for (let i = 0; i < floors; i++) {
    const floor = document.createElement('div');
    floor.setAttribute('class', 'floor');
    floor.setAttribute('data-floor', `${i + 1}`);
    const liftButtons = document.createElement('div');
    liftButtons.setAttribute('class', 'lift-buttons');
    const callBtn = document.createElement('button');
    callBtn.setAttribute('class', `floor-call-btn`);
    callBtn.setAttribute('data-floor', `${i + 1}`);
    callBtn.textContent = 'Call';
    const floorTitle = document.createElement('h3');
    floorTitle.textContent = `Floor ${i + 1}`;
    liftButtons.append(callBtn, floorTitle);
    const floorContainer = document.createElement('div');
    floorContainer.setAttribute('class', 'floor-container');
    floorContainer.append(liftButtons);
    if (i === 0) floorContainer.append(liftsGroup);

    floor.append(floorContainer);
    floorsArray.unshift(floor);
  }

  floorsGroup.append(...floorsArray);
}
const floorCalls = new Set();
document.addEventListener('click', (e) => {
  const floorCall = Number(e.target.dataset.floor);
  floorCalls.add(floorCall);
  if (floorCall) {
    //Move the lift
    moveLift(floorCall);
  }
});

function getClosesLift(floorCall, lifts) {
  let distance = 0;
  let lift = '';

  for (const _lift of lifts) {
    // getting distance between the currentFloorCall and the lift
    const floorDistance = Math.abs(floorCall - Number(_lift.dataset.floor));

    // finding closest lift to the floorCall based on floor Distance
    if (distance > floorDistance || !distance) {
      distance = floorDistance;
      lift = _lift;
    }
  }

  return { lift, distance };
}

function moveLift(floorCall) {
  const lifts = Array.from(document.querySelectorAll('.lift'));

  // getting all the non-busy lifts
  const nonBusyLifts = lifts.filter((lift) => !lift.classList.contains('busy'));

  // get the closes lift to the current Floor
  const { lift, distance } = getClosesLift(floorCall, nonBusyLifts);

  const currentFloor = Number(lift.dataset.floor);

  const { height } = document
    .querySelector(`[data-floor='${floorCall}']`)
    .getBoundingClientRect();

  if (currentFloor !== floorCall) {
    lift.style.transform = `translateY(-${height * (floorCall - 1)}px)`;
    lift.style.transition = `all ${distance * 2}s ease-in`;
    lift.dataset.floor = floorCall;
    lift.classList.add('busy');

    lift.addEventListener('transitionend', () => lift.classList.remove('busy'));
  }
}
