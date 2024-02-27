class Fish {
  // ?Jak je wywolac w console logu bez dodawania argumentow w funkcji
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
    return this.age = newAge;
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

class Guppy extends Fish {
  isSleep: boolean;

  constructor(age: number, hungerLevel: number, illness: boolean, isSleep: boolean) {
    super(age, hungerLevel, illness);
    this.isSleep = isSleep;
  }

  // method
  changeIsSleep(isSleep: boolean) {
    return this.isSleep = isSleep;
  }

}

class Shrimp extends Fish {
  isFiltering: boolean;
  constructor(age: number, hungerLevel: number, illness: boolean, isFiltering: boolean) {
    super(age, hungerLevel, illness);
    this.isFiltering = isFiltering;
  }

  // method
  changeisFiltering(isFiltering: boolean) {
    return this.isFiltering = isFiltering;
  }
}

class Aquarium {
  fishes;
  fillLevel;

  constructor(fishes: Fish[], fillLevel: number) {
    this.fishes = fishes;
    this.fillLevel = fillLevel;
  }

  //methods
  feedFishes(fishes: Fish[]) {
    fishes.forEach((fish) => {
      fish.hungerLevel = 100;
    })
  }

  isSomeHungry(fishes: Fish[]) {
    fishes.forEach((fish) => {
      if (fish.hungerLevel < 50) {
        console.log('fish needs food');
        return true;
      } else {
        console.log('fish is full');
        return false;
      }
    })
  }

  isSomeIll(fishes: Fish[]) {
    fishes.forEach((fish) => {
      fish.illness ? console.log('propably die') : console.log('fish is fine');
      fish.illness ? true : false;
    })
  }

  fill(fillLevel: number) {
    this.fillLevel = fillLevel;
  }
}



const guppy = new Guppy(1, 4, false, false);
const shrimp = new Shrimp(2, 3, false, true);
console.dir(guppy);
guppy.speak();
guppy.changeAge(9);
guppy.changeHungerLevel(5);
guppy.changeIlnessFlag(true);
guppy.changeIsSleep(true);
console.dir(guppy);
guppy.speak();

console.dir(shrimp);

shrimp.changeisFiltering(false);
console.dir(shrimp);


// function calculateTax(income: number, taxYear = 2022): number {
// 	if (taxYear < 2022)
// 		return income * 1.2;
// 	return income * 1.3;
// }


// console.log(calculateTax(10_000, 1991));
