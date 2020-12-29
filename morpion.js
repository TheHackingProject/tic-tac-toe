class Morpion {
	humanPlayer = 'J1';
	iaPlayer = 'J2';
	gameOver = false;
	gridMap = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	constructor(firstPlayer = 'J1') {
		this.humanPlayer = firstPlayer;
		this.iaPlayer = (firstPlayer === 'J1') ? 'J2' : 'J1';
		this.initGame();
	}

	initGame = () => {
		this.gridMap.forEach((line, y) => {
			line.forEach((cell, x) => {
				this.getCell(x, y).onclick = () => {
					this.playerTurn(x, y);
				};
			});
		});

		if (this.iaPlayer === 'J1') {
			this.iaTurn();
		}
	}

	displayEndMessage = (message) => {
		const endMessageElement = document.getElementById('end-message');
		endMessageElement.textContent = message;
		endMessageElement.style.display = 'block';
	}

	getCell = (x, y) => {
		const column = x + 1;
		const lines = ['A', 'B', 'C'];
		const cellId = `${lines[y]}${column}`;
		return document.getElementById(cellId);
	}

	drawHit = (x, y, player) => {
		if (this.gridMap[y][x] !== null) {
			return false;
		}

		this.gridMap[y][x] = player;
		this.getCell(x, y).classList.add(`filled-${player}`);
		this.checkWinner(player);
		return true;
	}

	isFull = () => {
		return this.gridMap.every((line) => (
			line.every((cell) => cell !== null)
		));
	}

	checkWinner = (lastPlayer) => {
		const one = this.gridMap[0][0];
		const two = this.gridMap[0][1];
		const three = this.gridMap[0][2];
		const four = this.gridMap[1][0];
		const five = this.gridMap[1][1];
		const six = this.gridMap[1][2];
		const seven = this.gridMap[2][0];
		const eight = this.gridMap[2][1];
		const nine = this.gridMap[2][2];

		if (one === two && one === three && one !== null ||
			four === five && four === six && four !== null ||
			seven === eight && seven === nine && seven !== null ||
			one === five && one === nine && one !== null ||
			three === five && three === seven && three !== null ||
			one === four && one === seven && one !== null ||
			two === five && two === eight && two !== null ||
			three === six && three === nine && three !== null
		) {
			this.gameOver = true;
			if (lastPlayer === this.iaPlayer) {
				this.displayEndMessage("L'IA a gagné !");
				return;
			}

			if (lastPlayer === this.humanPlayer) {
				this.displayEndMessage("Tu as battu l'IA !");
				return;
			}
		} else if (this.isFull()) {
			this.gameOver = true;
			this.displayEndMessage("Vous êtes à égalité !");
			return;
		}
	}

	playerTurn = (x, y) => {
		if (this.gameOver) {
			return;
		}

		if (this.drawHit(x, y, this.humanPlayer)) {
			this.iaTurn();
		}
	}

	iaTurn = () => {
		if (this.gameOver) {
			return;
		}

		let hasPlayed = false;
		this.gridMap.forEach((line, y) => {
			line.forEach((cell, x) => {
				if (!cell && !hasPlayed) {
					hasPlayed = this.drawHit(x, y, this.iaPlayer);
				}
			});
		});
	}
}

const morpion = new Morpion();
