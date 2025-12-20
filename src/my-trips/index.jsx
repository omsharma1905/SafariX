import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from '/src/my-trips/components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate()
    const [userTrips, setUserTrips] = useState([])

    useEffect(() => {
        GetUserTrips()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (!user) {
            navigate('/')
            return
        }

        const q = query(
            collection(db, 'AITrip'),
            where('userEmail', '==', user?.email)
        )

        const querySnapshot = await getDocs(q)

        setUserTrips([])

        querySnapshot.forEach((doc) => {
            setUserTrips((prevVal) => [...prevVal, doc.data()])
        })
    }

    return (
        <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-56 mt-10 pb-10">
            <h2 className="font-bold text-2xl sm:text-3xl">
                My Trips
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
                {userTrips.map((trip, index) => (
                    <UserTripCardItem key={index} trip={trip} />
                ))}
            </div>

            {userTrips.length === 0 && (
                <p className="text-gray-500 mt-10 text-center">
                    No trips found. Create your first trip ✨
                </p>
            )}
        </div>
    )
}

export default MyTrips;