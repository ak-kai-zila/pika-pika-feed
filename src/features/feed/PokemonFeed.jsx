import React, { useEffect, useState } from 'react';


const PokemonFeed = () => {
    const [pokemons,setPokemons]=useState([])
    useEffect(() => {
        getPokemons();
    }, [])

    const getPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const results = await response.json();
        const pokemons = results?.results ?? []
        const abilititesPromiseList = await Promise.all(pokemons.map(item=>fetch(item.url)))
        const abilites =  await Promise.all(abilititesPromiseList.map(item=>item.json()))
        let pokemonDetails = abilites.map((item,index)=>({...pokemons[index],...item}))
        setPokemons(pokemonDetails);
    }

    console.log(pokemons,'pokemons_001')
    return (
        <div style={{ width: '100%', height: '100%' }}>
            {
                pokemons?.map(pokemon=>{
                    return (
                    <div>
                        {pokemon.name}
                    </div>)
                })
            }
        </div>
    )
}

export default PokemonFeed;