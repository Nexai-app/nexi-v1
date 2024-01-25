import { useContext, useState } from "react";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  addProfile,
  addQAPair,
} from "../redux-toolkit/slice/ProfileSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux-toolkit/hooks";
import toast from "react-hot-toast";
import {
  ConversationT,
  EnquiryT,
  QuestionAnswerT,
} from "../redux-toolkit/types";
import {
  ConnectionEntry,
  MessageEntry,
} from "../../declarations/nexai/nexai.did";
import {
  addEnquiry,
  clearEnqury,
} from "../redux-toolkit/slice/EnquirySlice";
import { Principal } from "@dfinity/principal";
import {
  addConvo,
  clearConvo,
} from "../redux-toolkit/slice/ConversationSlice";

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
  const { addQA } = useAddQA();
  const user = useAppSelector((state) => state.profile);

  try {
    const updateProfile = async () => {
      setLoading(true);
      actor
        ?.getCompanyProfile()
        .then((profile) => {
          actor?.CheckPrincipal().then((p) => {
            const data = {
              vdbId: profile[0].vdbId,
              name: profile[0].name,
              description: profile[0].description,
              email: profile[0].email,
              principal: p.toText(),
            };
            dispatch(addProfile(data));
            setLoading(false);
            console.debug(
              "[update profile fnc] - internal me was called"
            );
            addQA();
          });
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
  const [loading, setLoading] = useState(false);
  const { actor } = useContext(AuthContext);
  const user = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const vdbId = localStorage.getItem("vdbId");

  try {
    const addQA = async () => {
      actor
        ?.getAllQCards(Number(vdbId))
        .then((cards: any) => {
          let id = 1;
          setLoading(true);
          cards[0]?.map((card: any) => {
            const res: QuestionAnswerT = {
              id,
              qa: card.question + " \n" + card.answer,
            };
            dispatch(addQAPair(res));
            // console.log(res)
            id++;
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    return { loading, addQA };
  } catch (err) {
    setLoading(false);
    console.debug("[nexai]", err);
  }
};

// chat functions

export const useGetAllConnections = () => {
  const [loading, setLoading] = useState(false);
  const { actor } = useContext(AuthContext);
  const user = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  try {
    const getEnquires = () => {
      actor
        ?.getAllConnections()
        .then((connections: [ConnectionEntry[]]) => {
          if (connections) {
            dispatch(clearEnqury());
            var c = connections[0];
            for (let i = 0; i < c.length; i++) {
              var data: EnquiryT = {
                id: Number(c[i].id),
                account1: c[i].account1.toText(),
                account2: c[i].account2.toText(),
                createdAt: Number(c[i].createdAt),
              };
              dispatch(addEnquiry(data));
            }
          }
        })
        .catch((err) => {
          console.debug("[nexai]", err);
          setLoading(false);
        });
    };
    return { loading, getEnquires };
  } catch (err) {
    setLoading(false);
    console.debug("[nexai]", err);
  }
};

export const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const { actor } = useContext(AuthContext);
  const user = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  try {
    const handleGetConversation = (principal: Principal) => {
      actor
        ?.getMessages(principal)
        .then((data: [MessageEntry]) => {
          if (data) {
            dispatch(clearConvo());
            for (let i = 0; i < data.length; i++) {
              var param: ConversationT = {
                id: Number(data[i].id),
                connectionId: Number(data[i].connectionId),
                sender: data[i].sender.toText(),
                body: data[i].body,
                createdAt: Number(data[i].createdAt),
              };
              dispatch(addConvo(param));
              console.log(data);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          console.debug("[nexai]", err);
        });
    };

    return { handleGetConversation, loading };
  } catch (err) {
    console.debug("[nexai]", err);
    setLoading(false);
  }
};

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { actor } = useContext(AuthContext);
  const user = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  try {
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};
