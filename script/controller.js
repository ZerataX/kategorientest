const KATEGORIE_TMPL = document.getElementsByTagName('template')[0]
const GERICHT_TMPL = document.getElementsByTagName('template')[1]

export function getObersteKategorie (kategorie) {
  if (!kategorie.oberkategorie) { return kategorie }
  return getObersteKategorie(kategorie.oberkategorie);
}

export function addKategorien (kategorie) {
  let div = KATEGORIE_TMPL.content.querySelector('div')
  let a = document.importNode(div, true)
  let title = a.querySelector('h3')
  let sub = a.querySelector('h4')
  title.innerHTML = kategorie.name
  kategorie.unterkategorie.forEach(item => {
    sub.appendChild(addKategorien(item))
  })
  return a
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
