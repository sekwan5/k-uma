import { IndexSignatureType } from "@/modules/types";
import CharactersDetail from "@/modules/characters/detail";
import { LoaderFunction } from "react-router-dom";

export const loader: LoaderFunction<IndexSignatureType> = async ({
  params,
}) => {
  const { id } = params;
  console.log(id);
  return {};
};

export function Component() {
  return <CharactersDetail />;
}
