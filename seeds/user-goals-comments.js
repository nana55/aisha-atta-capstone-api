/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// import seed data files, arrays of objects
const usersData = require('../seed-data/users');
const goalsData = require('../seed-data/goals');
const commentsData = require('../seed-data/comments');
const likesData = require('../seed-data/likes');
const starsData = require('../seed-data/stars');


exports.seed = async function(knex) {
  await knex('users').del();
  await knex('goals').del();
  await knex('comments').del();
  await knex('likes').del();
  await knex('stars').del();
  await knex('users').insert(usersData);
  await knex('goals').insert(goalsData);
  await knex('comments').insert(commentsData);
  await knex('likes').insert(likesData);
  await knex('stars').insert(starsData);
};
