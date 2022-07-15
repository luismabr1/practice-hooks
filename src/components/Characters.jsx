import React, { useState, useEffect, useReducer, useMemo } from "react"

const initialState = {
  favorites: [],
}

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

/* const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            const isExist = state.favorites.find(item => item.id === action.payload.id)
            if (isExist) return { ...state }
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }

        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(items => items.id !== action.payload)
            };

        default:
            return state;
    }
} */

const Characters = () => {
  const [characters, setCharacters] = useState([])
  /* aqui se establece el reducer se le pasa el reducer y el estado inicial
   */
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
  const [search, setSearch] = useState("")
  const API = "https://rickandmortyapi.com/api/character/"

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
  }, [])

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

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredCharacters = useMemo(() => {
    return (
      characters.filter((character) => 
        character.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  },[characters, search])

  return (
    <section className="text-gray-700 body-font ">
      <div className="Search">
        <input type="text" value={search} onChange={handleSearch} />
      </div>

      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Rick and Morty
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          All Characters
        </p>
      </div>
      <div className="container px-5 mx-auto ">
        <div className=" flex flex-wrap -m-2">
          {favorites.favorites.map((favorite) => (
            <li key={favorite.id}>{favorite.name}</li>
          ))}
          {characters.length > 0 &&
            filteredCharacters.map((character) => (
              <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={character.id}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={character.image}
                  />

                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">
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
                    <p className="text-gray-500">{character.status}</p>
                    <p className="text-gray-500">{character.species}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Characters
