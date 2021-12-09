const { tx } = require('@sap/cds');
const cds = require('@sap/cds')
const { Cat, Kitten, ShelterCases } = cds.entities

module.exports = cds.service.impl(srv => {
    srv.before('CREATE', 'ShelterCases', async (req) => {
        let catPriceQuery = SELECT.from(Cat)
            .columns(`price`)
            .where({Id:req.data.cat_Id});
        let catPrice = await cds.run(catPriceQuery);

        let kittensAmountQuery = SELECT.from(Kitten)
            .columns(`sum(price)`)
            .where({parent_ID: req.data.cat_Id});
        let kittemsAmount = await cds.run(kittensAmountQuery);

        let catAmount = catPrice[0].price + kittemsAmount[0]["sum ( price )"];

        //                          or

        // let query = `select sum(pet_shop_db_Kitten.price), psdC.price
        // from pet_shop_db_Kitten join pet_shop_db_Cat psdC
        //     on pet_shop_db_Kitten.parent_Id = psdC.Id
        // where parent_Id = ${req.data.cat_Id};`
        // let amountObj = await cds.run(query);
        // let catAmount = (amountObj[0]['sum(pet_shop_db_Kitten.price)'] + amountObj[0].price);

        return req.data.amount = catAmount;

    });

    srv.after('CREATE', 'ShelterCases', (req) => {
        let tx = cds.transaction(req);
        tx.run(DELETE.from('Cat').where({Id: req.cat_Id})).then(tx.commit(), tx.rollback())
    });
})