'use strict'
import Gericht from './model/gericht.js'
import Kategorie from './model/kategorie.js'
import Speicher from './model/speicher.js'
import { getObersteKategorie, deleteKategorie, syntaxHighlight, gerichtAddKategorie, deleteGericht } from './controller.js'

const KATEGORIE_TMPL = document.getElementsByTagName('template')[0]
const GERICHT_TMPL = document.getElementsByTagName('template')[1]
const CHECKBOX = document.getElementsByTagName('template')[2]
const RADIOBOX = document.getElementsByTagName('template')[3]

function drawKategorien (obersteKategorie) {
  let kategorienDIV = document.getElementById('kategorien')
  let jsonDIV = document.getElementById('json')

  while (kategorienDIV.firstChild) {
    kategorienDIV.removeChild(kategorienDIV.firstChild)
  }
  kategorienDIV.appendChild(addKategorien(obersteKategorie))
  drawJSON(jsonDIV, obersteKategorie)
}

function addGericht (gericht) {
  let div = GERICHT_TMPL.content.querySelector('div')
  let a = document.importNode(div, true)
  let title = a.querySelector('h5')
  let deleteBTN = a.querySelector('button')
  let fieldset = a.querySelector('fieldset')

  deleteBTN.onclick = function () {
    deleteGericht(gericht, speicher.kategorien)
    let obersteKategorie = getObersteKategorie(speicher.firstKategorie())
    drawKategorien(obersteKategorie)
  }

  speicher.kategorien.forEach(kategorie => {
    let div = CHECKBOX.content.querySelector('label')
    let a = document.importNode(div, true)
    let input = a.querySelector('input')

    input.value = kategorie.name
    input.setAttribute('title', kategorie.name)
    input.checked = kategorie.hasGericht(gericht)

    input.onchange = function () {
      if (input.checked) {
        kategorie.addGericht(gericht)
      } else {
        kategorie.removeGericht(gericht)
      }
      let obersteKategorie = getObersteKategorie(kategorie)
      drawKategorien(obersteKategorie)
    }
    fieldset.appendChild(a)
  })
  title.innerHTML = gericht.name
  return a
}

function addKategorien (kategorie) {
  let div = KATEGORIE_TMPL.content.querySelector('div')
  let a = document.importNode(div, true)
  let title = a.querySelector('h3')
  let sub = a.querySelector('h4')
  let items = a.getElementsByTagName('h4')[1]
  let deleteBTN = a.querySelector('button')
  let fieldset = a.querySelector('fieldset')

  title.innerHTML = kategorie.name
  deleteBTN.onclick = function () {
    let obersteKategorie = getObersteKategorie(kategorie)
    deleteKategorie(kategorie)
    // speicher.removeKategorie(kategorie) - alle unterkategorien müssen auch gelöscht werden
    drawKategorien(obersteKategorie)
  }
  speicher.kategorien.forEach(neueKategorie => {
    if (neueKategorie != kategorie && neueKategorie != kategorie.oberkategorie) {
      // geht ohne "&& neueKategorie != kategorie.oberkategorie", aber dann eigenständige chains
      // neueKategorie darf kein kind von kategorie sein
      let div = RADIOBOX.content.querySelector('label')
      let a = document.importNode(div, true)
      let input = a.querySelector('input')

      input.value = neueKategorie.name
      input.setAttribute('title', neueKategorie.name)
      input.checked = (neueKategorie == kategorie.oberkategorie)

      input.onchange = function () {
        if (input.checked) {
          kategorie.oberkategorie = neueKategorie
        } else {
          kategorie.oberkategorie = null // what would this mean??
        }
        let obersteKategorie = getObersteKategorie(kategorie)
        drawKategorien(obersteKategorie)
      }
      fieldset.appendChild(a)
    }
  })
  kategorie.unterkategorie.forEach(item => {
    sub.appendChild(addKategorien(item))
  })
  kategorie.gerichte.forEach(item => {
    items.appendChild(addGericht(item))
  })
  return a
}

function drawJSON (DIV, obersteKategorie) {
  let JSON = {
    'kategorien': obersteKategorie.getJSON(),
    'gerichte': [],
    'version': 0.1
  }
  speicher.gerichte.forEach(gericht => {
    JSON.gerichte.push(gericht.getJSON())
  })
  DIV.innerHTML = syntaxHighlight(JSON)
}

// Kategorien
let indisch = new Kategorie('Indisch')
let vegan = new Kategorie('Vegan')
vegan.oberkategorie = indisch
let pizza = new Kategorie('Pizza')
pizza.oberkategorie = indisch
let veganepizza = new Kategorie('VeganePizza')
veganepizza.oberkategorie = vegan
let familienpizza = new Kategorie('FamilienPizza')
familienpizza.oberkategorie = pizza
let suppe = new Kategorie('Suppe')
suppe.oberkategorie = vegan

let kategorien = [
  indisch,
  vegan,
  pizza,
  veganepizza,
  familienpizza,
  suppe
]

// console.log('suppe ober: ' + suppe.oberkategorie.name)
// console.log(vegan)
// for (let item of vegan.unterkategorie) console.log('vegan unter: ' + item.name)
// suppe.oberkategorie = indisch
// console.log('suppe ober: ' + suppe.oberkategorie.name)
// for (let item of vegan.unterkategorie) console.log('vegan unter: ' + item.name)

// Gerichte
let gericht1 = new Gericht('Nudeln')
gerichtAddKategorie(gericht1, vegan)
gerichtAddKategorie(gericht1, suppe)
let gericht2 = new Gericht('Hamburger')
gerichtAddKategorie(gericht2, pizza)
let gericht3 = new Gericht('Burger')
gerichtAddKategorie(gericht3, veganepizza)
gerichtAddKategorie(gericht3, familienpizza)
let gericht4 = new Gericht('Chips')
gerichtAddKategorie(gericht4, suppe)

let gerichte = [
  gericht1,
  gericht2,
  gericht3,
  gericht4
]

var speicher = new Speicher()
speicher.gerichte = gerichte
speicher.kategorien = kategorien
console.log(speicher.firstKategorie())
let obersteKategorie = getObersteKategorie(speicher.firstKategorie())
drawKategorien(obersteKategorie)
