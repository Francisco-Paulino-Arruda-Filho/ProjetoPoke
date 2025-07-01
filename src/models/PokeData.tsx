interface PokeData {
    id?: number;  
    name: string;
    description: string;
    height: string;
    weight: string;
    types: string[];
    image: string;  
    onAdd?: (pokemon: PokeData) => void;
}

export default PokeData;
