import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";


module  {

public type Result_2 = { #Ok : Nat32; #Err : Text };
public type Result =  { #Ok: Null ; #Err: Text };
public type Result_1 =  {#Ok : [(Nat, Text)]} or {#Err: Text};

}