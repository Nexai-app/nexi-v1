import Bool "mo:base/Bool";
import CompanyHashMap "mo:base/Array";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";

import Types "./types";

shared ({ caller }) actor class Nexai() = {

  // Debug.print(debug_show(caller));

  // types from types.mo file
  public type CompanyEntry = Types.CompanyEntry;
  public type CardEntry = Types.CardEntry;

  //for stability
  private stable var cardId : Nat = 1;

  //create HashMaps

  //TODO: should take Principal as key
  var CompanyHashMap : HashMap.HashMap<Principal, CompanyEntry> = HashMap.HashMap<Principal, CompanyEntry>(10, Principal.equal, Principal.hash);
  var CardHashMap : HashMap.HashMap<Nat, CardEntry> = HashMap.HashMap<Nat, CardEntry>(1, Nat.equal, Hash.hash);

  public shared ({ caller }) func CheckPrincipal() : async Principal { caller };

  func _makeCompany(name : Text, email : Text, createdAt : Int) : Types.CompanyEntry {
    {
      name : Text;
      email : Text;
      createdAt : Int;
    };
  };

  public shared ({ caller }) func createCompany(name : Text, email : Text) : async Bool {
    var newUser : Bool = false;

    for ((i, j) in CompanyHashMap.entries()) {
      if (j.email == email) {
        // unique := true;
        throw Error.reject("$ A user with that username exists, kindly pick another username. Thank you! # ");

      };
    };
    if (newUser == false) {
      CompanyHashMap.put(caller, _makeCompany(name, email, Time.now()));
      newUser := true;
    };
    return newUser;
    // TODO: automatically make about of company, founder, and name of company as the entered values
  };

  public func getAllCompanies() : async ([(Principal, Types.CompanyEntry)]) {
    Iter.toArray(CompanyHashMap.entries());
  };

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  //Edit company details

  //LogIn
  public query func logIn() : async Bool {
    var logIn = false;
    for ((i, j) in CompanyHashMap.entries()) {
      if (i == caller) {
        logIn := true;
      };
    };
    return logIn;
  };

  /**
   * Create card and answers
   * Link them to the comapany or principal
   *
   */

  func _createQCard(email : Text, question : Text, answer : Text) : CardEntry {
    { email : Text; question : Text; answer : Text };
  };

  public func createQCard(question : Text, answer : Text) : async () {

    //find the CompanyEntry by the caller == companyEntry.principal
    for ((i, j) in CompanyHashMap.entries()) {
      if (i == caller) {

        CardHashMap.put(cardId, _createQCard(j.email, question, answer));
        cardId := cardId + 1;

      };
    };
  };

  public func getAnAnswer(id : Nat) : async ?CardEntry {

    var res = CardHashMap.get(id);

    switch (res) {
      case (null) {
        return null;
      };
      case (?res) {
        return ?res;
      };
    };

  };

  public func getAllQCards(email : Text) : async ?[CardEntry] {
    do ? {
      var buff = Buffer.Buffer<CardEntry>(0);
      for ((i, j) in CardHashMap.entries()) {
        if (j.email == email) {
          buff.add(j);
        };
      };
      buff.toArray();
    };
  };

  public func getCompanyProfile() : async ?CompanyEntry {
    CompanyHashMap.get(caller);
  };

};
