import React, { useState, useReducer, useMemo, useRef, useCallback } from "react"
import Search from "./Search"
import useCharacters from "../hooks/useCharacters"

const initialState = {
  favorites: [],
}
const API = "https://rickandmortyapi.com/api/character/"

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
      }
    default:
      return state
  }
}


const Characters = () => {
  /* aqui se establece el reducer se le pasa el reducer y el estado inicial
   */
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
  const [search, setSearch] = useState("")
  const searchInput = useRef(null)

  const {characters} = useCharacters(API)


  const addFavorite = (character) => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: character,
    })
  }
  const removeFavorite = (id) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: id,
    })
  }
/* 
  const handleSearch = () => {
    setSearch(searchInput.current.value)
  } */

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  }, [searchInput])

  const filteredCharacters = useMemo(() => {
    return (
      characters.filter((character) => 
        character.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  },[characters, search])

  return (
    <>
    <div class="flex flex-col m-auto p-auto overflow-hidden">
    <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
    {favorites.favorites.map((favorite) => (
                <li key={favorite.id}>{favorite.name}</li>
    ))}
    <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 ">
            Rick and Morty 2
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            All Characters 2
            </p>
        </div>
      <div
        className="flex overflow-x-scroll pb-10 hide-scroll-bar"
      >
        <div
          className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 "
        >
            {characters.length > 0 &&
                filteredCharacters.map((character) => (
                    
                    <div className="inline-block px-3">
                    <div
                      className="w-64 h-full max-w-xs overflow-hidden rounded-lg shadow-md  hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                            <img
                                alt="team"
                                className="bg-gray-100 object-cover object-center flex-shrink-0 mr-4"
                                src={character.image}
                            />
                            <div className="flex-grow">
                        <h2 className="title-font font-medium">
                        {character.name}
                        </h2>
                        {/* evento click que agrega el favorito */}
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => addFavorite(character)}
                        >
                        Add to favorites
                        </button>
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => removeFavorite(character.id)}
                        >
                        Remove Fav
                        </button>
                        <p className="">{character.status}</p>
                        <p className="">{character.species}</p>
                    </div>
                  </div>
                </div>
                
                )
                )}
        </div>
      </div>
</div>

    
    </>
  )
}

export default Characters
