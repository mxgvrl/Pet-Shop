const cds = require('@sap/cds')
const { Cat, Kitten } = cds.entities

module.exports = cds.service.impl(srv => {

    srv.on('breedType', async (req) => {
        let catBreedQuery = SELECT.from(Cat)
        .columns(`*`)
        .where({breed:req.data.breed});
        let catObjArray = await cds.run(catBreedQuery);
        console.log(catObjArray)

        let kittensBreedQuery;
        let kittenObjArray;
        for(let cat of catObjArray) {
            kittensBreedQuery = SELECT.from(Kitten)
            .columns(`*`)
            .where({breed:req.data.breed,parent_ID:cat.Id});
            kittenObjArray = await cds.run(kittensBreedQuery);
            console.log(kittenObjArray);
            cat.kittens = kittenObjArray;
        }

        return catObjArray;
    })
})