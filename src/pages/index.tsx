import { TimeCalculator } from "../components/TimeCalculator";

export default async function HomePage() {
  return (
    <div>
      <TimeCalculator />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
