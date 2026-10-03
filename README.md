# Solo Battleship (JavaScript conversion)

A single-player Battleship game that runs in the browser, built with plain HTML, CSS, and JavaScript. No frameworks and no build step.

**Play it:** https://tbatchelder.github.io/Battleship-Conversion/

Five ships are hidden at random on a 10×10 grid. Click a cell to fire a shot: 💦 is a miss and 💥 is a hit. Each ship in the side panel turns red when it's sunk. Reset starts a new game with fresh ship positions.

## Why I built this

In January 2025 I was working with students and coaches at the Joy of Coding Academy. I'd told them I was mostly self-taught and that I write small programs for a laboratory information management system (LIMS) at my day job, and I wanted to show that instead of just saying it.

I also wanted to show the students something about learning: you don't need an original idea to get better at coding. Take something that already exists, in a language you're still learning, and rebuild it.

I wrote this by hand, before I started using AI tools.

## Where it came from

The original was a Python (turtle) Battleship written by one of the Joy of Coding coaches, Katrina, as a demo for students. Her original code is kept, with credit, in the comments at the top of `js/battleship.js` for reference.

The JavaScript version is a conversion rather than a line-for-line port, because the two environments work differently:

- Python turtle draws on a canvas and asks the player to type coordinates like `A1`. The browser version uses an HTML table, and the player clicks a cell.
- Pegs are emoji instead of drawn circles.
- The `[X]` legend became a side panel whose entries turn red when a ship is sunk.
- The board is a 2D array where `0` is empty and `1`-`5` identifies which ship occupies a cell, and each ship keeps its own hit count.

## How it works

- Everything lives in one `bs` object, to avoid colliding with other globals on the page.
- For each ship, the game picks a random starting cell and orientation, and tries again until the ship fits on the grid without overlapping another ship.
- `fireShot("C4")` turns the cell name into array indices, checks the board, updates that ship's hit count, and marks the ship sunk when its hits equal its length.

## Known limitations

- There's no win message when the last ship sinks. The Python original had one.
- It's mouse-only. The cells are table cells with click handlers, so there's no keyboard support.
- The layout is a fixed size and isn't designed for phones.

## Changes since the first version

In October 2026, while getting this repo ready to share, I found two bugs while reviewing the code and fixed them. Nothing else was changed.

- Vertical ships were checked for overlap in the wrong cells. In a simulation of 100,000 boards, about 35% had ships overlapping, and a ship that loses a cell can never be sunk. After the fix, none did.
- Clicking a cell that had already been hit counted as another hit, so a ship could be "sunk" early.

## Contributions

This repo is public so people can look at it. I'm not accepting contributions, issues, or pull requests.

## License

The code I wrote is released under the MIT License (see `LICENSE`). The original Python code reproduced in the comments belongs to its author and isn't covered by that license.
