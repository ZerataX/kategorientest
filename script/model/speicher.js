class Speicher {
  constructor () {
    this._gerichte = new Set()
    this._kategorien = new Set()
  }

  get gerichte () { return this._gerichte }
  set gerichte (gerichte) { this._gerichte = gerichte }

  get kategorien () { return this._kategorien }
  set kategorien (kategorien) { this._kategorien = kategorien }

  loadJSON (JSON) {}
}

export default Speicher
