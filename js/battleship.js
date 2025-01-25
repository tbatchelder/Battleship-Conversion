// import turtle
// import random
//
// # Set up the screen
// screen = turtle.Screen()
// screen.setup(800, 600)  # Increased width to accommodate legend
// screen.title("Battleship")
// screen.bgcolor("white")
//
// # Create turtles
// t = turtle.Turtle()  # For the grid and ships
// legend = turtle.Turtle()  # For the legend
// message = turtle.Turtle()  # For messages
//
// for pen in [t, legend, message]:
//     pen.speed(0)
//     pen.hideturtle()
//
// # Create grid variables
// grid_size = 10
// cell_size = 35
// grid_origin_x = -250  # Shifted left to make room for legend
// grid_origin_y = 175
//
// # Colors
// OCEAN_BLUE = "#1E90FF"
// SHIP_GRAY = "#707070"
//
// # Ship information
// ships_info = [
//     {"name": "Carrier", "length": 5, "positions": [], "sunk": False},
//     {"name": "Battleship", "length": 4, "positions": [], "sunk": False},
//     {"name": "Cruiser", "length": 3, "positions": [], "sunk": False},
//     {"name": "Submarine", "length": 3, "positions": [], "sunk": False},
//     {"name": "Destroyer", "length": 2, "positions": [], "sunk": False}
// ]
//
// # Initialize game board
// board = [[' ' for _ in range(grid_size)]for _ in range(grid_size)]
//
// def draw_grid():
//     """Draw the game board grid"""
//     t.penup()
//     t.color(OCEAN_BLUE)
//     t.begin_fill()
//     t.goto(grid_origin_x, grid_origin_y)
//     t.setheading(0)
//     for _ in range(4):
//         t.forward(grid_size * cell_size)
//         t.right(90)
//     t.end_fill()
//     t.color("white")
//     for i in range(grid_size + 1):
//         t.goto(grid_origin_x, grid_origin_y - i * cell_size)
//         t.pendown()
//         t.forward(grid_size * cell_size)
//         t.penup()
//     t.left(90)
//     for i in range(grid_size + 1):
//         t.goto(grid_origin_x + i * cell_size, grid_origin_y)
//         t.pendown()
//         t.forward(-(grid_size * cell_size))
//         t.penup()
//     t.color("black")
//     for i in range(grid_size):
//         t.goto(grid_origin_x + i * cell_size + cell_size/2, grid_origin_y + 20)
//         t.write(chr(65 + i), align="center")
//     for i in range(grid_size):
//         t.goto(grid_origin_x - 20, grid_origin_y - i * cell_size - cell_size/2)
// t.write(str(i + 1), align = "center")
//
// def draw_legend():
//     """Draw the ship legend with sunk status"""
//     legend.clear()
//     legend.penup()
//     legend.color("black")
//     legend.goto(200, 250)
//     legend.write("Ships:", font=("Arial", 16, "bold"))
//     y = 220
//     for ship in ships_info:
//         status = "X" if ship["sunk"] else " "
//         legend.goto(200, y)
//         legend.write(f"[{status}] {ship['name']} ({ship['length']})", font=("Arial", 12, "normal"))
//         y -= 30

// def can_place_ship(length, x, y, horizontal):
//     if horizontal:
//         if x + length > grid_size:
//             return False
//         return all(board[y][x+i] == ' ' for i in range(length))
//     else:
//         if y + length > grid_size:
//             return False
//         return all(board[y+i][x] == ' ' for i in range(length))

// def place_ship(ship):
//     while True:
//         x = random.randint(0, grid_size-1)
//         y = random.randint(0, grid_size-1)
//         horizontal = random.choice([True, False])
        
//         if can_place_ship(ship["length"], x, y, horizontal):
//             ship_positions = []
//             if horizontal:
//                 for i in range(ship["length"]):
//                     board[y][x+i] = 'S'
//                     ship_positions.append((x+i, y))
//             else:
//                 for i in range(ship["length"]):
//                     board[y+i][x] = 'S'
//                     ship_positions.append((x, y+i))
            
