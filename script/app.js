'use strict'
import Gericht from './model/gericht.js'
import Kategorie from './model/kategorie.js'
import { getObersteKategorie, addKategorien } from './controller.js'

let test = new Gericht('hello world')
console.log(test.toString())

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
gericht1.kategorie.add()
let gericht2 = new Gericht('Gericht2')
let gericht3 = new Gericht('Gericht3')
let gericht4 = new Gericht('Gericht4')

let oberste = getObersteKategorie(suppe)
let kategorienDIV = document.getElementById('kategorien')
kategorienDIV.appendChild(addKategorien(oberste))
