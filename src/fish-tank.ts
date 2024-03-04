export class Fish {
  age: number = 0;
  hungerLevel: number = 0;
  illness: boolean = false;

  constructor(age: number, hungerLevel: number, illness: boolean) {
    this.age = age;
    this.hungerLevel = hungerLevel;
    this.illness = illness;
  }

  // methods
  changeAge(newAge: number) {
    if (newAge > 0) {
      return this.age = newAge;
    }
  }
  changeHungerLevel(hungerLevel: number) {
    return this.hungerLevel = hungerLevel;
  }
  changeIlnessFlag(illness: boolean) {
    return this.illness = illness;
  }

  speak() {
    if (this.illness) {
      console.log("I'm dying!!");
    } else {
      console.log("Bulb bulb bulb");
    }
  }
}

export class Guppy extends Fish {
  isSleep: boolean;

  constructor(age: number, hungerLevel: number, illness: boolean, isSleep: boolean) {
    super(age, hungerLevel, illness);
    this.isSleep = isSleep;
  }

  // method
  changeIsSleep() {
    return this.isSleep = !this.isSleep;
  }

}

export class Shrimp extends Fish {
  isFiltering: boolean;
  constructor(age: number, hungerLevel: number, illness: boolean, isFiltering: boolean) {
    super(age, hungerLevel, illness);
    this.isFiltering = isFiltering;
  }

  // method
  changeisFiltering() {
    return this.isFiltering = !this.isFiltering;
  }
}

export class Aquarium {
  fishes;
  fillLevel;

  constructor(fishes: Fish[], fillLevel: number) {
    this.fishes = fishes;
    this.fillLevel = fillLevel;
  }

  //methods
  feedFishes() {
    this.fishes.forEach((fish) => {
      fish.hungerLevel = 0;
    })
  }

  //? czy to oznacza że pozwala tylko na zwracanie true/false?
  isSomeHungry(): boolean {
    //A: MAP
    //b: filter
    //c: some
    //d: every
    return this.fishes.some((fish) => {
      if (fish.hungerLevel > 50) {
        console.log('fish needs food');
        return true;
      } else {
        console.log('fish is full');
        return false;
      }
    })
  }
  // dodałem boolean
  isSomeIll(fishes: Fish[]): boolean {
    return fishes.some((fish) => {
      return fish.illness;
    })
  }

  fill(fillLevel: number) {
    if (fillLevel < 100) {
      this.fillLevel = fillLevel;
    }
  }

  //! add a new fish to the aquarium
  addFish(fish: Fish) {
    this.fishes.push(fish)
  }

  //? czy w TS nie korzysta się ze średników?
  action() {
    this.fishes.forEach(fish => {
      const propability = Math.random() > 0.5
      if (propability) {
        if (fish instanceof Guppy) {
          fish.changeIsSleep()
        }
        if (fish instanceof Shrimp) {
          fish.changeisFiltering()
        }
      }
    })
  }

  info() {
    this.fishes.forEach(fish => {
      console.log(fish)
    })
  }

  //! send fish to quarantine (co jak więcej ryb niż jedna?)
  sendToQuarantine(aquarium: Aquarium, fish: Fish) {
    const index = this.fishes.findIndex((f) => f === fish);
    if (index !== -1) {
      const selectedFish = this.fishes.splice(index, 1)[0];
      aquarium.fishes.push(selectedFish);
    }
  }
}

export class AquariumQuarantine extends Aquarium {
  constructor(fishes: Fish[], fillLevel: number) {
    super(fishes, fillLevel)
  }

  //? w jaki sposób ma wykorzystywać metodę addFish z fishes? Chyba robię źle że tworzę nową metodę?
  //! return fish to aquarium
  returnToAquarium(aquarium: Aquarium, fish: Fish) {
    if (this.fishes.includes(fish)) {
      const selectedFish = this.fishes.splice(this.fishes.indexOf(fish), 1)[0];
      aquarium.fishes.push(selectedFish);
    }
  }
}


const guppy = new Guppy(1, 4, false, false);
const shrimp = new Shrimp(2, 3, false, true);
const fishSick = new Fish(2, 3, true,);
guppy.changeAge(9);
guppy.changeHungerLevel(5);
guppy.changeIlnessFlag(true);
guppy.changeIsSleep();
guppy.speak();
shrimp.changeisFiltering();

const aquarium = new Aquarium([guppy, shrimp], 90);
const aquariumQuarantine = new AquariumQuarantine([shrimp, fishSick], 90);

console.log('info');
aquarium.info();


console.log('before');
console.log(aquarium);
console.log(aquariumQuarantine);
aquarium.sendToQuarantine(aquariumQuarantine, guppy);
// console.log('after');
// console.log(aquarium);
// console.log(aquariumQuarantine);
// console.log('return');
// aquariumQuarantine.returnToAquarium(aquarium, guppy);
// console.log(aquarium);
// console.log(aquariumQuarantine);


