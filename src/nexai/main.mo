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
import Blob "mo:base/Blob";
import Float "mo:base/Float";
import Int32 "mo:base/Int32";

import Types "./types";
import VDBTypes "./vdbTypes";

shared ({ caller }) actor class Nexai() = {

  type FloatVector = [Float];

  type FloatMatrix = [FloatVector];

  // types from types.mo file
  public type CompanyEntry = Types.CompanyEntry;
  public type CardEntry = Types.CardEntry;

  //new variables
  var newCard : [CardEntry] = [];
  var updatedCard : [CardEntry] = [];

  //for stability
  private stable var cardId : Nat = 1;
  // private  var vdbCanisterId: Text = "bw4dl-smaaa-aaaaa-qaacq-cai";

  private stable var cardEntries : [(Nat, CardEntry)] = [];
  private stable var companyEntries : [(Principal, CompanyEntry)] = [];

  //production vdb
  private var vdbCanisterId : Text = "fnnlb-hqaaa-aaaao-a2igq-cai";

  //create HashMaps

  //TODO: should take Principal as key
  var CompanyHashMap : HashMap.HashMap<Principal, CompanyEntry> = HashMap.fromIter<Principal, CompanyEntry>(companyEntries.vals(), 10, Principal.equal, Principal.hash);
  var CardHashMap : HashMap.HashMap<Nat, CardEntry> = HashMap.fromIter<Nat, CardEntry>(cardEntries.vals(), 1, Nat.equal, Hash.hash);
  // let map = Map.fromIter<Text,Nat>(
  //   entries.vals(), 10, Text.equal, Text.hash);

  public shared ({ caller }) func getVDB_ID(cardID : Nat) : async Nat32 {
    var result : Nat32 = 0;
    for ((card, entry) in CardHashMap.entries()) {
      if (card == cardID) {
        result := entry.vdbId;
      };
    };
    return result;
  };

  //connect to the vector database
  let vdb = actor (vdbCanisterId) : actor {
    add_manager : (Principal) -> async Bool;
    remove_manager : (Principal) -> async Bool;
    add_accesser : (Principal) -> async Bool;
    remove_accesser : (Principal) -> async Bool;
    register : (Text) -> async VDBTypes.Result_2;
    build_index : (Nat32) -> async VDBTypes.Result;
    get_similar : (Nat32, FloatVector, Int32) -> async (VDBTypes.Result_1);
    append_keys_values : (Nat32, FloatMatrix, [Text]) -> async VDBTypes.Result;
  };

  // SPECIAL FUNCS TO THE VDB

  public shared ({ caller }) func makeManager() : async Bool {
    try {
      return let res = await vdb.add_manager(caller);
    } catch err {
      throw (err);
    };

  };

  public func VDBRegister(description : Text) : async VDBTypes.Result_2 {
    let register = await vdb.register(description);
    Debug.print(debug_show (register));
    return register;

  };

  // public  shared  ({ caller }) func createCompany() : async ?CompanyEntry {
  //    //firstly create comapny on the vdb
  //    let res = await VDBRegister(description);

  //   };

  public func VDBAddQandA(companyId : Nat32, keys : FloatMatrix, values : [Text]) : async VDBTypes.Result {
    // try {
    let qa = await vdb.append_keys_values(companyId, keys, values);
    Debug.print(debug_show (qa));
    return qa;
    //  } catch (err) {
    //   throw Error.reject("Error communicating with the VDB");
    //  }
  };

  public func VDBBuildIndex(companyId : Nat32) : async VDBTypes.Result {
    let build = await vdb.build_index(companyId);
    return build;
  };

  public func VDBGetSimilar(companyId : Nat32, question : FloatVector, limit : Int32) : async VDBTypes.Result_1 {
    let similar = await vdb.get_similar(companyId, question, limit);
    Debug.print(debug_show (similar));
    return similar;
  };

  public shared ({ caller }) func CheckPrincipal() : async Principal {
    caller;
  };

  func _makeCompany(name : Text, email : Text, description : Text, vdbId : Nat32, createdAt : Int) : Types.CompanyEntry {
    {
      name : Text;
      email : Text;
      description : Text;
      vdbId : Nat32;
      createdAt : Int;
    };
  };

  //TODO: call the VDBRegister inside this func and save the return entry into the hashmap
  //rather than calling the functions seperately on the frontend
  public shared ({ caller }) func createCompany(name : Text, email : Text, description : Text, vdbId : Nat32) : async ?CompanyEntry {
    var newUser : Bool = true;

    for ((i, j) in CompanyHashMap.entries()) {
      if (j.email == email) {
        throw Error.reject("$ A user with that email exists # ");
        newUser := false;
      };
      if (i == caller) {
        throw Error.reject("$Opps! You can't create another account with the same identity :( # ");
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

  // public func Test(value : Nat) : async Nat {
  //   let external  = actor("bd3sg-teaaa-aaaaa-qaaba-cai"): actor { test : (Nat) -> async Nat };
  //   return await external.test(value);
  // };

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
   * Link them to the company or principal
   *
   */

  func _createQCard(vdbId : Nat32, question : Text, answer : Text) : CardEntry {
    { vdbId : Nat32; question : Text; answer : Text };
  };

  public shared ({ caller }) func createQCard(question : Text, answer : Text, keys : FloatMatrix, values : [Text]) : async Result.Result<Text, Text> {

    // var res: CardEntry = {};
    //find the CompanyEntry by the caller == companyEntry.principal
    for ((i, j) in CompanyHashMap.entries()) {
      if (i == caller) {

        var savetovdb = await VDBAddQandA(j.vdbId, keys, values);
        var buildIndex = await VDBBuildIndex(j.vdbId);
        Debug.print(debug_show (savetovdb));
        var res_ = CardHashMap.put(cardId, _createQCard(j.vdbId, question, answer));
        Debug.print(debug_show (cardId)); // added a debug_print to let the user know what card id their card has
        cardId := cardId + 1;

      };

    };
    return #ok("Card successfuly created , your id is " # Nat.toText(cardId));
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

  // edit and delete functions

  public shared func editQCard(cardId : Nat, updatedQuestion : Text, updatedAnswer : Text) : async () {
    var card = CardHashMap.get(cardId);
    switch (card) {
      case (null) {};
      case (?card) {
        var newCard : CardEntry = {
          vdbId = card.vdbId;
          question = updatedQuestion;
          answer = updatedAnswer;
        };
        CardHashMap.put(cardId, newCard);
      };

    };
    // "You have successfully edited whatever";
  };

  // delete function
  public shared func deleteQCard(cardId : Nat) : async () {
    CardHashMap.delete(cardId);
    // return ();
  };

  // -----------------------------------____________________-----------------------------

  public shared query ({ caller }) func getAllQCards(id : Nat32) : async ?[CardEntry] {
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

  public shared query ({ caller }) func getCompanyProfile() : async ?CompanyEntry {
    return CompanyHashMap.get(caller);
  };

  // stable UPGRADING
  system func preupgrade() {
    cardEntries := Iter.toArray(CardHashMap.entries());
    companyEntries := Iter.toArray(CompanyHashMap.entries());
  };

  system func postupgrade() {
    CardHashMap := HashMap.fromIter<Nat, CardEntry>(cardEntries.vals(), 1, Nat.equal, Hash.hash);
    cardEntries := [];

    CompanyHashMap := HashMap.fromIter<Principal, CompanyEntry>(companyEntries.vals(), 10, Principal.equal, Principal.hash);
    companyEntries := [];
  };

};
