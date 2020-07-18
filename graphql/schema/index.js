const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type SellingStock{
    _id:ID!
    stock:Stock!
    user:User!
    createdAt: String!
    updatedAt: String!
  }

  type Stock {
    _id: ID!
    value: Float!
    date: String!
    owner :User!
  }
        
  

  type User {
    _id: ID!
    First_name: String!
    Last_name: String!
    Sex : String!
    Birth_Day: String!
    ID_card: String!
    Email:String!
    Username: String!
    Password:String
    Tell_number:String
    Tell_number2:String
    Facebook:String
    Line :String
    stock_holdings:[Stock!]
    Own_farm:[Farm!]
    Own_Share:[Share!]
  
  }

  type Officer{
    _id: ID!
    id: String!
    password:String!
    privilege:String!
  }

  type Farm{
    _id: ID!
    Farm_number: String!
    Farm_Village: String
    Farm_Road: String
    Farm_Village_number: String
    Farm_alley: String
    Farm_postcode: String!
    Farm_canton: String!
    Farm_District: String!
    Farm_Province: String!
    
  }

  type Share{
    _id: ID!
    Value: Float!
    Count: Float!
    Num_start: Float!
    Status: Boolean!
    Date: String!
    Share_owner: User!
  }
 

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!

  }

  input StockInput{
    value:Float!
    date:String! 
  }

  input OfficerInput{
    id: String!
    password:String!
    privilege:String!
  }

  input FarmInput{
    Farm_number: String!
    Farm_Village: String
    Farm_Road: String
    Farm_Village_number: String
    Farm_alley: String
    Farm_postcode: String!
    Farm_canton: String!
    Farm_District: String!
    Farm_Province: String!
    Farm_owner:String!
  }

  input ShareInput{
    Value: Float!
    Count: Float!
    Num_start: Float!
    Date: String!
    Status: Boolean!
    Share_owner:String!
  }
  
  input UserInput{
    First_name: String!
    Last_name: String!
    Sex : String!
    Birth_Day: String!
    ID_card: String!
    Email:String!
    Username: String!
    Password:String
    Tell_number:String
    Tell_number2:String
    Facebook:String
    Line :String
  }

  type RootQuery {
    stocks: [Stock!]!
    user:[User!]!
    users:[User!]!
    officer:[Officer!]!
    sellingStocks: [SellingStock!]!
    login(Username: String!, Password: String!): AuthData!
    oneuser(Username: String!): User
    oneshare(Status: Boolean!): Share
    login_off(id: String!, password: String!): AuthData!
  }

  type RootMutation {
    createStock(stockInput:StockInput): Stock
    createUser(userInput:UserInput): User
    createSellingStock(stockID: ID!):SellingStock!
    cancelSellingStock(sellingStockId:ID!): Stock!
    createOfficer(officerInput:OfficerInput): Officer
    createFarm(farmInput:FarmInput):Farm
    createShare(shareInput:ShareInput): Share
    updateShare( shareInput:ShareInput,  shareId:String!): Share
   
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
