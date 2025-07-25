import { IndexSignatureType } from "@/modules/types";
import CharactersDetail from "@/modules/characters/detail";
import { LoaderFunction, useLoaderData } from "react-router-dom";

export const loader: LoaderFunction<IndexSignatureType> = async ({
  params,
}) => {
  const { id } = params;
  console.log(id);
  return { id };
};

export function Component() {
  const { id } = useLoaderData() as { id: string };
  return <CharactersDetail id={id} />;
}
