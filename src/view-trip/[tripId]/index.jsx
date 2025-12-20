import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { toast } from 'sonner';

import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';

function Viewtrip() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState({})

  useEffect(() => {
    tripId && GetTripData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId])

  const GetTripData = async () => {
    const docRef = doc(db, "AITrip", tripId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setTrip(docSnap.data())
    } else {
      toast('No Trip Found!')
    }
  }

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-44 py-10">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plans */}
      <PlacesToVisit trip={trip} />
    </div>
  )
}

export default Viewtrip;