'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const restaurantInformation = require('/Users/ivan/Dev/restaurant/public/jsons/restaurant.json').results

    await queryInterface.bulkInsert('Restaurants',
      Array.from(restaurantInformation).map((element) => {
        return {
          name: element.name,
          name_en: element.name_en,
          category: element.category,
          image: element.image,
          location: element.location,
          phone: element.phone,
          google_map: element.google_map,
          rating: element.rating,
          description: element.description
        }
      })
    )
    // await queryInterface.bulkInsert('Restaurants',
    //   restaurantInformation.forEach((element) => {
    //     return {
    //       name: element.name,
    //       name_en: element.name_en,
    //       category: element.category,
    //       image: element.image,
    //       location: element.location,
    //       phone: element.phone,
    //       google_map: element.google_map,
    //       rating: element.rating,
    //       description: element.description
    //     }
    //   })
    // )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null)
  }
};
