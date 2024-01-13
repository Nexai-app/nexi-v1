import Time "mo:base/Time";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal"


module {

    public type CompanyEntry = {
        name : Text;
        email : Text;
        description: Text;
        vdbId: Nat32;
        createdAt : Int;
        documentId:?Int;
        // onBoarding : Bool;
        // isAdmin : Bool;
    };

    // add cards(custom questions that the company can ask)

    public type CardEntry = {
        vdbId : Nat32;
        question : Text; /*P how do i transfer my btc friom my wallet*/
        answer : Text /* just sleep and your btc would be transfered*/;
    };

    // connection Id is the key
    public type MessageEntry = {
        id:Nat;
        connectionId: Nat;
        sender:Principal;
        body: Text;
        createdAt: Int;
    };
    public  type ConnectionType = {
        id: Nat;
        account1: Principal;
        account2: Principal;
        createdAt: Int;

  };

};
