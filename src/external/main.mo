import Nat "mo:base/Nat"; 
// import Nexai "canister:nexai";
actor External {

    public func test(number : Nat) : async Nat {
        return number + 10;
    };

    // public func Greet(name : Text) : async Text {
    //     await Nexai.greet(name);
    // };
     

};