export interface CategoriesList{
    title : String,
    route : String,
    icon : String
}

export interface ChatMessage {
    timestamp : number,
    message : string,
    from : string
}

export interface Message{
    _id : string,
    timestamp : number,
    conversation_id : string,
    from : string,
    message : string
} 

export interface ConvoUsers{
    user_id : string,
    profile_pic : string,
    user_name : string
}

export interface Conversation{
    _id : string,
    latest : Message,
    users : ConvoUsers[]
}

export interface UserProfile{
    _id : string,
    name : string,
    profile_pic : string,
    phone : number,
    email : number,
    services : Service[]
}

export interface Service{
    service : string,
    service_id : string,
    description : string,
    ratings : string[],
    overallRating? : number,
    noOfRatings? : number 
}