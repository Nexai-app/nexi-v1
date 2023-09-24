import Nat "mo:base/Nat"; 
import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Int32 "mo:base/Int32";
import Nat32 "mo:base/Nat32";
import Nexais "../nexai/main";
import NexaiTypes "../nexai/types";
import VDBTypes "../nexai/vdbTypes";

shared ({ caller }) actor class External() =  {

    public func test(number : Nat) : async Nat {
        return number + 10;
    };

    type Nexai = Nexais.Nexai;

    let Nexai = actor("aol7b-vqaaa-aaaak-aepsq-cai") : actor {
        getAllCompanies : () -> async ([(Principal, NexaiTypes.CompanyEntry)]); 
        greet : (Text) -> async Text;
        VDBGetSimilar : (Nat32, [Float], Int32) -> async (VDBTypes.Result_1);
    };



    public func Greet(name : Text) : async Text {
        await Nexai.greet(name);
    };

    public func VDBGetSimilar(companyId:Nat32, question: [Float], limit:Int32): async VDBTypes.Result_1{
        await Nexai.VDBGetSimilar(companyId, question, limit);
    };
     
     

};
