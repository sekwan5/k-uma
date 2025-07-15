// import { getHeroById, IHero } from "@/modules/data/getHeroData";
// import { LoaderFunction, LoaderFunctionArgs, redirect } from "react-router-dom";

// export const loadHeroData: LoaderFunction = async (
//   args: LoaderFunctionArgs,
// ) => {
//   if (args.params.id === undefined) {
//     throw new Error("ID가 제공되지 않았습니다.");
//   }
//   let hero: IHero | undefined;
//   try {
//     hero = getHeroById(args.params.id);
//     if (!hero) {
//       throw new Error("영웅을 찾을 수 없습니다.");
//     }
//   } catch (error) {
//     alert("영웅을 찾을 수 없습니다.");
//     return redirect("/hero");
//   }

//   return { id: args.params.id, hero };
// };
