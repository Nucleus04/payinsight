
import { Meteor } from 'meteor/meteor';
import { GET_API_CREDENTIALS, GET_CLIENT_CREDENTIALS, GET_REDIRECT_URI, GET_TOKEN_ENDPOINT } from '../../common';
import Api from '../../classes/server/services/api';

class Authorization {
    method() {
        return Meteor.methods({
            [GET_API_CREDENTIALS]: function () {
                let client_id = Api.Client_id;
                let redirect_uri = Api.Redirect_Uri;
                let authorization_endpoint = Api.Authorization_Endpoint;
                return {
                    client_id, redirect_uri, authorization_endpoint
                }
            },

        })
    }
}

export default new Authorization;