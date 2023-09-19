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
import Result "mo:base/Result";
import Nat32 "mo:base/Nat32";
import Array "mo:base/Array";
import Nat64 "mo:base/Nat64";

import Types "./types";
import VDBTypes "./vdbTypes";


shared ({ caller }) actor class Nexai() = {



  // types from types.mo file
  public type CompanyEntry = Types.CompanyEntry;
  public type CardEntry = Types.CardEntry;


  //for stability
  private stable var cardId : Nat = 1;
  private  var vdbCanisterId: Text = "rrkah-fqaaa-aaaaa-aaaaq-cai";

  //create HashMaps

  //TODO: should take Principal as key
  var CompanyHashMap : HashMap.HashMap<Principal, CompanyEntry> = HashMap.HashMap<Principal, CompanyEntry>(10, Principal.equal, Principal.hash);
  var CardHashMap : HashMap.HashMap<Nat, CardEntry> = HashMap.HashMap<Nat, CardEntry>(1, Nat.equal, Hash.hash);


  //connect to the vector database
  let vdb = actor(vdbCanisterId): actor { 
        add_manager: (Principal) -> async Bool;
        remove_manager: (Principal) -> async Bool; 
        add_accesser: (Principal) ->  async Bool;
        remove_accesser: (Principal) -> async Bool;
        register: (Text) -> async  VDBTypes.Result_2;
        build_index: ([Nat]) -> async  VDBTypes.Result;
        get_similar: (Nat, [Nat64], Nat32) -> async (VDBTypes.Result_1);
        append_keys_values: (Nat32,[Nat64],  [Text]) -> async VDBTypes.Result;
       }; 

// SPECIAL FUNCS TO THE VDB

public shared ({caller}) func makeManager(): async Bool {
  try {
    return let res = await vdb.add_manager(caller);
  } catch err {
      throw (err);
  }
  
};

public func VDBRegister (description:Text): async VDBTypes.Result_2 {
  let register = await vdb.register(description);
  Debug.print(debug_show(register));
  return register;

};


// public  shared  ({ caller }) func createCompany() : async ?CompanyEntry {
//    //firstly create comapny on the vdb
//    let res = await VDBRegister(description);

//   };

public func VDBAddQandA (companyId:Nat32, keys:[Nat64], values:[Text]): async VDBTypes.Result {
  let qa = await vdb.append_keys_values(companyId, keys, values);
  return qa;
};

public func VDBBuildIndex (companyId: [Nat]): async VDBTypes.Result {
  let build = await vdb.build_index(companyId);
  return build;
} ;


public func VDBGetSimilar (companyId:Nat, question: [Nat64], limit:Nat32): async VDBTypes.Result_1{
let similar = await vdb.get_similar(companyId, question, limit);
return similar;
};


public shared ({ caller }) func CheckPrincipal() : async Principal {caller};

  func _makeCompany(name : Text, email : Text, description:Text, vdbId:Nat32, createdAt : Int) : Types.CompanyEntry {
    {
      name : Text;
      email : Text;
      description: Text;
      vdbId: Nat32;
      createdAt : Int;
    };
  };

//TODO: call the VDBRegister inside this func and save the return entry into the hashmap
//rather than calling the functions seperately on the frontend
  public shared ({ caller }) func createCompany(name : Text, email : Text, description:Text, vdbId:Nat32) : async ?CompanyEntry {
    var newUser : Bool = true;

    for ((i, j) in CompanyHashMap.entries()) {
      if (j.email == email) {
        throw Error.reject("$ A user with that username exists, kindly pick another username. Thank you! # ");
        newUser := false;
      };
    };
    //This basically means there is a new user
    if (newUser == true) {
      CompanyHashMap.put(caller, _makeCompany(name, email, description, vdbId, Time.now()));

    };

    return await getCompanyProfile();
  };

  public shared ({ caller }) func getAllCompanies() : async ([(Principal, Types.CompanyEntry)]) {
    Iter.toArray(CompanyHashMap.entries());
  };

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

  //Edit company details

  //LogIn
  public shared query ({ caller }) func logIn() : async Bool {
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

  func _createQCard(vdbId : Nat32, question : Text, answer : Text) : CardEntry {
    { vdbId : Nat32; question : Text; answer : Text };
  };

  public shared ({ caller }) func createQCard(question : Text, answer : Text,keys:[Nat64], values:[Text]) : async () {

    // var res: CardEntry = {};
    //find the CompanyEntry by the caller == companyEntry.principal
    for ((i, j) in CompanyHashMap.entries()) {
      if (i == caller) {

        var res_ = CardHashMap.put(cardId, _createQCard(j.vdbId, question, answer));
        var savetovdb =  await VDBAddQandA(j.vdbId, keys, values);
        cardId := cardId + 1;

        Debug.print(debug_show(savetovdb));

      };
      // return res;
    };
  };

  public shared ({ caller }) func getAnAnswer(id : Nat) : async ?CardEntry {

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

  public shared ({ caller }) func getAllQCards(id : Nat32) : async ?[CardEntry] {
    do ? {
      var buff = Buffer.Buffer<CardEntry>(0);
      for ((i, j) in CardHashMap.entries()) {
        if (j.vdbId == id) {
          buff.add(j);
        };
      };
      buff.toArray();

    };
  };

  public  shared query ({ caller }) func getCompanyProfile() : async ?CompanyEntry {
   return CompanyHashMap.get(caller);
  };





};

