import Nat "mo:base/Nat"; 
import Principal "mo:base/Principal";
import Nexais "../nexai/main";
import NexaiTypes "../nexai/types";

shared ({ caller }) actor class External() =  {

    public func test(number : Nat) : async Nat {
        return number + 10;
    };

    type Nexai = Nexais.Nexai;

    let Nexai = actor("bkyz2-fmaaa-aaaaa-qaaaq-cai") : actor {
        getAllCompanies : () -> async ([(Principal, NexaiTypes.CompanyEntry)]); 
        greet : (Text) -> async Text;
    };

    public func Greet(name : Text) : async Text {
        await Nexai.greet(name);
    };
     

};