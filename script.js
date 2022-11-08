const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
const submission = []

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', '1')
    inputElement.setAttribute('max', '9')
    if (
      ((i % 9 == 0))
    ) {
      inputElement.classList.add('add-section')
    }



    puzzleBoard.appendChild(inputElement)
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })
    console.log(submission)
}

const populateValues = (isSolvable, solution) => {
    const imput = document.querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
        solutionDisplay.innerHTML = "This is the Answer"
    } else {
      solutionDisplay.innerHTML = "This is not solvable"
    }
}

const solve = async () => {
    joinValues()
  const data = { numbers: submission.join('') }

  fetch('http://localhost:8000/solve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data)
    populateValues(data.solvable, data.solution)
    submission = []
  })
  .catch((error) => {
    console.error('Error:', error)
  })

}

solveButton.addEventListener('click', solve)