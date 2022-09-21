import { gql } from "@apollo/client";
export const login_user = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
        _id
        username
        }
    }
}
`;

export const add_user = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
} 
`;

export const add_round = gql`
mutation addRound($distance: String!, $puttsMade: String, $firstIn: Boolean, $lastIn: Boolean, $allMade: Boolean, $roundId: String!) {
    addRound (distance: $distance, puttsMade: $puttsMade, firstIn: $firstIn, lastIn: $lastIn, allMade: $allMade, roundId: $roundId) {
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
export const delete_round = gql`
mutation deleteRound($roundId: String) {
    deleteRound (roundId: $roundId) {
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