//             ship["positions"] = ship_positions
            
//             # Draw ship (for debugging)
//             t.color(OCEAN_BLUE) #USE SHIP_GRAY TO SEE THE SHIPS
//             for pos_x, pos_y in ship_positions:
//                 t.penup()
//                 t.goto(grid_origin_x + pos_x * cell_size + 5,
//                       grid_origin_y - pos_y * cell_size - cell_size + 5)
//                 t.begin_fill()
//                 for _ in range(4):
//                     t.forward(cell_size - 10)
//                     t.right(90)
//                 t.end_fill()
//             break

// def place_ships():
//     for ship in ships_info:
//         place_ship(ship)
//     return [pos for ship in ships_info for pos in ship["positions"]]

// def show_message(msg, color="red"):
//     message.clear()
//     message.penup()
//     message.goto(0, -280)
//     message.color(color)
//     message.write(msg, align="center", font=("Arial", 12, "normal"))
    
//     # Wait for a short time so the message can be read
//     screen.ontimer(lambda: None, 2000)  # 2 second pause

// def draw_peg(x, y, hit):
//     t.penup()
//     t.goto(grid_origin_x + x * cell_size + cell_size/2 + cell_size/4,
//           grid_origin_y - y * cell_size - cell_size/2)
//     t.color("red" if hit else "white")
//     t.begin_fill()
//     t.circle(cell_size/4)
//     t.end_fill()

// def check_sunk_ships():
//     for ship in ships_info:
//         if not ship["sunk"] and all(pos in guessed_positions for pos in ship["positions"]):
//             ship["sunk"] = True
//             draw_legend()
//             return ship["name"]
//     return None

// def play_game():
//     global guessed_positions
//     draw_grid()
//     draw_legend()
//     all_ship_positions = place_ships()
    
//     hits = 0
//     total_ship_cells = sum(ship["length"] for ship in ships_info)
//     guessed_positions = set()
//     show_message("Welcome to Battleship! Enter your first guess.", "blue")
    
//     while hits < total_ship_cells:
//         guess = screen.textinput("Make a guess", "Enter coordinates (e.g., A1):")
//         if not guess:
//             break
            
//         try:
//             message.clear()  # Clear any previous message
            
//             col = ord(guess[0].upper()) - ord('A')
//             row = int(guess[1:]) - 1
            
//             if not (0 <= col < grid_size and 0 <= row < grid_size):
//                 raise ValueError("Coordinates out of bounds!")
            
//             if (col, row) in guessed_positions:
//                 raise ValueError("You already guessed that position!")
            
//             guessed_positions.add((col, row))
//             hit = (col, row) in all_ship_positions
//             draw_peg(col, row, hit)
            
//             if hit:
//                 hits += 1
//                 sunk_ship = check_sunk_ships()
//                 if sunk_ship:
//                     show_message(f"You sunk the {sunk_ship}!", "green")
//                 else:
//                     show_message("Hit!", "green")
                
//                 if hits == total_ship_cells:
//                     show_message("You won! All ships sunk!", "green")
//                     screen.textinput("Game Over", "Congratulations! You won!")
//                     break
//             else:
//                 show_message("Miss!", "blue")
            
//         except ValueError as e:
//             show_message(str(e), "red")





// Create a game space for it
let bs = [];

bs.ships_info = [];
bs.ships_info[0] = {"name": "Carrier", "length": 5, "hits": 0, "sunk": false };
bs.ships_info[1] = {"name": "Battleship", "length": 4, "hits": 0, "sunk": false};
bs.ships_info[2] = {"name": "Cruiser", "length": 3, "hits": 0, "sunk": false};
bs.ships_info[3] = {"name": "Submarine", "length": 3, "hits": 0, "sunk": false};
bs.ships_info[4] = {"name": "Destroyer", "length": 2, "hits": 0, "sunk": false};

