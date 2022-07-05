const axios = require("axios").default;

let exportedMethods = {

    async getAll(showSearchTerm){
        const show = await axios.get(`http://api.tvmaze.com/search/shows?q=${showSearchTerm}`);
        return await show.data;
    },

    async getShowWithId(id){
        if(id<0) throw new Error("The id can only be a positive whole number!!!");
        const show = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        if(show.length == 0) throw new Error("No movie with "+id+" as id exists!!!");
        return await show.data;
    }
}

module.exports = exportedMethods;