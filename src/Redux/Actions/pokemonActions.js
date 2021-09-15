import { POKEAPI } from "../../pages";

/* Actions for consume the API */
export const FETCH_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_SUCCESS2 = "FETCH_POSTS_SUCCESS2";
export const FETCH_ERROR = "FETCH_POSTS_ERROR";
export const HANDLER_FETCH = "TRIGEER_FETCH";

/* Actions after charge the porkemons */
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const ADD_SELECTED_POKEMON = "ADD_SELECTED_POKEMON";
export const CLEAN_SELECTED_POKEMON = "CLEAN_SELECTED_POKEMON";
export const SET_COMPARISON_CHART = "SET_SHOW_COMPARISON_CHART";
export const ADD_SEARCH = "ADD_SEARCH";

/* Function that brings pokemons data from API URL */
export const FetchRequest = (counter) => (dispatch) => {
  const url = `${POKEAPI}pokemon?offset=${counter}&limit=20`;

  dispatch({ type: FETCH_REQUEST });
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          pokemons: data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ERROR,
        payload: {
          error: error.toString(),
        },
      });
    });
};

/* function that handle the number of pokemons in the list which are called from the API */
export const HandlerFetch = (pokemonsInList) => (dispatch) => {
  dispatch({
    type: HANDLER_FETCH,
    payload: {
      counter: Number(pokemonsInList) + 20,
    },
  });
};

/* If the user selects one Card that contains the picture and Name of a pokemon - 
its doing the call to this function that add the info to can be seen after*/
export const addSelectedPokemon =
  (pokemon, pokemonUrl, pokemonDescriptionUrl) => (dispatch) => {
    Promise.all([
      fetch(pokemonUrl).then((pokemonRes) => pokemonRes.json()),
      fetch(pokemonDescriptionUrl).then((pokemonDescriptionRes) =>
        pokemonDescriptionRes.json()
      ),
    ])
      .then(([pokemonRes, pokemonDescriptionRes]) => {
        if (
          pokemonDescriptionRes.gender_rate >= 0 &&
          pokemonDescriptionRes.gender_rate <= 4
        ) {
          pokemonDescriptionRes.gender = "Male";
        } else if (pokemonDescriptionRes.gender_rate === -1) {
          pokemonDescriptionRes.gender = "Genderless";
        } else {
          pokemonDescriptionRes.gender = "Female";
        }

        dispatch({
          type: ADD_SELECTED_POKEMON,
          payload: {
            pokemons: pokemonRes,
            pokemonDescription: pokemonDescriptionRes,
            pokemon: pokemon,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ERROR,
          payload: {
            error: error.toString(),
          },
        });
      });
  };

/* This function assigns void value to pokemon Array  */
export const cleanSelectedPokemons = () => (dispatch) => {
  dispatch({
    type: CLEAN_SELECTED_POKEMON,
    payload: {
      pokemons: [],
    },
  });
};

/* function that allows to enable the comparison chart */
export const setComparisonChart = (showchart) => (dispatch) => {
  dispatch({
    type: SET_COMPARISON_CHART,
    payload: {
      actualState: showchart,
    },
  });
};

/* This function search for a pokemon that is in the list  */
export const addSearch = (search, pokemonsArrayIn) => ({
  type: ADD_SEARCH,
  payload: {
    search,
    pokemonsList: pokemonsArrayIn.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    ),
  },
});
