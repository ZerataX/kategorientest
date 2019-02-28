class Speicher {
  constructor () {
    this._gerichte = new Set()
    this._kategorien = new Set()
  }

  get gerichte () { return this._gerichte }
  set gerichte (gerichte) { this._gerichte = new Set(gerichte) }

  get kategorien () { return this._kategorien }
  set kategorien (kategorien) { this._kategorien = new Set(kategorien) }
  addKategorie (kategorie) { this._kategorien.add(kategorie) }
  removeKategorie (kategorie) { this._kategorien.delete(kategorie) }

  firstKategorie () {
    let it = this._kategorien.values();
    let first = it.next();
    let value = first.value;
    return value
  }

  loadJSON (JSON) {}
}

export default Speicher
