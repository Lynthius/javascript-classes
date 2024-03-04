import { Aquarium, AquariumQuarantine, Fish, Guppy, Shrimp } from "./fish-tank"
import { describe, test, expect, vi, afterEach } from "vitest"

describe("Tests for fish classes", () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test("Fish class contructor works correctly", () => {
        //arrage
        const age = 3
        const hunger = 1
        const illness = false
        //act
        const fish = new Fish(age, hunger, illness)
        //assert
        expect(fish.age).toBe(age)
        expect(fish.hungerLevel).toBe(hunger)
        expect(fish.illness).toBe(illness)
    })
    test("Fish class changeAge works correctly", () => {
        //arrage
        const age = 3
        const hunger = 1
        const illness = false
        const newAge = 1;
        //act
        const fish = new Fish(age, hunger, illness)
        fish.changeAge(newAge)
        //assert
        expect(fish.age).toBe(newAge)
    })

    test("Aquarium class", () => {
        const fish1 = new Fish(1, 51, false)
        const fish2 = new Fish(2, 0, false)
        const aquarium = new Aquarium([fish1, fish2], 50)

        expect(aquarium.isSomeHungry()).toBe(true)

        aquarium.feedFishes()
        expect(aquarium.isSomeHungry()).toBe(false)

    })
    test("Aquarium class", () => {
        // ? Jak nazwya się to poniżej po polsku - mokowanie?
        const spy = vi.spyOn(Math, "random").mockReturnValue(0.75)

        const fish1 = new Fish(1, 51, false)
        const guppy = new Guppy(2, 0, false, false)
        const shrimp = new Shrimp(2, 0, false, false)

        const aquarium = new Aquarium([fish1, guppy, shrimp], 50)
        expect(guppy.isSleep).toBe(false)
        expect(shrimp.isFiltering).toBe(false)
        aquarium.action()

        expect(spy).toHaveBeenCalled()
        expect(spy).toHaveBeenCalledTimes(3)

        expect(fish1).toEqual(fish1)

        expect(guppy.isSleep).toBe(true)
        expect(shrimp.isFiltering).toBe(true)
    })

    // ! nowy test - czy dobrze, może warto inaczej do tego podejść? Czy robić osobne testy na to czy powinny być pod powyższym, czyli pod testem dla danej klasy
    test("Aquarium class info works correctly", () => {
        const logSpy = vi.spyOn(console, 'log')
        const guppy = new Guppy(1, 20, false, false)
        const shrimp = new Shrimp(2, 10, false, false)

        const aquarium = new Aquarium([guppy, shrimp], 50)

        aquarium.info();

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenCalledWith(
            expect.objectContaining({ age: 1, hungerLevel: 20, illness: false, isSleep: false })
        )
        expect(logSpy).toHaveBeenCalledWith(
            expect.objectContaining({ age: 2, hungerLevel: 10, illness: false, isFiltering: false })
        )
    })

    test("Aquarium class sendToQuarantine and returnToAquarium works correctly", () => {
        const guppy = new Guppy(2, 0, true, false)
        const shrimp = new Shrimp(2, 0, false, false)
        const aquarium = new Aquarium([guppy, shrimp], 50)
        const aquariumQuarantine = new AquariumQuarantine([], 50)

        aquarium.sendToQuarantine(aquariumQuarantine, guppy)

        expect(aquarium.fishes).toEqual([shrimp])
        expect(aquariumQuarantine.fishes).toEqual([guppy])

        aquariumQuarantine.returnToAquarium(aquarium, guppy)

        expect(aquarium.fishes).toEqual([shrimp, guppy])
        expect(aquariumQuarantine.fishes).toEqual([])
    })
})