bs.board = document.getElementById("board");

bs.boardList = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


// Can the ship be placed into the table here
function canPlaceShip(horizontal, x, y, len) {
  if (horizontal) {
    if ((y + len) < 11) {
      if (notFilled(true, x, y, len)) {
        return true;
      }
    }
  } else {
    if ((x + len) < 11) {
      if (notFilled(false, x, y, len)) {
        return true;
      }
    }
  }
  return false;
}

// Determine if the place selected is empty enough for the ship
function notFilled(h, x, y, len) {
  if (h) {
    for (let i = 0; i < len; i++) {
      if (bs.boardList[x][y + i] == 1) {
        return false;
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      if (bs.boardList[y][x + i] == 1) {
        return false;
      }
    }
  }
  return true;
}

function place_ship(ship,k) {
  let placed = false;
  const boolArray = [true, false];

  while (!placed) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    const horizontal = boolArray[Math.floor(Math.random() * boolArray.length)];
  
    if (canPlaceShip(horizontal, x, y, ship.length)) {
      if (horizontal) {
        for (let i = 0; i < ship.length; i++) {
          bs.boardList[x][y + i] = k+1;////////////////////////////////////
          placed = true;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          bs.boardList[x + i][y] = k+1;/////////////////////////////////////
          placed = true;
        }
      }
    }
  }
}

function placeShips() {
  for (let k = 0; k < 5; k++) {
    place_ship(bs.ships_info[k],k);///////////////////////////////////////
    console.log(bs.boardList);
  }
}

function drawPeg(posID, hit) {
  const cellToColor = document.getElementById(posID);

  if (hit) {
    cellToColor.style.backgroundColor = "red";
  } else {
    cellToColor.style.backgroundColor = "seagreen";
  }
}

function checkShipSunk() {
  for (i = 0; i < 5; i++) {
    if (!bs.ships_info[i].sunk) {
      if (bs.ships_info[i].hits == bs.ships_info[i].length) {
        bs.ships_info[i].sunk = true;
        return true;
      }
    }
  }
  return false;
}

function playGame() {
  placeShips();





    

//     total_ship_cells = sum(ship["length"] for ship in ships_info)
//     guessed_positions = set()
//     show_message("Welcome to Battleship! Enter your first guess.", "blue")
    
//     while hits < total_ship_cells:
//         guess = screen.textinput("Make a guess", "Enter coordinates (e.g., A1):")
//         if not guess:
//             break
            
//         try:
//             message.clear()  # Clear any previous message
            
//             col = ord(guess[0].upper()) - ord('A')
//             row = int(guess[1:]) - 1
            
//             if not (0 <= col < grid_size and 0 <= row < grid_size):
//                 raise ValueError("Coordinates out of bounds!")
            
//             if (col, row) in guessed_positions:
//                 raise ValueError("You already guessed that position!")
            
//             guessed_positions.add((col, row))
//             hit = (col, row) in all_ship_positions
//             draw_peg(col, row, hit)
            
//             if hit:
//                 hits += 1
//                 sunk_ship = check_sunk_ships()
//                 if sunk_ship:
//                     show_message(f"You sunk the {sunk_ship}!", "green")
//                 else:
//                     show_message("Hit!", "green")
                
//                 if hits == total_ship_cells:
//                     show_message("You won! All ships sunk!", "green")
//                     screen.textinput("Game Over", "Congratulations! You won!")
//                     break
//             else:
//                 show_message("Miss!", "blue")
            
//         except ValueError as e:
//             show_message(str(e), "red")
}
// {
//   const rowConverter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

//   const gridPosition = rowConverter[x] + y.toString();

//   const gridCell = document.getElementById(gridPosition);

// }















// # Start the game
// play_game()
// screen.mainloop()
