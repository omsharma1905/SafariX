/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({ place }) {

  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    place && GetPlacePhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place])

  const GetPlacePhoto = () => {
    const data = {
      textQuery: place.placeName,
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
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        place.placeName
      }
      target="_blank"
    >
      <div className="mt-2 flex gap-4 rounded-xl border p-3 cursor-pointer transition-all hover:scale-105 hover:shadow-md">
        <img
          src={photoUrl ? photoUrl : '/Placeholder.jpg'}
          alt={place.placeName}
          className="h-[90px] w-[90px] sm:h-[110px] sm:w-[110px] md:h-[130px] md:w-[130px] rounded-xl object-cover"
        />

        <div className="flex-1">
          <h2 className="font-bold text-base sm:text-lg">
            {place.placeName}
          </h2>

          <p className="text-sm text-gray-400 line-clamp-3">
            {place.placeDetails}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-sm">
              💵 {place.ticketPricing}
            </h2>

            <Button size="sm">
              <FaMapLocationDot />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem;