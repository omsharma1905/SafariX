export const SelectTravelesList = [
  {
    id: 1,
    title: 'Solo',
    desc: 'A Sole traveles in exploration',
    icon: '🚶',
    people: '1 People',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two traveles in tandem',
    icon: '💑',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekes',
    icon: '🤝',
    people: '5 to 10 People',
  },
]

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Budget',
    desc: 'Economy Stay, Travel & Food',
    icon: '💰',
  },
  {
    id: 2,
    title: 'Standard',
    desc: 'Keep cost on the average side',
    icon: '💵',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Dont worry about the cost',
    icon: '💎',
  },
]

export const AI_PROMPT =
  'Generate Travel Plan for Location : {location}, for {totalDays} Days for {people} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel imageUrl, geo coordinates, rating, descriptions and suggest itinerary with PlaceName, Place Details, Place ImageUrl, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit and provide working image also with correct price (Price in Dollar Value) in JSON format.'