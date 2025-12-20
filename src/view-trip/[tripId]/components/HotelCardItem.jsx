/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({ hotel }) {

    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
        hotel && GetPlacePhoto()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotel])

    const GetPlacePhoto = () => {
        const data = {
            textQuery: hotel?.hotelName,
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
                "https://www.google.com/maps/search/?api=1&query=" +
                hotel.hotelName +
                "," +
                hotel?.hotelAddress
            }
            target="_blank"
        >
            <div className="mt-5 cursor-pointer transition-all hover:scale-105">
                <img
                    src={photoUrl ? photoUrl : '/Placeholder.jpg'}
                    alt={hotel?.hotelName}
                    className="h-[160px] sm:h-[180px] w-full rounded-lg object-cover"
                />

                <div className="my-3 flex flex-col gap-2">
                    <h2 className="font-medium">
                        {hotel?.hotelName}
                    </h2>

                    <h2 className="text-xs text-gray-500">
                        📍 {hotel?.hotelAddress}
                    </h2>

                    <h2 className="text-sm">
                        💰 {hotel?.price}
                    </h2>

                    <h2 className="text-sm">
                        ⭐ {hotel?.rating}
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem;