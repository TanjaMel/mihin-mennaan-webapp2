import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '/src/pages/MainPage'
import AboutUS from '/src/pages/AboutUs'
import ContactInfo from '/src/pages/ContactInfo'
import TietoSuoja from '@/pages/TietoSuoja'
import MapFinder from '@/pages/MapFinder'
import SingleCategory from '/src/pages/SingleCategoryPage'
import SinglePlacePage from '@/pages/SinglePlacePage'
import TestComponent from '@/pages/testComponent'
import PlacesOutside from '@/pages/PlacesOutside'
import PlacesInside from '@/pages/PlacesInside'
import whyWe from '@/pages/whyWe';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage, meta: { title: 'Mihin Mennään - Etusivu' } },
    { path: '/meista', component: AboutUS, meta: { title: 'Mihin Mennään - Meistä' } },
    { path: '/ota-yhteytta', component: ContactInfo, meta: { title: 'Mihin Mennään - Ota yhteyttä' } },
    { path: '/kategoriat/:category', component: SingleCategory, meta: { title: 'Mihin Mennään - Kategoria' } },
    { path: '/kategoriat/:category/:place', component: SinglePlacePage, meta: { title: 'Mihin Mennään - Paikka' } },
    { path: '/tietosuojaseloste', component: TietoSuoja, meta: { title: 'Mihin Mennään - Tietosuojaseloste' } },
    { path: '/kartta', component: MapFinder, meta: { title: 'Mihin Mennään - Kartta' } },
    { path: '/why-we', component: TestComponent, meta: { title: 'Mihin Mennään - Why We' } },
    { path: '/sisäaktiviteetit', component: PlacesInside, meta: { title: 'Mihin Mennään - Sisäaktiviteetit' } },
    { path: '/ulkoaktiviteetit', component: PlacesOutside, meta: { title: 'Mihin Mennään - Ulkoaktiviteetit' } },
    { path: '/whywe', component: whyWe, meta: { title: 'Mihin Mennään - Why We' } },
  ],
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title; // Устанавливаем динамический заголовок
  } else {
    document.title = 'Mihin Mennään'; // Заголовок по умолчанию
  }
});

export default router;
