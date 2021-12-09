const { tx } = require('@sap/cds');
const cds = require('@sap/cds')
const { Cat, ShelterCases } = cds.entities

module.exports = cds.service.impl(srv => {
    srv.before('CREATE', 'ShelterCases', async (req) => {
        let query = SELECT `price,kittens` .from `Cat` .where `Id=${req.data.cat_Id}`
        let catObjArray = await cds.run (query)
        let catAmount = 0
        for (let catObj of catObjArray) {
            catAmount += catObj.price;
            for (let kittens of catObj.kittens) {
                catAmount += kittens.price
            }
        }
        return req.data.amount = catAmount;
    });

    srv.after('CREATE', 'ShelterCases', (req) => {
        let tx = cds.transaction(req);
        tx.run(DELETE.from('Cat').where({Id: req.cat_Id})).then(tx.commit(), tx.rollback())
    });
})