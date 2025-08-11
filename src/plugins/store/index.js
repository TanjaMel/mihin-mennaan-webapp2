import { defineStore } from 'pinia'
import {collection, getDocs, getFirestore, doc, getDoc, query} from 'firebase/firestore';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    count: 0,
    name: 'Eduardo',
    map_api: null,
    categories: [],
    settings: [],
    testData: [],
    filteredCategoryInChunks: []
  }),
  getters: {
    getCloseData(state) {
      if(state.categories.length) {
        let mappedCategories = state.categories.map(cat => {
          cat.data.forEach(el => {
            el.category = cat.name
          })

          return cat.data
        }).reduce((pre, cur) => {
          return pre.concat(cur)
        }).filter(el => el.outside == true)

        let defaultPageSize = 12
        let chunkedCategories = []

        for(let i = 0; i < mappedCategories.length; i += defaultPageSize) {
          chunkedCategories.push(mappedCategories.slice(i, i + defaultPageSize))
        }

        return chunkedCategories
      } else {
        return []
      }
    },

    getMapConfig(state) {
      return state.map_api
    },

    getTestData(state) {
      return state.testData
    },

    getOpenPlaces(state) {
      /*
      Учитывая изначальный тип данных и то что нам надо отфильтровать
      мы пересоздаём массив с уже нужными нам данными с помощью метода map()


      1) Изначальный массив с объектом (каждая категория), который содержит
          в себе два ключа Name - наименование категории и Data - собственно
          сами данные, которые нам нужно отфильтровать
        [
          {
            name: 'lalal',
            data: [
              {},
              {}
            ]
          },
          {
            name: 'lalal',
            data: [
              {},
              {}
            ]
          },
        ]

      2) После перебора каждого объекта (категории), мы вытаскиваем только массив Data.
          После чего, получаем массив массивов с данными внутри
        [
          [{}{}{}{}{}{}{}{}]
          [{}{}{}{}{}{}{}{}]
        ]

      3) Метод reduce((pre, cur))
                pre - начальная форма массива
                cur - нынешняя / обрабатываемая в данный момент часть массива

          создаёт НОВЫЙ ПУСТОЙ массив и методом перебора КОНКАТИНИРУЕТ (складывает)
          в него все данный из перебора.

          Таким образом мы получаем ОДИН массив со всеми единичными данными из всех категорий

          После этого на этот же массив мы делаем фильтрацию, снова перебираем весь массив и
          возвращаем в него только те элементы, которые соответсвуют условию!

        [
         {}{}{}{}{}{}
        ].filter(el => el.outside)
       */


      if(state.categories.length) {
        let mappedCategories = state.categories.map(cat => {
          cat.data.forEach(el => {
            el.category = cat.name
          })

          return cat.data
        }).reduce((pre, cur) => {
          return pre.concat(cur)
        }).filter(el => el.outside == false)


        /*
        Создаем базовую переменную, в которую записываем нужное нам количество элементов
          на одной странице, для пагинации
          const defaultPageSize = 12

          Создаем пустой массив, в которые будем складывать чанки (в данном случае по 12 элементов на страницу)
          let chunkedCategories = []

          Начинаем перебор массива mappedCategories, дробя его по defaultPageSize
          for(let i = 0; i < mappedCategories.data.length; i += defaultPageSize) {

            Пушим в chunkedArray новый массив по 12 штук
            в результате чего получаем массив массивов [[12][12][12]]
            chunkedCategories.push(mappedCategories.data.slice(i, i + defaultPageSize))
          }

          Возвращаем отфильтрованный и дробленный массив в компонент
          return chunkedCategories
        } else {
          В случае если даты нету, просто возвращаем пустой массив
          return []
         */

        let defaultPageSize = 12
        let chunkedCategories = []

        for(let i = 0; i < mappedCategories.length; i += defaultPageSize) {
          chunkedCategories.push(mappedCategories.slice(i, i + defaultPageSize))
        }

        return chunkedCategories
      } else {
        return []
      }
    },

    getCategoriesDataAll(state) {
      return state.categories
    },
    /*
    Внутрь функции getDataByCategory() мы передаём state и входящий параметр categoryName
    из компонента (в данном случае SingleCategoryPage.vue).

    Создаем стрелочную фукнцию которую тут же и возвращаем.
    И в неё передаем categoryName параметр
    return (categoryName) => {

        Проверяем на наличие даты внутри state.categories!!!
        if(state.categories.length) {

          Если дата есть, то мы фильтруем её по нужной нам категории.
          С помощью метода find, мы делаем перебор и возвращаем 1 элемент,
          в котором ключ name соответствует categoryName
          let rawArray = state.categories.find((cat) => cat.name === categoryName)

          Создаем базовую переменную, в которую записываем нужное нам количество элементов
          на одной странице, для пагинации
          const defaultPageSize = 12

          Создаем пустой массив, в которые будем складывать чанки (в данном случае по 12 элементов на страницу)
          let chunkedArray = []

          Начинаем перебор массива rawArray, дробя его по defaultPageSize
          for(let i = 0; i < rawArray.data.length; i += defaultPageSize) {

            Пушим в chunkedArray новый массив по 12 штук
            в результате чего получаем массив массивов [[12][12][12]]
            chunkedArray.push(rawArray.data.slice(i, i + defaultPageSize))
          }

          Возвращаем отфильтрованный и дробленный массив в компонент
          return chunkedArray
        } else {
          В случае если даты нету, просто возвращаем пустой массив
          return []
        }
      }
     */
    getDataByCategory(state) {
      return (categoryName) => {
        if(state.categories.length) {
          let rawArray = state.categories.find((cat) => cat.name === categoryName)
          const defaultPageSize = 12
          let chunkedArray = []

          for(let i = 0; i < rawArray.data.length; i += defaultPageSize) {
            chunkedArray.push(rawArray.data.slice(i, i + defaultPageSize))
          }

          return chunkedArray
        } else {
          return []
        }
      }
    },
    getCategories(state) {
      if(state.settings.length) {
        return state.settings[0][0]
      }
    },
    getCurrentCategory(state) {
      return (categoryName) => {
        if (state.categories.length) {
          return state.categories.find(el => el.name === categoryName)
        } else {
          return []
        }
      }
    }
  },
  actions: {
    async testData() {
      const db = getFirestore()
      const docRef = doc(db, "settings", "categories");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      this.testData = data[0]
    },

    async fetchMapApi() {
      const db = getFirestore()
      const apiRef = doc(db, "configs", "google");
      const apiSnap = await getDoc(apiRef);
      const data = apiSnap.data();
      this.map_api = data.map_api;
    },

    async fetchData() {
      const db = getFirestore()
      //Запрос пути к папке "settings" и сохранения пути в переменную q *query*
      const docRef = doc(db, "settings", "categories");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()

      for(let i = 0; i < data[0].length; i++) {
        const category = data[0][i]

        const q = query(collection(db, `${category}`));
        const querySnapshot = await getDocs(q);
        let categoryData = []
        querySnapshot.forEach((doc) => {
          categoryData.push(doc.data())
        });

        this.categories = [...this.categories, {
          name: category,
          data: categoryData
        }]
      }
    },
    async fetchSettings() {
      if(!this.settings.length) {
        const db = getFirestore()
        const q = query(collection(db, "settings"));
        const querySnapshot = await getDocs(q);
        let settingsData = []
        querySnapshot.forEach((doc) => {
          settingsData.push(doc.data())
        });
        this.settings = settingsData
      }
    },

    async fetchDataByCategory(category) {
      if(!this.categories.find(el => el.name.toLowerCase() === category.toLowerCase())) {
        const db = getFirestore()

        const querySnapshot = await getDocs(collection(db, `${category}`));
        let categoryData = []
        querySnapshot.forEach((doc) => {
          categoryData.push(doc.data())
        });

        this.categories = [...this.categories, {
          name: category,
          data: categoryData
        }]
      }
    }
  },
})
