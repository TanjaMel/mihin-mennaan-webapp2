import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import MainPage from '/src/pages/MainPage'
import AboutUS from '/src/pages/AboutUs'
import ContactInfo from '/src/pages/ContactInfo'
import TietoSuoja from '@/pages/TietoSuoja'
import MapFinder from '@/pages/MapFinder'


import SingleCategory from '/src/pages/SingleCategoryPage'
import SinglePlacePage from '@/pages/SinglePlacePage'
import TestComponent from '@/pages/testComponent'
import PlacesOutside from '@/pages/PlacesOutside'
import PlacesInside from '@/pages/PlacesInside';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/meista', component: AboutUS },
    { path: '/ota-yhteytta', component: ContactInfo },
    { path: '/kategoriat/:category', component: SingleCategory },
    { path: '/kategoriat/:category/:place', component: SinglePlacePage },
    { path: '/tietosuojaseloste', component: TietoSuoja},
    { path: '/kartta', component: MapFinder },
    { path: '/test', component: TestComponent },
    { path: '/sisäaktiviteetit', component: PlacesInside },
    { path: '/ulkoaktiviteetit', component: PlacesOutside }
  ],
})

export default router
