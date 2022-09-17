const generateBtn = document.getElementById('generate-btn');
const floorsInput = document.getElementById('floors-input');
const liftsInput = document.getElementById('lifts-input');
const floorsGroup = document.getElementById('floors-group');

generateBtn.addEventListener('click', () => {
  const floorsCount = Number(floorsInput.value);
  const liftsCount = Number(liftsInput.value);

  buildSimulation(floorsCount, liftsCount);
});

function buildSimulation(floors, lifts) {
  const floorsArray = [];

  const liftsGroup = document.createElement('div');
  liftsGroup.setAttribute('class', 'lifts');

  for (let i = 0; i < lifts; i++) {
    const lift = document.createElement('div');
    lift.setAttribute('class', 'lift');
    lift.setAttribute('data-floor', `0`);
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
    callBtn.setAttribute('class', `floor-call`);
    callBtn.setAttribute('data-floor', `${i + 1}`);
    callBtn.textContent = 'Call';
    const floorTitle = document.createElement('h3');
    floorTitle.textContent = `Floor ${i + 1}`;
    liftButtons.append(callBtn, floorTitle);
    const floorContainer = document.createElement('div');
    floorContainer.setAttribute('class', 'floor-container');
    floorContainer.append(liftButtons);
    if (i === 0) floorContainer.append(liftsGroup);

    const base = document.createElement('div');
    base.setAttribute('class', 'base');
    floor.append(floorContainer, base);

    floorsArray.unshift(floor);
  }

  floorsGroup.append(...floorsArray);
}

document.addEventListener('click', (e) => {
  const floorCall = Number(e.target.dataset.floor);
  if (floorCall) {
    //Move the lift
    moveLift(floorCall);
  }
});

function moveLift(floorCall) {
  const lifts = document.querySelectorAll('.lift');
  for (const lift of lifts) {
    const currentFloor = Number(lift.dataset.floor);
    const { height } = document
      .querySelector(`[data-floor='${floorCall}']`)
      .getBoundingClientRect();
    if (currentFloor !== floorCall && !lift.classList.contains('busy')) {
      lift.style.transform = `translateY(-${height * (floorCall - 1)}px)`;
      lift.style.transition = `all ${floorCall * 2}s ease-in`;
      lift.dataset.floor = floorCall;
      lift.classList.add('busy');

      lift.addEventListener('transitionend', () =>
        lift.classList.remove('busy')
      );

      break;
    }
  }
}
