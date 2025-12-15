/**
 * SplitBrain Level Definitions
 * 
 * ASCII Grid Legend:
 * '#' = wall (impassable)
 * '.' = floor (walkable)
 * 'A' = starting position of tile 1 (ZQSD controls)
 * 'B' = starting position of tile 2 (arrow keys)
 * '1' = exit for tile 1
 * '2' = exit for tile 2
 * 
 * Each level is defined as an array of strings, where each string is a row.
 * Keep grids compact (8x8 to 12x12) for easy visual editing.
 */

export const levels = [
  {
    name: 'Tutorial',
    difficulty: 1,
    grid: [
      '########',
      '#......#',
      '#.A....#',
      '#......#',
      '#....B.#',
      '#......#',
      '#.1..2.#',
      '########'
    ]
  },
  {
    name: 'Split Path',
    difficulty: 2,
    grid: [
      '##########',
      '#........#',
      '#.A......#',
      '#.##..##.#',
      '#..#..##.#',
      '#.##..##.#',
      '#....B...#',
      '#.1....2.#',
      '#........#',
      '##########'
    ]
  },
  {
    name: 'Maze',
    difficulty: 3,
    grid: [
      '############',
      '#..........#',
      '#.##.##.##.#',
      '#.#..#.....#',
      '#A#.##.##.##',
      '#.#........#',
      '#.##.##.##.#',
      '#....#..#..#',
      '##.##.##.##B',
      '#..........#',
      '#1........2#',
      '############'
    ]
  }
]

