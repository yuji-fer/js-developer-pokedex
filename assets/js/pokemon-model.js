
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
    abilities = [];
    height;
    weight;
    stats = [];
}

class PokemonStat {
    name;
    value;

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
