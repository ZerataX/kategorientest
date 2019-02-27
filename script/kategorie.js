class Kategorie {
  constructor (name, oberkategorie) {
    this._name = name
    this._unterkategorie = new Set()
    this._oberkategorie = oberkategorie || false
  }

  get name () { return this._name }
  set name (name) { this._name = name }

  get oberkategorie () { return this._oberkategorie }
  set oberkategorie (kategorie) {
    kategorie._unterkategorie.add(this)
    this._oberkategorie = kategorie
  }

  get unterkategorie () { return this._unterkategorie }
  set unterkategorie (kategorie) { this._unterkategorie = kategorie }
}

export default Kategorie
