const cds = require('@sap/cds')
const { Cat, Kitten, ShelterCases } = cds.entities

module.exports = cds.service.impl(srv => {
    srv.before('CREATE', 'ShelterCases', async (req) => {
        let catPriceQuery = {};
        let kittensAmountQuery = {};
        let kittemsAmount = 0;
        let orderAmount = 0;

        for(let item of req.data.shelterCaseItems) {
            catPriceQuery = SELECT.from(Cat)
                .columns(`price`)
                .where({Id:item.cat_Id});
            catPriceObj = await cds.run(catPriceQuery);
            orderAmount += catPriceObj[0].price;

            kittensAmountQuery = SELECT.from(Kitten)
                .columns(`sum(price)`)
                .where({parent_ID: item.cat_Id});
            kittemsAmount = await cds.run(kittensAmountQuery);
            orderAmount += kittemsAmount[0]["sum ( price )"];
        }
        
        return req.data.amount = orderAmount;
    });

    srv.after('CREATE', 'ShelterCases', async (req) => {
        // const cats = req.shelterCaseItems
        // console.log(book)

        // cds.transaction(req) .run (() => cats.map (item =>
        //     DELETE (Cat).where({Id:item.cat_Id})));
    });
     
})