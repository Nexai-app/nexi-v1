import Nat "mo:base/Nat";
import Nexai "canister:nexai";
actor {

    public func test(number : Nat) : async Nat {
        return number + 10;
    };

};