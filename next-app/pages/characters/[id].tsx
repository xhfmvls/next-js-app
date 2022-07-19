import { Character, getCharacterResults } from "../../types";
import Image from "next/image";
import imageLoader from "../../imageLoader";

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

export const getStaticPaths = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const { results }: getCharacterResults = await res.json();

  return {
    paths: results.map((character) => {
      return {
        params: {
          id: String(character.id)
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
  const character = await res.json();

  return {
    props: {
      character: character
    }
  }
}

export default characterPage; 