import Time "mo:base/Time";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal"

module {

    public type  CompanyEntry = {
        name : Text;
        username: Text;
        founderName  : Text;
        about  : Text;
        createdAt : Int;
        // onBoarding : Bool;
        // isAdmin : Bool;
    };

    // add cards(custom questions that the company can ask)

    public type CardEntry = {
        username: Text;
        question: Text; /*P how do i transfer my btc friom my wallet*/
        answer: Text  /* just sleep and your btc would be transfered*/
    }

}