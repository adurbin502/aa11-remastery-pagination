// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();
require('express-async-errors');

// Import the models used in these routes - DO NOT MODIFY
const { Musician, Band, Instrument } = require('./db/models');

// Express using json - DO NOT MODIFY
app.use(express.json());

// Utility function for pagination
function parsePagination(query) {
    let { page, size } = query;
    page = parseInt(page) || 1;
    size = parseInt(size) || 5;

    if (page === 0 || size === 0) {
        return { noPagination: true };
    }

    const limit = size;
    const offset = size * (page - 1);

    return { limit, offset, noPagination: false };
}

// GET /musicians
app.get('/musicians', async (req, res, next) => {
    // Parse the query params, set default values, and create appropriate
    // offset and limit values if necessary.
    const { limit, offset, noPagination } = parsePagination(req.query);

    // Query for all musicians
    // Include attributes for `id`, `firstName`, and `lastName`
    // Include associated bands and their `id` and `name`
    // Order by musician `lastName` then `firstName`
    let musicians;

    if (noPagination) {
        musicians = await Musician.findAll({
            order: [['lastName', 'ASC'], ['firstName', 'ASC']],
            attributes: ['id', 'firstName', 'lastName'],
            include: [{
                model: Band,
                attributes: ['id', 'name']
            }]
        });
    } else {
        musicians = await Musician.findAll({
            limit,
            offset,
            order: [['lastName', 'ASC'], ['firstName', 'ASC']],
            attributes: ['id', 'firstName', 'lastName'],
            include: [{
                model: Band,
                attributes: ['id', 'name']
            }]
        });
    }

    res.json(musicians);
});

// BONUS: Pagination with bands
app.get('/bands', async (req, res, next) => {
    // Parse the query params, set default values, and create appropriate
    // offset and limit values if necessary.
    const { limit, offset, noPagination } = parsePagination(req.query);

    // Query for all bands
    // Include attributes for `id` and `name`
    // Include associated musicians and their `id`, `firstName`, and `lastName`
    // Order by band `name` then musician `lastName`
    let bands;

    if (noPagination) {
        bands = await Band.findAll({
            order: [['name', 'ASC'], [Musician, 'lastName', 'ASC']],
            attributes: ['id', 'name'],
            include: [{
                model: Musician,
                attributes: ['id', 'firstName', 'lastName']
            }]
        });
    } else {
        bands = await Band.findAll({
            limit,
            offset,
            order: [['name', 'ASC'], [Musician, 'lastName', 'ASC']],
            attributes: ['id', 'name'],
            include: [{
                model: Musician,
                attributes: ['id', 'firstName', 'lastName']
            }]
        });
    }

    res.json(bands);
});

// BONUS: Pagination with instruments
app.get('/instruments', async (req, res, next) => {
    // Parse the query params, set default values, and create appropriate
    // offset and limit values if necessary.
    const { limit, offset, noPagination } = parsePagination(req.query);

    // Query for all instruments
    // Include attributes for `id` and `type`
    // Include associated musicians and their `id`, `firstName` and `lastName`
    // Omit the MusicianInstruments join table attributes from the results
    // Include each musician's associated band and their `id` and `name`
    // Order by instrument `type`, then band `name`, then musician `lastName`
    let instruments;

    if (noPagination) {
        instruments = await Instrument.findAll({
            order: [['type', 'ASC'], [Musician, Band, 'name', 'ASC'], [Musician, 'lastName', 'ASC']],
            attributes: ['id', 'type'],
            include: [{
                model: Musician,
                attributes: ['id', 'firstName', 'lastName'],
                through: { attributes: [] }, // Omit join table attributes
                include: [{
                    model: Band,
                    attributes: ['id', 'name']
                }]
            }]
        });
    } else {
        instruments = await Instrument.findAll({
            limit,
            offset,
            order: [['type', 'ASC'], [Musician, Band, 'name', 'ASC'], [Musician, 'lastName', 'ASC']],
            attributes: ['id', 'type'],
            include: [{
                model: Musician,
                attributes: ['id', 'firstName', 'lastName'],
                through: { attributes: [] }, // Omit join table attributes
                include: [{
                    model: Band,
                    attributes: ['id', 'name']
                }]
            }]
        });
    }

    res.json(instruments);
});

// ADVANCED BONUS: Reduce Pagination Repetition
// Utility function parsePagination already helps reduce repetition.

// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
