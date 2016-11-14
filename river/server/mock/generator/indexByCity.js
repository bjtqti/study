'use strict';

var faker = require("faker");

module.exports = {
    id:faker.random.number(),
    name:faker.name.title(),
    address:{
        city:faker.address.city(),
        country:faker.address.country()
    }
}