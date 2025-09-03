import TableProvider from "@/components/common/CoTable/TableProvider";
import Test from "@/modules/test";

export function Component() {
  return (
    <>
      <div className="container test">
        <TableProvider>
          <Test />
        </TableProvider>
      </div>
    </>
  );
}
