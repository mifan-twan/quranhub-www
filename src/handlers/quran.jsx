
const createQuranHandler = (graphql) => {
    return {
        LOAD_AYAH_OF_SURAH: (payload, state) => {
            const {sura_id, offset, limit} = payload;
            const query = (`
                {
                    sura(id: "${sura_id}") {
                        title,
                        _id,
                        ayah(offset: ${offset}, limit: ${limit}) {
                            ayah_text,
                            verse,
                            _sura,
                            _language,
                            _id
                        }
                    }
                }
            `);
            return graphql(query)
        },
        LOAD_ALL_SURAH: (payload, state) => {
            const query = (`
                {
                    allSura {
                        _id, 
                        title, 
                    }
                }
            `);
            return graphql(query)
        },
    }
}

module.exports = createQuranHandler;