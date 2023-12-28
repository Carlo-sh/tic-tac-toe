// Variables

const playBtn = document.getElementById('play-btn');
const resetBtn = document.getElementById('reset-btn');
const playerX = document.getElementById('player-1');
const playerO = document.getElementById('player-2');
const player1 = document.createElement('h2');
const player2 = document.createElement('h2');
const wrapper1 = document.getElementById('p1-wrapper');
const wrapper2 = document.getElementById('p2-wrapper');
const grid = document.querySelectorAll('.cell');
const playerTurn = document.getElementById('turn');
let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let turn = 0;

// Event Listeners

grid.forEach(cell =>
	cell.addEventListener('click', () => {
		const xo = !(turn % 2) ? 'O' : 'X';
		if (wrapper1.lastElementChild.tagName !== 'H2' || cell.innerHTML) return;
		if (/Win/g.test(playerTurn.textContent)) return;
		const icon = document.createElement('img');
		icon.setAttribute('src', `./icons/${!(turn % 2) ? 'circle' : 'cross'}-svgrepo-com.svg`);
		cell.appendChild(icon);
		gameBoard.splice(+cell.dataset.num, 1, `${xo}`);
		if (checkWin(gameBoard)) {
			playerTurn.textContent = `Player ${xo} Win!`;
			return;
		} else {
			turn++;
			playerTurn.textContent = `${!(turn % 2) ? 'O' : 'X'} turn`;
		}
		if (turn === 10 && !checkWin(gameBoard)) playerTurn.textContent = 'Draw!';
	})
);

playBtn.addEventListener('click', () => {
	if (playerX.value === '' || playerO.value === '') {
		alert('Please, enter players names');
		return;
	}
	if (playerTurn.textContent !== '') return;
	turn++;
	playerTurn.textContent = `${!(turn % 2) ? 'O' : 'X'} turn`;
	player1.textContent = playerX.value;
	player2.textContent = playerO.value;
	wrapper1.replaceChild(player1, playerX);
	wrapper2.replaceChild(player2, playerO);
});

resetBtn.addEventListener('click', () => {
	if (wrapper1.lastElementChild.tagName === 'INPUT') return;
	grid.forEach(cell => (cell.innerHTML = ''));
	playerTurn.textContent = '';
	wrapper1.replaceChild(playerX, player1);
	wrapper2.replaceChild(playerO, player2);
	playerX.value = '';
	playerO.value = '';
	gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	turn = 0;
});

// Functions

const checkWin = arr => {
	if (
		(arr[0] == arr[1] && arr[0] == arr[2]) ||
		(arr[3] == arr[4] && arr[3] == arr[5]) ||
		(arr[6] == arr[7] && arr[6] == arr[8]) ||
		(arr[0] == arr[3] && arr[0] == arr[6]) ||
		(arr[1] == arr[4] && arr[1] == arr[7]) ||
		(arr[2] == arr[5] && arr[2] == arr[8]) ||
		(arr[0] == arr[4] && arr[0] == arr[8]) ||
		(arr[2] == arr[4] && arr[2] == arr[6])
	)
		return true;
	return false;
};
