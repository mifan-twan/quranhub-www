"use strict";
const Promise = require('bluebird');
const { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const AyahType = new GraphQLObjectType({
    name: 'Ayah',
    fields: {
        _id: { type: GraphQLString },
        verse: { type: GraphQLInt },
        _language: { type: GraphQLInt },
        _sura: { type: GraphQLInt },
        ayah_text: { type: GraphQLString}
    }
})

const SuraType = new GraphQLObjectType({
    name: 'Sura',
    fields: {
        _id: { type: GraphQLInt },
        title: { type: GraphQLString },
        ayah: {
            type: new GraphQLList(AyahType),
            args: {
                offset: {type: GraphQLInt, name: 'offset' },
                limit: {type: GraphQLInt, name: 'limit' },
                translate: {type: GraphQLString, name: 'translate' }
            },
            resolve: (sura, {offset, limit, translate}, {Language, Ayah}) => {
                return new Promise((resolve, reject) => {
                    Language.findOne({code: translate? translate : 'id'})
                        .exec((err, language) => {
                            if(err) return reject(err);
                            Ayah.find({_sura: sura._id})
                                .or([{_language: 1}, {_language: language._id}])
                                .skip(offset)
                                .limit(limit)
                                .sort("verse")
                                .sort("_language")
                                .exec((err, ayah) => {
                                    if(err) {
                                        return reject(err)
                                    } else {
                                        return resolve(ayah.map(a => a.toJSON()));
                                    }
                                })
                        })
                });
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Root',
        fields: {
            sura: {
                type: SuraType,
                args: {
                    id: {
                        name: 'id',
                        type: GraphQLString,
                    },
                },
                resolve: (sura, args, {Sura}) => {
                    return new Promise((resolve, reject) => {
                        Sura.findOne({_id: args.id})
                        .exec((err, sura) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(sura.toJSON());
                            }
                        })
                    })
                }
            },
            allSura: {
                type: new GraphQLList(SuraType),
                resolve: (allSura, args, {Sura}) => {
                    return new Promise((resolve, reject) => {
                        Sura.find({})
                            .sort('_id')
                            .exec((err, sura) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(sura)
                                }
                            })
                    })
                }
            },
            search: {
                type: new GraphQLList(AyahType),
                args: {
                    query: {
                        name: "query",
                        type: GraphQLString
                    }
                },
                resolve: (search, {query}, {Ayah}) => {
                    return new Promise((resolve, reject) => {
                        Ayah.find({$text: {$search: query}})
                            .limit(20)
                            .exec((err, ayah) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    Promise.all(ayah.map(a => {
                                        return new Promise((resolve, reject) => {
                                            Ayah.find({_sura: a._sura, verse: a.verse})
                                            .or([{_language: a._language}, {_language: 1}])
                                            .exec((err, arabic) => {
                                                if (err) {
                                                    reject(err)
                                                } else {
                                                    resolve(arabic.map(ar => ar.toJSON()));
                                                }
                                            })
                                        })
                                    })).then(ayahs => {
                                        resolve(ayahs.reduce((p, c) => [...p, ...c], []));
                                    }).catch(reject)
                                }
                            })
                    })
                }
            }
        }
    })
});

module.exports = schema;