export function deleteKategorie (kategorie) {
  kategorie.delete()
}

export function deleteGericht (gericht, kategorien) {
  kategorien.forEach(kategorie => {
    kategorie.removeGericht(gericht)
  })
}

export function gerichtAddKategorie (gericht, kategorie) {
  kategorie.addGericht(gericht)
}

export function getObersteKategorie (kategorie) {
  if (!kategorie.oberkategorie) { return kategorie }
  return getObersteKategorie(kategorie.oberkategorie)
}

export function syntaxHighlight (json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2)
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'mi' // number
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'nt' // key
      } else {
        cls = 's2' // string
      }
    } else if (/true|false/.test(match)) {
      cls = 'kc' // boolean
    } else if (/null/.test(match)) {
      cls = 'kc' // boolean
    }
    return '<span class="' + cls + '">' + match + '</span>'
  })
}
