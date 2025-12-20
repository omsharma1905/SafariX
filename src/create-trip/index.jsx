import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions } from '../constants/options';
import { SelectTravelesList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from "sonner";
import { chatSession } from '@/service/AIModal';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState()
  const [formData, setFormData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [Loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  })

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user')

    if (!user) {
      setOpenDialog(true)
      return
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.people
    ) {
      toast("Please Fill all Details 📝")
      return
    }

    setLoading(true)

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{people}', formData?.people)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT)

    console.log("--", result?.response?.text())
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)

    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()

    await setDoc(doc(db, "AITrip", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    })

    setLoading(false)
    navigate(`/view-trip/${docId}`)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
      }
    ).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false)
      OnGenerateTrip()
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-56 mt-10">
      <h2 className="font-bold text-2xl sm:text-3xl">
        Tell us your Travel Preferences 🏕️🌴
      </h2>

      <p className="mt-3 text-gray-500 text-base sm:text-lg">
        Just Provide some basic information, and our trip planner will generate
        a customized itinerary based on your Preferences.
      </p>

      <div className="mt-16 flex flex-col gap-10">
        <div>
          <h2 className="text-lg sm:text-xl my-3 font-medium">
            What is the Destination of your Choice ?
          </h2>

          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v)
                handleInputChange('location', v)
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl my-3 font-medium">
            How many Days are you planning your trip ?
          </h2>

          <Input
            placeholder="Ex.3"
            type="number"
            onChange={(e) =>
              handleInputChange('noOfDays', e.target.value)
            }
          />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl my-3 font-medium">
            What is Your Budget ?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  handleInputChange('budget', item.title)
                }
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.budget == item.title && 'shadow-lg border-black'}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl my-3 font-medium">
            Who do you Plan on travelling with on your next Adventure ?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  handleInputChange('people', item.people)
                }
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.people == item.people && 'shadow-lg border-black'}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={Loading} onClick={OnGenerateTrip}>
          {Loading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
          ) : (
            'Generate Trip'
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center text-center">
              <img src="/logo.png" alt="Logo" className="h-10 mb-5" />

              <h2 className="font-bold text-lg">
                Sign In With Google
              </h2>

              <p className="text-sm text-gray-500">
                Sign in to the App with Google authentication securely
              </p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip;