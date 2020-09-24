function make2DArray(rows, cols) {
	var arr = new Array(rows);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(cols);
	}
	return arr;
}
var grid;
var next;
var rows;
var cols;
var w = 10;

function setup() {
	createCanvas(1000, 1000);
	rows = width / w;
	cols = height / w;
	grid = make2DArray(rows, cols);
	next = make2DArray(rows, cols);
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = floor(random(2));
		}
	}
	// readFile("init.txt")
}

function draw() {
	background(0);
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			var x = i * w;
			var y = j * w;
			if (grid[i][j] == 1) {
				fill(255);
				stroke(0);
				rect(x, y, w, w)
			}
		}
	}


	// compute next grid
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			var cur = grid[i][j];
			if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
				next[i][j] = 0;
			}
			else {
				var numsOfNeighbors = countNeighbors(grid, i, j);
				if (cur == 0 && numsOfNeighbors == 3) {
					next[i][j] = 1;
				}
				else if (cur == 1 && (numsOfNeighbors < 2 || numsOfNeighbors > 3)) {
					next[i][j] = 0;
				}
				else {
					next[i][j] = grid[i][j];
				}
			}
		}
	}


	grid = next;

}

function countNeighbors(grid, x, y) {
	var sum = 0;
	for (var i = -1; i < 2; i++) {
		for (var j = -1; j < 2; j++) {
			// var row = (i + x + rows) % rows;
			// var col = (j + y + cols) % cols;
			// sum+=grid[row][col];
			sum += grid[x + i][y + j];
		}
	}
	sum -= grid[x][y];
	return sum;
}

function readFile(filename) {
	fetch(filename)
		.then(function (res) {
			return res.text();
		})
		.then(function (data) {
			var arr = data.split("\n")
			console.log(arr);
		})
		.catch(function (error) {
			console.log(error);
		})
}
