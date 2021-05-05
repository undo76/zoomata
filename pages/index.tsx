import { PageLayout } from "../components/PageLayout";
import { GridCanvas } from "../components/GridCanvas";

export default function Example() {
  return (
    <PageLayout title="Title">
      <GridCanvas
        cellWidth={100}
        cellHeight={100}
        cols={10}
        rows={10}
        fillStyleFn={() => (Math.random() >= 0.5 ? "black" : "gray")}
      />
    </PageLayout>
  );
}
