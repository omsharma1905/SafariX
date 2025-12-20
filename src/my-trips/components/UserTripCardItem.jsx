/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    trip && GetPlacePhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip])

  const GetPlacePhoto = () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    }

    GetPlaceDetails(data)
      .then(resp => {
        const photoName =
          resp?.data?.places?.[0]?.photos?.[3]?.name

        if (photoName) {
          const PhotoURL = PHOTO_REF_URL.replace(
            '{NAME}',
            photoName
          )
          setPhotoUrl(PhotoURL)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="transition-all hover:scale-105 cursor-pointer">
        <img
          src={photoUrl ? photoUrl : '/Placeholder.jpg'}
          alt="Trip"
          className="object-cover rounded-xl
                     h-[220px] sm:h-[260px] md:h-[300px]
                     w-full max-w-[300px]"
        />

        <div className="mt-3">
          <h2 className="font-bold text-base sm:text-lg">
            {trip?.userSelection?.location?.label}
          </h2>

          <h2 className="text-gray-500 text-sm">
            {trip?.userSelection?.noOfDays} Days Trip with{' '}
            {trip?.userSelection?.budget} Fund
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCardItem;