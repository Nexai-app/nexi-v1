import React, { useEffect, useState, useContext } from "react";
import "./Signup.css";
import { AuthContext } from "../context/AuthContext";
import {
    Box,
    Container,
    Textarea,
    useToast,
    FormControl,
    Heading,
    Input,
    FormLabel,
    Flex,
    Button,
    Text,
    Image,
} from "@chakra-ui/react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { addProfile } from "../redux-toolkit/slice/ProfileSlice";
import Navbar from "./shared/Navbar";

interface loadingProps {
    isLoading: boolean
}

function LoadingScreen(props: loadingProps) {
    const [appName, setAppName] = useState("");
    const [email, setEmail] = useState("");
    const [desc, setDesc] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useAppDispatch();

    // dispatch({
    //   vdbId:id,
    //   email,
    //   name:appName,
    //   description
    // })yarn start

    //CHECK IS USER EXIST BEFORE
    const { actor } = useContext(AuthContext);

    const handleSubmit = (e) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        e.preventDefault();

        if (appName.length < 3) {
            toast({ title: "Company Name too short" });
            return;
        }
        if (!email.match(mailformat)) {
            toast({ title: "Email Invalid" });
            return;
        }

        if (desc.length < 10) {
            toast({ title: "Describe your company with more words" });
            return;
        }
        setSubmitting(true);
        actor
            .VDBRegister(desc)
            .then((data: any) => {
                let companyId = data.Ok;
                actor
                    .createCompany(appName, email, desc, data.Ok)
                    .then(() => {
                        console.log("got here");

                        const send = {
                            vdbId: companyId,
                            email,
                            name: appName,
                            description: desc,
                        };
                        dispatch(addProfile(send));
                        localStorage.setItem("vdbId", companyId);
                        toast({ title: "Account created!", status: "success" });
                        setSubmitting(false);
                        navigate("/train-bot");
                    })
                    .catch((err) => {
                        setSubmitting(false);
                        toast({
                            title: "Email might have been taken, try another",
                            status: "error",
                        });
                        console.log(err);
                    });
            })
            .catch((err) => {
                setSubmitting(false);
                toast({ title: "something went wrong!", status: "error" });
                console.log(err);
            });
    };

    return (
        <Box>
            <Navbar />
            <Flex
                alignItems="center"
                justify={`center`}
                textAlign={`center`}
                h={`70vh`}
            >
                <Box>
                    <Image src={props.isLoading ? `Rolling.svg` : `Done.svg`} />
                    <Text>
                        {props.isLoading ? "Thank you for submitting your document." : "Processing Completed"}
                    </Text>
                    <Text>
                        {props.isLoading ? "Please be patient as we process your upload. This may take a few moments. Sit back, relax !" : "Congratulations! Your uploaded document has been successfully processed."}
                    </Text>
                    {!props.isLoading && (
                        <Button
                            width="100px"
                            onClick={handleSubmit}
                            isLoading={submitting}
                            isDisabled={submitting}
                            bg={"white"}
                            color={`#341A41`}
                            border={`1px white solid`}
                            _hover={{ backgroundColor: "transparent", color: "white" }}
                        >
                            Sign Up
                        </Button>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}

export default LoadingScreen;

