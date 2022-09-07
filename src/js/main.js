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
  const liftsArray = [];

  const liftsGroup = document.createElement('div');
  liftsGroup.setAttribute('class', 'lifts');

  for (let i = 0; i < lifts; i++) {
    const lift = document.createElement('div');
    lift.setAttribute('class', 'lift');
    liftsGroup.append(lift);
  }

  for (let i = 0; i < floors; i++) {
    const floor = document.createElement('div');
    floor.setAttribute('class', 'floor');
    const liftButtons = document.createElement('div');
    liftButtons.setAttribute('class', 'lift-buttons');
    const upBtn = document.createElement('button');
    upBtn.textContent = 'Up';
    const downBtn = document.createElement('button');
    downBtn.textContent = 'Down';
    liftButtons.append(upBtn, downBtn);
    const floorContainer = document.createElement('div');
    floorContainer.setAttribute('class', 'floor-container');
    floorContainer.append(liftButtons);
    if (i === 0) floorContainer.append(liftsGroup);

    const base = document.createElement('div');
    base.setAttribute('class', 'base');
    const floorBase = document.createElement('span');
    const floorTitle = document.createElement('h3');
    floorTitle.textContent = `Floor ${i + 1}`;
    base.append(floorBase, floorTitle);
    floor.append(floorContainer, base);

    floorsArray.unshift(floor);
  }

  floorsGroup.append(...floorsArray);
}
