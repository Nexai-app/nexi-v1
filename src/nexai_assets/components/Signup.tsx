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
} from "@chakra-ui/react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { addProfile } from "../redux-toolkit/slice/ProfileSlice";

function SignUpForm() {
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
    <Flex alignItems="center" className="signup">
      <Container
        maxW="container.sm"
        alignItems={`center`}
        color={`white`}
      >
        <Heading>Sign Up On Nexai</Heading>
        <Box>
          <FormControl isRequired mb={`40px`}>
            <FormLabel>Company Name</FormLabel>
            <Input
              name="name"
              value={appName}
              onChange={(e) => {
                setAppName(e.target.value);
              }}
              placeholder="Enter company name"
              height="60px"
              px={`5`}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired mb={`40px`}>
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter email address"
              height="60px"
              px={`5`}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl isRequired mb="40px">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              placeholder="Let your custom-made assistant understand what your company is all about..."
            />
          </FormControl>
        </Box>
        <Button
          width="full"
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
      </Container>
    </Flex>
  );
}

export default SignUpForm;
