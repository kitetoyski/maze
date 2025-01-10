import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const MazeGame = () => {
  const canvasRef = useRef(null);

  const levels = [
    {
      maze: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
      ],
      twist: "Level 1",
    },
    {
      maze: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ],
      twist: "Level 2",
    },
    {
      maze: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ],
      twist: "Level 3",
    },
    {
      maze: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ],
      twist: "Level 4",
    },
    {
      maze: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      twist: "Level 5",
    },
  ];

  const [level, setLevel] = useState(0);
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [goal, setGoal] = useState({ x: 3, y: 3 });
  const cellSize = 40;

  const movePlayer = (dx, dy) => {
    const newX = player.x + dx;
    const newY = player.y + dy;
    const maze = levels[level].maze;

    if (maze[newY][newX] === 0) {
      setPlayer({ x: newX, y: newY });

      if (newX === goal.x && newY === goal.y) {
        if (level === levels.length - 1) {
          showFinalMessage();
        } else {
          showLevelCompleteMessage();
          setLevel(level + 1);
          setPlayer({ x: 1, y: 1 });
          setGoal({
            x: levels[level + 1].maze[0].length - 2,
            y: levels[level + 1].maze.length - 2,
          });
        }
      }
    }
  };

  const showLevelCompleteMessage = () => {
    Swal.fire({
      title: `Level ${level + 1} Complete!`,
      text: `Prepare for Level ${level + 2}: ${levels[level + 1].twist}`,
      icon: "success",
      confirmButtonText: "Next Level",
    });
  };

  const showFinalMessage = () => {
    Swal.fire({
      title: "Will you be my girlfriend? 💖",
      text: "I hope this maze journey was fun! 💕",
      icon: "question",
      confirmButtonText: "Yes 💕",
    }).then(() => {
      Swal.fire("Yayyy!", "Thank you for saying Yes! 💞 I Love you, December! 💞", "success");
    });
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        movePlayer(0, -1);
        break;
      case "ArrowDown":
        movePlayer(0, 1);
        break;
      case "ArrowLeft":
        movePlayer(-1, 0);
        break;
      case "ArrowRight":
        movePlayer(1, 0);
        break;
      default:
        break;
    }
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const maze = levels[level].maze;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        ctx.fillStyle = maze[row][col] === 1 ? "#888" : "#222";
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }

    ctx.fillStyle = "#00f";
    ctx.fillRect(player.x * cellSize + 5, player.y * cellSize + 5, cellSize - 10, cellSize - 10);

    ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.arc(
      goal.x * cellSize + cellSize / 2,
      goal.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  useEffect(() => {
    drawGame();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Maze Game</h1>
      <p>
        Level {level + 1}
      </p>
      <canvas ref={canvasRef} width={1000} height={1400}></canvas>
    </div>
  );
};

export default MazeGame;
