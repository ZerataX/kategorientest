class Gericht {
  constructor (name) {
    this._name = name
    this._kategorie = new Set()
  }

  get kategorie () { return this._kategorie }
  set kategorie (kategorie) { this._kategorie = kategorie }

  get name () { return this._name }
  set name (name) { this._name = name }

  toString () {
    return this._name
  }
}

export default Gericht
