

// public func testVDB(canisterId: Text) : async VDBTypes.Result_2 {
//         let canister2 = actor(canisterId): actor { register: (Text) -> async VDBTypes.Result_2};
//         return await canister2.register("desc boku");
//     };

//     let owner : Principal = Principal.fromText("glwtg-n3tig-srnz4-m755o-d3q66-wjoqg-asrfh-sesvw-a5772-lyvwh-vqe");
  
//   public shared ({ caller }) func UseCustomPrincipal() : async (Principal, Bool) {
    
//     //glwtg-n3tig-srnz4-m755o-d3q66-wjoqg-asrfh-sesvw-a5772-lyvwh-vqe    if (caller ++ )
//     if (Principal.toText(caller) != "glwtg-n3tig-srnz4-m755o-d3q66-wjoqg-asrfh-sesvw-a5772-lyvwh-vqe"){
//       throw Error.reject("You are niot authorized")
//     };
//      var contactVdb = await vdb.add_manager(caller);
//      Debug.print(debug_show(contactVdb));
//      return (caller, contactVdb);
     