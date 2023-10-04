import { useContext, useState } from "react";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { addProfile, addQAPair } from "../redux-toolkit/slice/ProfileSlice";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hooks";
import toast from "react-hot-toast";
import { QuestionAnswerT } from "../redux-toolkit/types";

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
  const { addQA } = useAddQA()
  const user = useAppSelector((state => state.profile))

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
          addQA();
        
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


const useAddQA = () => {
  const [loading, setLoading] = useState(false)
  const { actor } = useContext(AuthContext)
  const user = useAppSelector((state => state.profile))
  const dispatch = useAppDispatch();
  const vdbId = localStorage.getItem("vdbId")

  try {
    const addQA = async () => {
      actor.getAllQCards(Number(vdbId)).
        then((cards: any) => {
          let id = 1
          setLoading(true)
          cards[0]?.map((card: any) => {
            const res: QuestionAnswerT = {
              id,
              qa: card.question + " \n" + card.answer
            };
            dispatch(addQAPair(res));
            // console.log(res)
            id++;
          });
        }).catch((err) => {
          console.log(err)
          setLoading(false)
        });
      }
    return {loading, addQA }
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
}