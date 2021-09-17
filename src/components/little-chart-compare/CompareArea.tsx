
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Props} from "../components/interfaces-folder/Compare";

const ToastComponent: React.FC<Props> = ({ pokemonInPokeball, showChart }):JSX.Element => {
  const [pokemonName, setPokemonName] = useState();

  useEffect(() => {
    if (pokemonInPokeball.length > 0) {
      setPokemonName(pokemonInPokeball[0].name);
    }
  }, [pokemonInPokeball]);

  return (
    <div className={showChart ? "relative opacity-80 right-4" : "hidden"}>
      <div className="m-3 w-40 sticky top-0 z-10 text-center left-full">
        <strong className="type-comparison">Comparing pokemon</strong>
        <div className="w-40 text-center font-semibold border border-gray-400 bg-blue-bg text-white">
          {String(pokemonName).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: {
  pokemons: { pokemonInPokeball: string[]; showChart: boolean };
}) => {
  return {
    pokemonInPokeball: state.pokemons.pokemonInPokeball,
    showChart: state.pokemons.showChart,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastComponent);
