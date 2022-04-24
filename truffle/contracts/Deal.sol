// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Deal
{
    address payer;
    uint256 amount ;
    address payable public owner = payable(0x5c46C0c826F31dE436c28e9C706c84Bb24329b62); 
    uint public buyerListCounter;  
    uint lastUpdated;
    uint public msgVal;

    struct buyerDetails
    {
        address  payer;
        uint amount;
        // string goods;  
        bool exists;       
    }

    mapping( uint => buyerDetails) public buyerList;
    mapping( address => uint) public paymentHistory ;

    modifier onlyOwner()
    {
        require(msg.sender == owner);
        _;
    }

    modifier notOwner()
    {
        require(msg.sender != owner);
        _;
       
    }      
    event makePayment(address _from , address _to, uint amount, uint timeLogged); 

    constructor()
    {
            
        buyerListCounter=0;   
    }

    function setPriceToPay(uint price) public onlyOwner
    {
        amount = price;
    }

    function enterBuyer(address _from, uint _msgVal) payable external notOwner
    {
        msgVal=_msgVal;
        require(_msgVal>amount);
        payer = _from;
        // logBuyer(_from, amount, _goods);
    }

    // function logBuyer(address _from, uint _amount, string memory _goods) internal
    // {
    //     require(buyerList[buyerListCounter].exists == false, "error : trying to over-write existing payment");
    //     buyerList[buyerListCounter].payer = _from;
    //     buyerList[buyerListCounter].amount = _amount;
    //     buyerList[buyerListCounter].goods = _goods;
    //     buyerList[buyerListCounter].exists = true;
    //     buyerListCounter++;     
    // }

    function transferAmount() notOwner public payable  
    {
        require(msgVal > amount, "error: mismatching amount entered!");
        owner.transfer(amount);
        payable(msg.sender).transfer(msgVal);
        updateTimestamp();
        logPayment();
        paymentHistory[payer]= amount;
    }

    function logPayment() internal 
    {      
       emit makePayment(payer, owner, amount, lastUpdated);
    }

    // Set `lastUpdated` to `now`
    function updateTimestamp() internal
    {
        lastUpdated = block.timestamp;
    }

    function getcontractBalance() public view returns (uint) 
    {
        return address(this).balance;
    }    

    function getPriceAmount()  public view returns(uint)
    {
        return amount;
    }

}