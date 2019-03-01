class Kategorie {
  constructor (name) {
    this._name = name
    this._unterkategorien = new Set()
    this._oberkategorie = null
    this._gerichte = new Set()
    // this._oberkategorie = oberkategorie || false
  }

  get name () { return this._name }
  set name (name) { this._name = name }

  get oberkategorie () { return this._oberkategorie }
  set oberkategorie (kategorie) {
    if (kategorie == null) {
      Error('Oberkategorie darf nicht als null gesetzt werden')
    }
    if (this.hasKategorie(kategorie)) {
      Error('Oberkategorie darf nicht eine der Unterkategorien sein')
    }
    if (this == kategorie) {
      Error('Oberkategorie darf nicht die Kategorie selbst sein')
    }

    if (this._oberkategorie) {
      this._oberkategorie._unterkategorien.delete(this)
    }
    kategorie._unterkategorien.add(this)
    this._oberkategorie = kategorie
  }

  get unterkategorien () { return this._unterkategorien }
  // set unterkategorien (kategorie) { this._unterkategorien = kategorie }
  
  hasKategorie(kategorie) {
    if (this._unterkategorien.has(kategorie)) { 
			return true
		}
    this._unterkategorien.forEach(unterkategorien => {
      return unterkategorien.hasKategorie(kategorie)
    })
  }

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
      this._oberkategorie._unterkategorien.delete(this)
      this._oberkategorie = null
    }
    this._unterkategorien.forEach(kategorie => {
      return kategorie.delete()
    })
  }

  getJSON () {
    let JSON = {}
    JSON.name = this._name
    // JSON.oberkategorie = (this._oberkategorie) ? this._oberkategorie.name : null
    JSON.unterkategorien = []
    this._unterkategorien.forEach(kategorie => {
      JSON.unterkategorien.push(kategorie.getJSON())
    })
    JSON.gerichte = []
    this._gerichte.forEach(gericht => {
      JSON.gerichte.push(gericht.getJSON())
    })
    return JSON
  }
}

export default Kategorie
