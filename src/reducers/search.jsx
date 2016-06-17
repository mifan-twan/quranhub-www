const update = require('react-addons-update');

const initialState = {
    searchQuery: "",
    searchResults: []
};

const search = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case "SEARCH_QUERY_START":
            return update(state, {
                searchQuery: {
                    $set: payload.query
                }
            });
        case "SEARCH_QUERY_SUCCESS":
            if (state.searchQuery !== payload.query) {
                return state;
            }
            return update(state, {
                searchResults: {$set: payload.data.search}
            })
        default:
            return state;
    }
}

module.exports = search;