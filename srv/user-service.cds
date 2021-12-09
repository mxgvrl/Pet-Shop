using { pet_shop.db as schema } from '../db/schema';

service UserService @(path: '/catalog') {

    entity Cat as projection on schema.Cat;
    entity Kitten as projection on schema.Kitten;
    @insertOnly entity ShelterCases as projection on schema.ShelterCases;

}