
import MainComponent from "@/components/MainComponent";
import { JobProvider } from "@/context/JobContext";

export default async function Home() {
  return (
    <JobProvider>
      <MainComponent/>
    </JobProvider>
  );
}

