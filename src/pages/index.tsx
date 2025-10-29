import PartCalculator from "../components/PartCalculator";
import { TimeCalculator } from "../components/TimeCalculator";

export default async function HomePage() {
  return (
    <div>
      <TimeCalculator />
      <PartCalculator />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
