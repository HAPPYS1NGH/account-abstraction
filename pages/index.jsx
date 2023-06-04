import FirstScreen from "@/components/FirstScreen";
import NormalScreen from "@/components/NormalScreen";
import { useEffect, useState } from "react";
export default function Home() {
  let [isFirstVisit, setFirstVisit] = useState(true)
  let [Loading, setLoading] = useState(true)

  useEffect(() => {
    let visit = localStorage.getItem('firstVisit') === "Visited";
    setFirstVisit(!visit)
    setLoading(false)
  }, [])

  return (
    <div className="xl:px-90 md:px-4 sm:px-2 bg-gray-100 rounded-lg h-screen">
      {
        Loading
          ?
          ""
          :
          isFirstVisit
            ?
            <FirstScreen setFirstVisit={setFirstVisit} />
            :
            <NormalScreen />
      }
    </div>
  );
}

