import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import Float "mo:base/Float";

module {

  public type Result_2 = { #Ok : Nat32; #Err : Text };
  public type Result = { #Ok; #Err : Text };
  public type Result_1 = { #Ok : [(Float, Text)]; #Err : Text };

};
