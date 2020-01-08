/**
 * The base object that can be extended.
 *
 * This isn't exported, as its point is
 * just to ensure the name/id code exists
 * in all the sub classes.
 */
class ExtendableBaseObject {
    name: String
    id: Number

    constructor() {
        this.name = ""
        this.id = Math.floor(Math.random() * 10000)
    }

    getName(): String {
        return this.name
    }

    setName(newName: String) {
        this.name = newName
    }

    getId(): Number {
        return this.id
    }
}

export class Script extends ExtendableBaseObject {
    run: String

    constructor() {
        super()
        this.run = ""
    }

    getRun(): String {
        return this.run
    }

    setRun(newRun: String) {
        this.run = newRun
    }

    toString(): String {
        let e =
            (this.getName() === "main" ? "" : `${this.getName()}_`) + "script"
        return `${e}: ${this.getRun()}`
    }
}

// have to name it CICache to fix conficts
export class CICache extends ExtendableBaseObject {
    folder: String
    populate: Script
    fingerprint: Script

    constructor() {
        super()
        this.folder = ""
        this.populate = new Script()
        this.fingerprint = new Script()
    }

    getFolder(): String {
        return this.folder
    }

    setFolder(newThing: String) {
        this.folder = newThing
    }

    getPopulate(): Script {
        return this.populate
    }

    getFingerprint(): Script {
        return this.fingerprint
    }
}

export class Environment {
    keys: object

    constructor(keys: object) {
        this.keys = keys
    }
}

type machineType = "docker" | "mac" | "win" | "fbsd"

export class Machine {
    type: machineType

    constructor() {
        this.type = "docker"
    }

    getType(): machineType {
        return this.type
    }

    setType(newType: machineType) {
        this.type = newType
    }
}
