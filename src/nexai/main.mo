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
import Nat8 "mo:base/Nat8";

import AccountIdentifier "mo:principal/AccountIdentifier";

import ICPLedger "canister:icp_ledger";

import LedgerTypes "./ledgertypes";
import Utils "./utils";
import Types "./types";
import VDBTypes "./vdbTypes";
import Message "message";

shared ({ caller }) actor class Nexai() = this{

  type FloatVector = [Float];

  type FloatMatrix = [FloatVector];

  // types from types.mo file
  type CompanyEntry = Types.CompanyEntry;
  type CardEntry = Types.CardEntry;
  type MessageEntry = Types.MessageEntry;
  type ConnectionEntry = Types.ConnectionType;

  //new variables
  var newCard : [CardEntry] = [];
  var updatedCard : [CardEntry] = [];

  //for stability
  private stable var cardId : Nat = 1;

  private stable var connectionID : Nat = 0;
  private stable var messageID : Nat = 0;


  
  private  var vdbCanisterId: Text = "bw4dl-smaaa-aaaaa-qaacq-cai";
  
  private stable var cardEntries : [(Nat, CardEntry)] = [];
  private stable var companyEntries : [(Principal, CompanyEntry)] = [];

  private stable var conversationEntries : [(Text, Conversation)] = [];
  private stable var connectionEntries : [(Nat, ConnectionEntry)] = [];
  private stable var messageEntries : [(Nat, MessageEntry)] = [];
  //production vdb
  // private var vdbCanisterId: Text = "fnnlb-hqaaa-aaaao-a2igq-cai";

  //create HashMaps

  type Whoami = {
    #company : Principal;
    #anonymous : Principal;
  };

  type Message = {
    id : Nat;
    customer : Principal;
    body : Text;
    company : Principal;
    time : Int;
  };

  type Conversation = {
    conversationID : ?Text;
    messages : [Message];
  };

  var messages : [Message] = [];

  // var MessageHashMap : HashMap.HashMap<Text, Conversation> = HashMap.fromIter<Text, Conversation>(conversationEntries.vals(), 10, Text.equal, Text.hash);

  var ConnectionHashMap : HashMap.HashMap<Nat, ConnectionEntry> = HashMap.fromIter<Nat, ConnectionEntry>(connectionEntries.vals(), 10, Nat.equal, Hash.hash);
  var MessageHashMap_ : HashMap.HashMap<Nat, MessageEntry> = HashMap.fromIter<Nat, MessageEntry>(messageEntries.vals(), 10, Nat.equal, Hash.hash);
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

  public shared ({ caller }) func sendMessage(account : Principal, body : Text) : async ?() {
    var sent : Bool = false;
    do ? {
      var size = ConnectionHashMap.size();
      Debug.print(debug_show (size));
      if (size == 0) {
        var newConnection : ConnectionEntry = createConnection(connectionID, account, caller, Time.now());
        ConnectionHashMap.put(connectionID, newConnection);
        connectionID := connectionID + 1;
        //create message with the connection Id
        var newMessage = createMessage(messageID, newConnection.id, caller, body, Time.now());
        MessageHashMap_.put(messageID, newMessage);
        messageID := messageID + 1;
        sent := true;
      } else {
        for ((i, j) in ConnectionHashMap.entries()) {
          if (((j.account1 == caller) and (j.account2 == account)) or ((j.account1 == account) and (j.account2 == caller))) {
            // THERE IS A CONNCETION PAIRING THIER CONVERSATION ALREADY
            var newMessage = createMessage(messageID, j.id, caller, body, Time.now());
            MessageHashMap_.put(messageID, newMessage);
            messageID := messageID + 1;
            sent := true;
          };
        };
      };
      if (sent == false) {
        // NO CONNECTION; NEW USER
        //create a new connetion
        var newConnection : ConnectionEntry = createConnection(connectionID, account, caller, Time.now());
        ConnectionHashMap.put(connectionID, newConnection);
        connectionID := connectionID + 1;
        //create message with the connection Id
        var newMessage = createMessage(messageID, newConnection.id, caller, body, Time.now());
        MessageHashMap_.put(messageID, newMessage);
        messageID := messageID + 1;
      };
    };
  };

  public shared query ({ caller }) func getMessages(account : Principal) : async [MessageEntry] {
    // var checkForConnection = await checkConnection(account, caller);
    //  if (checkForConnection == true) {
    var msgs = Buffer.Buffer<MessageEntry>(0);
    for ((i, j) in ConnectionHashMap.entries()) {
      if (((j.account1 == caller) and (j.account2 == account)) or ((j.account1 == account) and (j.account2 == caller))) {
        for ((k, l) in MessageHashMap_.entries()) {
          if (l.connectionId == j.id) {
            msgs.add(l);
          };
        };
      };
    };
    msgs.toArray();
    //  }
  };

  /* ({caller}) */ func checkConnection(account : Principal, caller : Principal) : async Bool {
    var val : Bool = false;
    for ((i, j) in ConnectionHashMap.entries()) {
      if (((j.account1 == caller) and (j.account2 == account)) or ((j.account1 == account) and (j.account2 == caller))) {
        val := true;

      } else {

        val := false;

      };
    };
    return val;
  };

  public shared query ({ caller }) func getAllConnections() : async ?[ConnectionEntry] {
    do ? {
      var buff = Buffer.Buffer<ConnectionEntry>(0);
      for ((i, j) in ConnectionHashMap.entries()) {
        if ((j.account1 == caller) or (j.account2 == caller)) {
          buff.add(j);
        };
      };
      buff.toArray();
    };
  };
  //to get all messages between two users
  //

  func createConnection(id : Nat, account1 : Principal, account2 : Principal, createdAt : Int) : ConnectionEntry {
    {
      id;
      account1;
      account2;
      createdAt;
    };
  };

  func createMessage(id : Nat, connectionId : Nat, sender : Principal, body : Text, createdAt : Int) : MessageEntry {
    {
      id;
      connectionId;
      sender;
      body;
      createdAt;
    };
  };



  public func getMessage(id : Nat) : async ?MessageEntry {
    MessageHashMap_.get(id);
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

  public shared query ({ caller }) func CheckPrincipal() : async Principal {
    caller;
  };

  public func Check_Principal(caller : Principal) : async Principal {
    caller;
  };


//TOD): make documentId field a migrate
  func _makeCompany(name : Text, email : Text, description:Text, vdbId:Nat32, createdAt : Int, documentId: ?Int) : Types.CompanyEntry {
    {
      name : Text;
      email : Text;
      description : Text;
      vdbId : Nat32;
      createdAt : Int;
      documentId: ?Int;
    };
  };

  // public shared ({caller}) func createDocumentId (id:Nat) : Nat {

  // };

//TODO: call the VDBRegister inside this func and save the return entry into the hashmap
//rather than calling the functions seperately on the frontend
  public shared ({ caller }) func createCompany(name : Text, email : Text, description:Text, vdbId:Nat32) : async ?CompanyEntry {
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
      CompanyHashMap.put(caller, _makeCompany(name, email, description, vdbId, Time.now(), null));

    };

    return await getCompanyProfile();
  };

  public shared query ({ caller }) func getAllCompanies() : async ([(Principal, Types.CompanyEntry)]) {
    Iter.toArray(CompanyHashMap.entries());
  };

  // public func Test(value : Nat) : async Nat {
  //   let external  = actor("bd3sg-teaaa-aaaaa-qaaba-cai"): actor { test : (Nat) -> async Nat };
  //   return await external.test(value);
  // };

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };

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

  //newfeat__nov152023__editcompanies
  public shared ({ caller }) func editCompanyDetails(editedName : Text, editedMail : Text, editedDescription : Text) : async ?CompanyEntry {
    var company = CompanyHashMap.get(caller);
    switch (company) {
      case (null) {};
      case (?company) {
        var editedCompany : CompanyEntry = {
          vdbId = company.vdbId;
          name = editedName;
          email = editedMail;
          description = editedDescription;
          createdAt = company.createdAt;
          documentId = null;
        };
        CompanyHashMap.put(caller, editedCompany);
      };

    };
    await getCompanyProfile();
  };

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

  type ICP = {
    e8s : Nat;
  };

  public func toSubaccount(p : Principal) : async Blob {
    // p blob size can vary, but 29 bytes as most. We preserve it'subaccount size in result blob
    // and it'subaccount data itself so it can be deserialized back to p
    let bytes = Blob.toArray(Principal.toBlob(p));
    let size = bytes.size();

    assert size <= 29;

    let a = Array.tabulate<Nat8>(
      32,
      func(i : Nat) : Nat8 {
        if (i + size < 31) {
          0;
        } else if (i + size == 31) {
          Nat8.fromNat(size);
        } else {
          bytes[i + size - 32];
        };
      },
    );
    Blob.fromArray(a);
  };

  public func toAccount({ caller : Principal; canister : Principal }) : async LedgerTypes.Account {
    {
      owner = canister;
      subaccount = ?(await toSubaccount(caller));
    };
  };

  public shared ({ caller }) func icp_balance_dfx() : async LedgerTypes.Tokens {
    await ICPLedger.account_balance_dfx({
      account = AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null))
    });
  };

  public func transferICP(to : Text, amount : LedgerTypes.Tokens, created_at_time : LedgerTypes.TimeStamp) : async Nat64 {
        await ICPLedger.send_dfx({
            to = to;
            fee = { e8s = 10_000 }; //0.0001 ICP
            memo = 0;
            from_subaccount = null;
            created_at_time = ?created_at_time;
            amount = amount
        })
    };

  public query ({ caller }) func getMyAccountIdentifier() : async Text {
        AccountIdentifier.toText(AccountIdentifier.fromPrincipal(caller, null))
    };


  public shared ({ caller }) func icp_balance() : async Nat {
        let account : LedgerTypes.Account =  Utils.toAccount({
          caller = caller;
          canister = Principal.fromActor(this);
        });
        await ICPLedger.icrc1_balance_of({
          owner = caller;
          subaccount = null;
        });
    };


  public shared query ({ caller }) func getCompanyProfile() : async ?CompanyEntry {
    return CompanyHashMap.get(caller);
  };

  // public shared query ({ caller }) func getCompanyPrincipal() : async Principal {
  //   let result = await getCompanyProfile();
  //   switch (result){
  //     case null {null};
  //     case (?CompanyEntry){
  //       return result.
  //     }
  //   }
  // }

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
