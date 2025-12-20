/* eslint-disable react/prop-types */
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className="font-bold text-lg">
                Places to Visit
            </h2>

            <div className="mt-5 flex flex-col gap-8">
                {trip.tripData?.itinerary.map((item, index) => (
                    <div key={index}>
                        <h2 className="font-medium text-lg">
                            Day {item.day}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                            {item.plan.map((place, index) => (
                                <div key={index}>
                                    <h2 className="font-medium text-sm text-orange-600">
                                        {place.timeToVisit}
                                    </h2>

                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit;