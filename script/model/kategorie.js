class Kategorie {
  constructor (name) {
    this._name = name
    this._unterkategorie = new Set()
    this._oberkategorie = null
    this._gerichte = new Set()
    // this._oberkategorie = oberkategorie || false
  }

  get name () { return this._name }
  set name (name) { this._name = name }

  get oberkategorie () { return this._oberkategorie }
  set oberkategorie (kategorie) {
    if (this._oberkategorie) {
      this._oberkategorie._unterkategorie.delete(this)
    }
    this._oberkategorie = kategorie
    if (kategorie) {
      kategorie._unterkategorie.add(this)
    }
  }

  get unterkategorie () { return this._unterkategorie }
  // set unterkategorie (kategorie) { this._unterkategorie = kategorie }

  get gerichte () { return this._gerichte }
  set gerichte (gerichte) { this._gericht = gerichte }

  hasGericht (gericht) {
    return this._gerichte.has(gericht)
  }

  addGericht (gericht) {
    this._gerichte.add(gericht)
  }

  removeGericht (gericht) {
    this._gerichte.delete(gericht)
  }

  delete () {
    if (this._oberkategorie) {
      this._oberkategorie._unterkategorie.delete(this)
    }
    this._unterkategorie.forEach(kategorie => {
      return kategorie.delete()
    })
  }

  getJSON () {
    let JSON = {}
    JSON.name = this._name
    // JSON.oberkategorie = (this._oberkategorie) ? this._oberkategorie.name : null
    JSON.unterkategorie = []
    this._unterkategorie.forEach(kategorie => {
      JSON.unterkategorie.push(kategorie.getJSON())
    })
    JSON.gerichte = []
    this._gerichte.forEach(gericht => {
      JSON.gerichte.push(gericht.getJSON())
    })
    return JSON
  }
}

export default Kategorie
