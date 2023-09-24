import { useContext, useState } from "react";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { addProfile } from "../redux-toolkit/slice/ProfileSlice";
import { useAppDispatch } from "../redux-toolkit/hooks";
import toast from "react-hot-toast";

// not useful, cll this function inside any page it is needed
export const useLogIn = () => {
  const { actor, setLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  try {
    const handleLogIn = (): void => {
      setLoading(true);
      actor
        .logIn()
        .then((data: boolean) => {
          setLoading(false);
          setLoggedIn(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    return { handleLogIn, loading };
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};

export const useUpdateProfile = () => {
  const { actor, setLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  try {
    const updateProfile = async () => {
      setLoading(true);
      actor
        .getCompanyProfile()
        .then((profile) => {
          const data = {
            vdbId: profile[0].vdbId,
            name: profile[0].name,
            description: profile[0].description,
            email: profile[0].email,
          };

          dispatch(addProfile(data));
          setLoading(false);
        })
        .catch((err) => {
          toast.error("you were logged out");
          navigate("/");
          console.log(err);
          setLoading(false);
        });
    };

    return { loading, updateProfile };
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};
// export
