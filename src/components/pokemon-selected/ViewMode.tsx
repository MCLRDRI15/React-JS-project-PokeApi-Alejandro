
import React from "react";
import { connect } from "react-redux";
import ShowPokemonData from "./ShowPokemonData";
import { setShow } from "../../redux/actions/SingleView";
import { cleanSelectedPokemons } from "../../redux/actions/PokemonActions";
import { setComparisonChart } from "../../redux/actions/PokemonActions";
import ShowPokemonCompare from "./ShowPokemonCompare";
import {Props} from "../components/interfaces-folder/ViewMode";


const ViewMode: React.FC<Props> = ({
  setShow,
  viewState,
  pokemonInPokeball,
  cleanSelectedPokemons,
  setComparisonChart,
  showChart,
}):JSX.Element => {
  const cleanPokemonArray = (): void => {
    setShow ? viewState : Boolean;
    cleanSelectedPokemons();
    if (showChart) {
      setComparisonChart();
    }
  };

  const keepPokemon = (): void => {
    setShow ? viewState : Boolean;
    setComparisonChart();
  };

  return (
    <div>
      {pokemonInPokeball.length > 1 && showChart ? (
        <ShowPokemonCompare
          pokemonInPokeball={pokemonInPokeball}
          viewState={viewState}
          cleanPokemonArray={cleanPokemonArray}
        />
      ) : (
        <ShowPokemonData
          pokemonInPokeball={pokemonInPokeball}
          singleView={viewState}
          cleanPokemonArray={cleanPokemonArray}
          keepPokemon={keepPokemon}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: {
  singleView: { showWindow: boolean };
  pokemons: { pokemonInPokeball: pokemons[]; showChart: boolean };
}) => {
  return {
    viewState: state.singleView.showWindow,
    pokemonInPokeball: state.pokemons.pokemonInPokeball,
    showChart: state.pokemons.showChart,
  };
};

const mapDispatchToProps = (
  dispatch: (parameter: {
    (
      dispatch: (parameter: {
        type: string;
        payload: { oldState?: boolean };
      }) => void
    ): void;
    (
      dispatch: (parameter: {
        type: string;
        payload: { pokemons: string[] };
      }) => void
    ): void;
    (
      dispatch: (parameter: {
        type: string;
        payload: { actualState: boolean };
      }) => void
    ): void;
  }) => void
) => {
  return {
    setShow: (oldState: boolean) => dispatch(setShow(oldState)),
    cleanSelectedPokemons: () => dispatch(cleanSelectedPokemons()),
    setComparisonChart: () => dispatch(setComparisonChart(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMode);
