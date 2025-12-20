import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"))
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
  }, [user])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  })

  const GetUserProfile = async (tokenInfo) => {
    const resp = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      }
    )

    const userData = resp.data

    await setDoc(
      doc(db, "users", userData.email),
      {
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        lastLogin: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    )

    localStorage.setItem("user", JSON.stringify(userData))
    setOpenDialog(false)
    navigate("/create-trip")
  }

  return (
    <header className="w-full shadow-sm px-4 py-3 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />

        {user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <Button variant="outline" onClick={() => navigate("/create-trip")}>
              + Create Trip
            </Button>

            <Button variant="outline" onClick={() => navigate("/my-trips")}>
              My Trips
            </Button>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="User"
                  className="h-9 w-9 rounded-full cursor-pointer"
                />
              </PopoverTrigger>

              <PopoverContent className="w-32 text-center">
                <h2
                  className="cursor-pointer text-sm font-medium text-red-500 hover:underline"
                  onClick={() => {
                    googleLogout()
                    localStorage.removeItem("user")
                    navigate("/")
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* ---- SIGN IN DIALOG ---- */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <img src="/logo.png" className="mx-auto mb-4 h-10" />

            <DialogTitle className="text-center text-lg font-bold">
              Sign In With Google
            </DialogTitle>

            <DialogDescription className="text-center">
              Sign in to the App with Google authentication securly
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={login}
            className="w-full mt-5 flex gap-4 items-center"
          >
            <FcGoogle className="h-6 w-6" />
            Sign In With Google
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header;