using { Currency, cuid, sap, managed } from '@sap/cds/common';
namespace pet_shop.db;

entity Cat {
    key Id: Integer;
    name: String(100);
    price: Decimal(5, 2);
    kittens: array of {
        price: Decimal(5, 2);
    }
}

entity ShelterCases {
    key Id: Integer;
    cat: Association to one Cat;
    amount: Decimal(5, 2);
}