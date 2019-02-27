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
  for (let item of kategorie.unterkategorie) {
    sub.appendChild(addKategorien(item))
  }
  return a
}
