db.movies.aggregate([
    { $match: { "imdb.rating": { $gte: 0 }, metacritic: { $gte: 0 } } },
    {
        $facet: {
            "imdb_ratings": [
                { $sort: { "imdb.rating": -1 } },
                { $limit: 10 },
            ],
            "metacritic": [
                { $sort: { metacritic: -1 } },
                { $limit: 10 },
            ]
        }
    },
    {
        $project: {
            common: { $setIntersection: ["$imdb_ratings", "$metacritic"] }
        }
    }
]).itcount()
