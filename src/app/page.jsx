
import MainComponent from "@/components/MainComponent";
import { JobProvider } from "@/context/JobContext";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  return (
    <JobProvider>
      <Toaster  gutter={8} toastOptions={{duration:2500,position:'top-center',style:{backgroundColor:'#0e0e0e', color:'#fff', minWidth: '20rem'}}} />
      <MainComponent/>
    </JobProvider>
  );
}

