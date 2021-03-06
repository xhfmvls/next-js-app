import { Character, getCharacterResults } from "../../types";
import Image from "next/image";
import imageLoader from "../../imageLoader";
import { GetServerSideProps } from "next";

const characterPage = ({ character }: { character: Character }) => {
  return <div>
    <h1>{character.name}</h1>
    <Image
      loader={imageLoader}
      unoptimized
      src={character.image}
      alt={character.name}
      width="500px"
      height="500px"
    />
  </div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${ctx.query.id}`)
  const character = await res.json();

  return {
    props: {
      character: character
    }
  }
}

export default characterPage; 