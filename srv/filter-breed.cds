using { pet_shop.db as schema } from '../db/schema';

service FilterBreedService @(path: '/filterBreed') {

    entity Cat as select from schema.Cat;

    function breedType ( breed:String ) returns array of String;
    
}
