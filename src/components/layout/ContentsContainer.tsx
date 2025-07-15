import { Footer } from "@/components/layout";

export function ContentsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="conWrap">
      <div className="conArea">{children}</div>
      <Footer />
    </div>
  );
}
