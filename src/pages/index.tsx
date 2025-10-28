import { Converter } from "../components/converter";

export default async function HomePage() {
  return (
    <div>
      <Converter />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
