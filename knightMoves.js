#!/usr/bin/env node
class Square {
    constructor(squareIndex) {
        const row = Math.floor(squareIndex / 8);
        const column = squareIndex % 8;
        this.position = [row, column];
        this.possibleMoves = [];
    }
}
class Board {
    constructor() {
        this.list = this.buildGraph();
    }

    buildGraph() {
        const adjList = [];
        for (let i = 0; i < 64; i++) {
            const node = new Square(i);

            adjList.push(node);
        }
        for (let i = 0; i < adjList.length; i++) {
            const node = adjList[i];
            const row = Math.floor(i / 8);
            const column = i % 8;

            const potentialPossibleMoves = [
                [row + 1, column + 2],
                [row + 2, column + 1],
                [row - 1, column + 2],
                [row - 2, column + 1],
                [row - 2, column - 1],
                [row - 1, column - 2],
                [row + 1, column - 2],
                [row + 2, column - 1],
            ];
            const possiblePositions = potentialPossibleMoves.filter(
                (move) =>
                    move[0] >= 0 && move[1] >= 0 && move[0] <= 7 && move[1] <= 7
            );
            const possibleMovesIndices = possiblePositions.map((point) =>
                this.convert(point)
            );

            possibleMovesIndices.forEach((index) => {
                node.possibleMoves.push(adjList[index]);
            });
        }

        return adjList;
    }

    convert(point) {
        return point[0] * 8 + point[1];
    }
}
const board = new Board();

function knightMoves(startPoint, endPoint) {
    const startPointIndex = board.convert(startPoint);
    const endPointIndex = board.convert(endPoint);
    if (startPoint.join() === endPoint.join()) {
        return "the start point and end point are the same!";
    } else {
        board.list[startPointIndex].parent = null;
        board.list[startPointIndex].distance = 0;
        const Q = [];
        Q.push(board.list[startPointIndex]);
        let keepGoing = true;
        let result = null;
        while (Q.length !== 0 && keepGoing) {
            const currentNode = Q[0];
            currentNode.possibleMoves.forEach((move) => {
                if (!Object.hasOwn(move, "distance")) {
                    if (move === board.list[endPointIndex]) {
                        keepGoing = false;
                        result = move;
                        result.parent = currentNode;
                        result.distance = currentNode.distance + 1;
                    } else {
                        move.distance = currentNode.distance + 1;
                        move.parent = currentNode;
                        Q.push(move);
                    }
                }
            });
            Q.shift();
        }
        const path = [startPoint];
        while (result.parent !== null) {
            path.splice(1, 0, result.position);
            result = result.parent;
        }
        return path;
    }
}
console.log(knightMoves([3, 3], [4, 3]));
