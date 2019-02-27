class Gericht {
    constructor(name) {
        this._name = name
        this._kategorie = []
    }
    get kategorie() { return kategorie }
    set kategorie(kategorie) { this._kategorie = kategorie }

    get name() { return name }
    set name(name) { this._name = name }

    toString() {
        return this._name;
    }
}

export default Gericht