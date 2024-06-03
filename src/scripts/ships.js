//SHIPS TYPE

//Carrier - 5 lengths
//Battleship - 4 lengths
//Cruiser - 3 lengths
//submarine - 3 lengths
//destroyer - 2 lengths

class Ships {
  constructor(name) {
    this.name = name;
    this.destroyed = false;
    this.hits = 0;
    this.length = 0;
  }

  hit() {
    this.hits += 1;
  }
}

class Carrier extends Ships {
  constructor() {
    super("Carrier");
    this.length = 5;
  }
}

class Battleship extends Ships {
  constructor() {
    super();
    this.name = "Battleship";
    this.length = 4;
  }
}

class Cruiser extends Ships {
  constructor() {
    super("Cruiser");
    this.length = 3;
  }
}

class Submarine extends Ships {
  constructor() {
    super("Submarine");
    this.length = 3;
  }
}

class Destroyer extends Ships {
  constructor() {
    super("Destroyer");
    this.length = 2;
  }
}

function isSunk(ship) {
  return ship.length === ship.hits;
}

export { Battleship, Carrier, Cruiser, Submarine, Destroyer, isSunk };
