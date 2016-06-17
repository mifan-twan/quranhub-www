const update = require('react-addons-update');

const initialState = {
    phase: "LOADING",
    surahIds: [],
    surahMaps: {},
    ayahIds: [],
    ayahMaps: {},
    activeSuraId: "x"
}

const quran = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case "LOAD_AYAH_OF_SURAH_START":
        const {sura_id, offset} = payload;
            return update(state, {
                phase: {$set: "LOADING"},
                surahMaps: {
                    [sura_id]: {
                        $apply: (currentSura) => {
                            console.log(offset)
                            currentSura.cursor.offset = offset;
                            return currentSura;
                        }
                    }
                }
            });
        case "LOAD_AYAH_OF_SURAH_SUCCESS": 
            const sura = payload.data.sura;
            const {ayah} = payload.data.sura;
            return update(state, {
                phase: {$set: "IDLE"},
                ayahIds: {
                    $apply: (ayahIds) => {
                        ayah.forEach(a => {
                            if (ayahIds.indexOf(a._id) === -1) {
                                ayahIds = [...ayahIds, a._id];
                            }
                        });
                        return ayahIds;
                    }
                },
                ayahMaps: {
                    $apply: (ayahMaps) => {
                        ayah.forEach(a => {
                            if (!ayahMaps[a._id]) {
                                ayahMaps[a._id] = a;
                            }
                        });
                        return ayahMaps;
                    }
                }
            })
        case "LOAD_ALL_SURAH_START":
            return update(state, {
                phase: {$set: "LOADING"}
            });
        case "LOAD_ALL_SURAH_SUCCESS":
            const surah = payload.data.allSura;
            return update(state, {
                phase: {$set: "IDLE"},
                surahIds: {
                    $apply: (surahIds) => {
                        surah.forEach(sura => {
                            if (state.surahIds.indexOf(sura._id) === -1) {
                                surahIds = [...surahIds, sura._id];
                            }
                        });

                        return surahIds;
                    }
                },
                surahMaps: {
                    $apply: (surahMaps) => {
                        surah.forEach(sura => {
                            if (!state.surahMaps[sura._id]) {
                                sura.cursor = {
                                    offset: 0,
                                    limit: 20
                                }
                                surahMaps[sura._id] = sura;
                            }
                        });

                        return surahMaps;
                    }
                }
            });
        case "SET_ACTIVE_SURA":
            return update(state, {
                activeSuraId: {$set: payload.sura_id}
            });
        default:
            return state;
    }
}

module.exports = quran;