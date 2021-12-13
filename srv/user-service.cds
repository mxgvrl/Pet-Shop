using { pet_shop.db as schema } from '../db/schema';

service UserService @(path: '/catalog') {

    entity Cat as projection on schema.Cat;
    entity Kitten as projection on schema.Kitten;
    @insertOnly entity ShelterCases as projection on schema.ShelterCases;
    @insertOnly entity ShelterCaseItems as projection on schema.ShelterCaseItems;

}

annotate UserService.ShelterCaseItems with @odata.draft.enabled;
annotate UserService.Cat with @odata.draft.enabled;


// extend service UserService with {
//   entity ShelterCaseItems as select from schema.ShelterCaseItems;
// }