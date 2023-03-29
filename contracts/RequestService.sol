pragma solidity >=0.4.21 <0.6.0;
import "./SafeMath.sol";

contract RequestService {
  using SafeMath for uint256; // prevent overflow or underflow
  event NewRequest (string dataSubject, string requestingParty, string content);
  event NewToken (string signature, string receiver, string token);
  event NewAgreement (string signature, string status, string url, string requestContent);

  struct Request {
    string dataSubject;
    string requestingParty;
    string content;
  }
  
  Request[] public request;
  
  struct Token {
      string signature;
      string receiver;
      string token;
  }

  Token[] public token;

  struct Agreement {
      string signature;
      string status;
      string url;
      string requestContent;
  }
  Agreement[] public agree;

    struct APToken {
        string authName;
        string receiver;
        string token;
    }

    APToken[] public apToken;

  mapping (uint => address) public requestToOwner;
  mapping (address => string) public signToRequest;
  mapping (address => uint) ownerRequestCount;
  
  mapping (uint => address) tokenToOwner;
  mapping (address => string) signToToken;
  mapping (address => uint) ownerTokenCount;

  mapping (uint => address) agreeToOwner;
  mapping (address => string) signToAgree;
  mapping (address => uint) ownerAgreeCount;

    mapping (uint => address) apTokenToOwner;
    mapping (address => string) signToAPToken;
    mapping (address => uint) ownerAPTokenCount;
  

  function saveRequest(string memory _dataSubject, string memory _requestingParty, string memory _content) public payable returns(bool) {
    uint id = request.push(Request(_dataSubject, _requestingParty, _content)) - 1;
    requestToOwner[id] = msg.sender; //allocate request to owner by Id
    
    signToRequest[msg.sender] = _requestingParty;
    ownerRequestCount[msg.sender] = ownerRequestCount[msg.sender].add(1);
    emit NewRequest(_dataSubject,_requestingParty,_content);
    return true;
  }

   function getRequest (string memory _dataSubject, string memory _requestingParty) public view returns (string memory) {
     for(uint i=0;i<request.length;i++){
         Request storage myRequest = request[i];
         if(keccak256(bytes(_dataSubject)) == keccak256(bytes(myRequest.dataSubject)) && keccak256(bytes(_requestingParty)) == keccak256(bytes(myRequest.requestingParty))){
            return myRequest.content;
          }
      } return "no record";
    }

   function authRequest (string memory _signature, string memory _status, string memory _url, string memory _requestContent) public payable returns(bool){
       uint id = agree.push(Agreement(_signature, _status, _url, _requestContent)) - 1;
       agreeToOwner[id] = msg.sender; //allocate to owner by Id

       signToAgree[msg.sender] = _signature;
       ownerAgreeCount[msg.sender] = ownerAgreeCount[msg.sender].add(1);
       emit NewAgreement(_signature,_status,_url,_requestContent);
       return true;
   }

   function getAuthURL (string memory _dataSubject, string memory _status) public view returns(string memory){
       for(uint i=0;i<agree.length;i++){
           Agreement storage myAgree = agree[i];
           if(keccak256(bytes(_dataSubject)) == keccak256(bytes(myAgree.signature)) && keccak256(bytes(_status)) == keccak256(bytes(myAgree.status))){
               return (myAgree.url);
           }
       } return ("wrong input or no record");
   }
    function getAuthContent (string memory _dataSubject, string memory _status) public view returns(string memory){
        for(uint i=0;i<agree.length;i++){
            Agreement storage myAgree = agree[i];
            if(keccak256(bytes(_dataSubject)) == keccak256(bytes(myAgree.signature)) && keccak256(bytes(_status)) == keccak256(bytes(myAgree.status))){
                return (myAgree.requestContent);
            }
        } return ("wrong input or no record");
    }

  function saveRqPToken (string memory _signature, string memory _receiver, string memory _token) public payable returns (bool) {
    uint id = token.push(Token(_signature, _receiver, _token)) - 1;
    tokenToOwner[id] = msg.sender; //allocate token to owner by Id
    
    signToToken[msg.sender] = _signature;
    ownerTokenCount[msg.sender] = ownerTokenCount[msg.sender].add(1);
    emit NewToken(_signature,_receiver,_token);
    return true;
  }
  
  function getRqPToken (string memory _signature, string memory _receiver) public view returns (string memory) {
    for(uint i=0;i<token.length;i++){
    	Token storage myToken = token[i];
        if(keccak256(bytes(_signature)) == keccak256(bytes(myToken.signature)) && keccak256(bytes(_receiver)) == keccak256(bytes(myToken.receiver))){
        	return myToken.token;
           } 
        } return "wrong input or no record";
  }

  function saveAPToken(string memory _signature, string memory _receiver, string memory _token) public payable returns(bool){
      uint id = apToken.push(APToken(_signature, _receiver, _token)) - 1;
      apTokenToOwner[id] = msg.sender; //allocate token to owner by Id

      signToAPToken[msg.sender] = _signature;
      ownerAPTokenCount[msg.sender] = ownerAPTokenCount[msg.sender].add(1);
      emit NewToken(_signature,_receiver,_token);
      return true;
  }

    function getAPToken (string memory _signature, string memory _receiver) public view returns (string memory) {
        for(uint i=0;i<apToken.length;i++){
            APToken storage myToken = apToken[i];
            if(keccak256(bytes(_signature)) == keccak256(bytes(myToken.authName)) && keccak256(bytes(_receiver)) == keccak256(bytes(myToken.receiver))){
                return myToken.token;
            }
        } return "wrong input or no record";
    }

}