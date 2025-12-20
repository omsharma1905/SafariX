/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ trip }) {

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
    <div>
      <img
        src={photoUrl ? photoUrl : '/Placeholder.jpg'}
        alt="Trip destination"
        className="h-[260px] sm:h-[350px] md:h-[450px] w-full object-cover rounded-xl"
      />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-xl sm:text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>

          <div className="flex flex-wrap gap-3">
            <h2 className="px-3 py-1 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>

            <h2 className="px-3 py-1 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
              💰 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className="px-3 py-1 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm">
              🥂 No of Traveler : {trip?.userSelection?.people}
            </h2>
          </div>
        </div>

        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  )
}

export default InfoSection;