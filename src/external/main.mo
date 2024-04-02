import Blob "mo:base/Blob";
import Nat "mo:base/Nat"; 
import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Int32 "mo:base/Int32";
import Nat8 "mo:base/Nat32";
import Nat32 "mo:base/Nat32";
import Nexais "../nexai/main";
import Text "mo:base/Text";

import Nexai2 "canister:nexai";


import NexaiTypes "../nexai/types";
import VDBTypes "../nexai/vdbTypes";
import Types "types";

shared ({ caller }) actor class External() =  {

    public func test(number : Nat) : async Nat {
        return number + 10;
    };

    type Nexai = Nexais.Nexai;

    type FloatVector = [Float];
    
    type FloatMatrix = [FloatVector];

    let Nexai = actor("aol7b-vqaaa-aaaak-aepsq-cai") : actor {
        getAllCompanies : () -> async ([(Principal, NexaiTypes.CompanyEntry)]); 
        greet : (Text) -> async Text;
        VDBGetSimilar : (Nat32, [Float], Int32) -> async (VDBTypes.Result_1);
        CheckPrincipal : () -> async Principal;
        Check_Principal : (Principal) -> async Principal;
    };



    let vdb = actor("fnnlb-hqaaa-aaaao-a2igq-cai") : actor { 
        add_manager: (Principal) -> async Bool;
        remove_manager: (Principal) -> async Bool; 
        add_accesser: (Principal) ->  async Bool;
        remove_accesser: (Principal) -> async Bool;
        register: (Text) -> async  VDBTypes.Result_2;
        build_index: (Nat32) -> async  VDBTypes.Result;
        get_similar: (Nat32, FloatVector, Int32) -> async (VDBTypes.Result_1);
        append_keys_values: (Nat32,FloatMatrix,  [Text]) -> async VDBTypes.Result;
    }; 

    public func ExternalVDBGetSimilar (companyId:Nat32, question: FloatVector, limit:Int32): async VDBTypes.Result_1{
      await vdb.get_similar(companyId, question, limit);
    };

   

   public func VDBBuildIndex (companyId: Nat32): async VDBTypes.Result {
       await vdb.build_index(companyId);
    } ;

    public query func transform(raw : Types.TransformArgs) : async Types.CanisterHttpResponsePayload {
      let transformed : Types.CanisterHttpResponsePayload = {
          status = raw.response.status;
          body = raw.response.body;
          headers = [
              {
                  name = "Content-Security-Policy";
                  value = "default-src 'self'";
              },
              { 
                name = "Referrer-Policy"; 
                value = "strict-origin" 
              },
              { 
                name = "Permissions-Policy"; 
                value = "geolocation=(self)" },
              {
                  name = "Strict-Transport-Security";
                  value = "max-age=63072000";
              },
              { 
                name = "X-Frame-Options"; 
                value = "DENY" 
              },
              { 
                name = "X-Content-Type-Options"; 
                value = "nosniff" 
              },
          ];
      };
      transformed;
  };

  public func send_http_post_request() : async Text {

    let ic : Types.IC = actor ("aaaa-aa");

    let host : Text = "";
    let url = "";

    
    let request_body_json : Text = "{}";
    let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
    let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob); 

    let transform_context : Types.TransformContext = {
      function = transform;
      context = Blob.fromArray([]);
    };

    let idempotency_key: Text = generateUUID();
    let request_headers = [
        { name = "Host"; value = host # ":443" },
        { name = "User-Agent"; value = "http_post_sample" },
        { name= "Content-Type"; value = "application/json" },
        { name= "Idempotency-Key"; value = idempotency_key }
    ];


    let http_request : Types.HttpRequestArgs = {
        url = url;
        max_response_bytes = null; //optional for request
        headers = request_headers;
        //note: type of `body` is ?[Nat8] so we pass it here as "?request_body_as_nat8" instead of "request_body_as_nat8"
        body = ?request_body_as_nat8; 
        method = #post;
        transform = ?transform_context;
    };

    Cycles.add(230_850_258_000);

    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

    let response_body: Blob = Blob.fromArray(http_response.body);
    let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "No value returned" };
        case (?y) { y };
    };

    //6. RETURN RESPONSE OF THE BODY
    let result: Text = decoded_text # ". See more info of the request sent at: " # url # "/inspect";
    return result;


  };




    public func Greet(name : Text) : async Text {
        await Nexai.greet(name);
    };

    public func Greet2(name : Text) : async Text {
        await Nexai2.greet(name);
    };

    public func CheckPrincipal() : async Principal {
        await Nexai.CheckPrincipal();
    };

     public func CheckPrincipal2() : async Principal {
        await Nexai2.CheckPrincipal();
    };

    public shared ({ caller }) func Check_Principal() : async Principal {
        await Nexai.Check_Principal(caller);
    };

     public shared ({ caller }) func Check_Principal2() : async Principal {
      await Nexai2.Check_Principal(caller);
    };

    public func VDBGetSimilar(companyId:Nat32, question: [Float], limit:Int32): async VDBTypes.Result_1{
        await Nexai.VDBGetSimilar(companyId, question, limit);
    };

    func generateUUID() : Text {
    "UUID-123456789";
    }
     
     

};
