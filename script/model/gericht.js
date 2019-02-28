class Gericht {
  constructor (name) {
    this._name = name
    this._kategorien = new Set()
  }

  // get kategorien () { return this._kategorien }
  // set kategorien (kategorien) { this._kategorien = kategorien }

  // addKategorie (kategorie) {
  //   this._kategorien.add(kategorie)
  // }
  // removeKategorie (kategorie) {
  //   this._kategorien.delete(kategorie)
  // }

  get name () { return this._name }
  set name (name) { this._name = name }

  getJSON () {
    let JSON = {}
    JSON.name = this._name
    // JSON.kategorien = []
    // this._kategorien.forEach(kategorie => {
    //   JSON.kategorien.push(kategorie.name)
    // })
    return JSON
  }
}

export default Gericht
