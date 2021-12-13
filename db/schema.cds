using { Currency, cuid, sap, managed } from '@sap/cds/common';
namespace pet_shop.db;

entity Cat {
    key Id: Integer;
    name: String(100);
    price: Decimal(5, 2);
    kittens: Composition of many Kitten on kittens.parent = $self;
}

entity Kitten {
    key Id: Integer;
    price: Decimal(5, 2);
    parent: Association to one Cat;
}

entity ShelterCases {
    key Id: Integer;
    amount: Decimal(5, 2);
    shelterCaseItems: Composition of many ShelterCaseItems on shelterCaseItems.caseId = $self;
}

entity ShelterCaseItems {
    key Id: Integer;
    key caseId: Association to ShelterCases;
    cat: Association to Cat;
}

