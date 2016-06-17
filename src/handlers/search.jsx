const createSearchHandlers = (graphql) => {
    return {
        SEARCH_QUERY: (payload, state) => {
            const {query} = payload;

            return graphql(`
                {
                    search(query: "${query}") {
                        ayah_text,
                        verse,
                        _language,
                        _sura,
                        _id
                    }
                }
            `).then(data => ({...data, query}));
        }
    }
}

module.exports = createSearchHandlers;