'use strict'
import Gericht from './model/gericht.js'
import Kategorie from './model/kategorie.js'
import { getObersteKategorie, addKategorien, syntaxHighlight } from './controller.js'

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

// console.log('suppe ober: ' + suppe.oberkategorie.name)
// console.log(vegan)
// for (let item of vegan.unterkategorie) console.log('vegan unter: ' + item.name)
// suppe.oberkategorie = indisch
// console.log('suppe ober: ' + suppe.oberkategorie.name)
// for (let item of vegan.unterkategorie) console.log('vegan unter: ' + item.name)

// Gerichte
let gericht1 = new Gericht('Gericht1')
gericht1.addKategorie(vegan)
gericht1.addKategorie(suppe)
let gericht2 = new Gericht('Gericht2')
gericht2.addKategorie(pizza)
let gericht3 = new Gericht('Gericht3')
gericht3.addKategorie(veganepizza)
gericht3.addKategorie(familienpizza)
let gericht4 = new Gericht('Gericht4')
gericht4.addKategorie(suppe)

let gerichte = [
  gericht1,
  gericht2,
  gericht3,
  gericht4,
]

let oberste = getObersteKategorie(suppe)
let kategorienDIV = document.getElementById('kategorien')
kategorienDIV.appendChild(addKategorien(oberste))

let jsonDIV = document.getElementById('json')
let JSON = {
  'kategorien': oberste.getJSON(),
  'gerichte': []
}

gerichte.forEach(gericht => {
  JSON.gerichte.push(gericht.getJSON())
})
jsonDIV.innerHTML = syntaxHighlight(JSON)
