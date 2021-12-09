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
        return req.data.amount = catAmount;
    });

    srv.after('CREATE', 'ShelterCases', (req) => {
        let tx = cds.transaction(req);
        tx.run(DELETE.from('Cat').where({Id: req.cat_Id})).then(tx.commit(), tx.rollback())
    });
})