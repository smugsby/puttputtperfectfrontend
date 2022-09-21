import{gql} from "@apollo/client";
export const refreshUser = gql`
query currentUser {
    currentUser{
        _id
        email
        username
        savedRounds {
            distance
            puttsMade
            firstIn
            lastIn
            allMade
            roundId    
        }
    }
}
`;