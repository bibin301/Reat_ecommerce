import * as types from './actionTypes';
import axios from 'axios';
import {
    map as _map
} from 'lodash';
import {
    API_BASE_URL,
    API_BASE_URL2,
    Autorization_header
} from '../../constants/apiUrl';
import {Loader} from '../../components/loader.js'

//register
export const Register = credentials => dispatch => {
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': Autorization_header
    }
    return axios.post(API_BASE_URL + '/Account/Register', credentials, headers).then(response => {
        console.log("response",response)
        return dispatch({
            type: types.REGISTER_SUCCESS,
            data: response
        })
    })
};

//login action 

export const login = credentials => dispatch => {
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);
    params.append('Access-Control-Allow-Origin', '*');
    params.append("Content-Type", "application/x-www-form-urlencoded");
    params.append('grant_type', 'password');
    return axios.post(API_BASE_URL2 + '/token',
        params).then(response => {
        return dispatch({
            type: types.LOGIN_SUCCESS,
            data: response.data
        })
    })

};

//favlist
export const getFavlist = () => dispatch => {

    return axios.get(API_BASE_URL + "/os/list").then(response => {
        return dispatch({
            type: types.FAVLIST_SUCCESS,
            data: response
        })
    })
};

//filter dropdown
export const osList = () => dispatch => {
    return axios.get(API_BASE_URL + '/OS/list').then(response => {

        return dispatch({
            type: types.OSLIST_SUCCESS,
            data: response.data
        })
    })
};


//forget Password
export const forgotPassword = email => dispatch => {
    
    return axios.post(API_BASE_URL + "/account/ForgotPassword?email=" + email).then(response => {
        return dispatch({
            type: types.FORGOTPASSWORD_SUCCESS,
            data: response.data
        })
    })

}

//Recoveryusername
export const recoveryusername = email => dispatch => {
    return axios.post(API_BASE_URL + "/account/recoverusername?email=" + email).then(response => {
        return dispatch({
            type: types.RECOVERYUSERNAME_SUCCESS,
            data: response.data
        })
    })

}

//Reset Password
export const resetpassword = credentials => dispatch => {

    return axios.post(API_BASE_URL + "/account/ResetPassword?email=" + credentials.email + "&password=" + credentials.password + "&code=" + credentials.code).then(response => {
        return dispatch({
            type: types.RESETPASSWORD_SUCCESS,
            data: response
        })
    })
}

// Create New Deck
export const createnewdeck = data => dispatch => {

    let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));

    if (sessiondata) {
        var headers = {
            'Authorization': "Bearer " + sessiondata.access_token,
            'Content-Type': 'application/json'
        }

        return axios.post(API_BASE_URL + "/Collection", data, {
            headers
        }).then(response => {
            return dispatch({
                type: types.CREATENEWDESK_SUCCESS,
                data: response
            })
        })
    }

}

//Color pick disk
export const cartoonColorpick = credentials => dispatch => {

    let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));

    if (sessiondata) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessiondata.access_token
        }

        return axios.post("https://cryptodesksapi.azurewebsites.net/api/FavDapps?address=" + credentials, {}, {
            headers
        }).then(response => {
            return dispatch({
                type: types.CARTOONCOLORPICK_SUCCESS,
                data: response
            })
        })
    }

}

//to get list discovery page


//Discovery Collection List 

export const favPickList = () => dispatch => {

    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"))

    if (sessionData) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionData.access_token
        }
        return axios.get("https://cryptodesksapi.azurewebsites.net/api/FavDapps", {
            headers
        }).then(response => {
            return dispatch({
                type: types.FAVPICKLIST_SUCCESS,
                data: response
            })
        })
    }
}

//collectionList
export const collectionList = () => dispatch => {

    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"))

    if (sessionData) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionData.access_token
        }
        return axios.get("https://cryptodesksapi.azurewebsites.net/api/Collection/List", {
            headers
        }).then(response => {


            // _map(_map(response.data, "Pins"), each => _map(each,
            //     e =>
                
            //     dispatch(getDecksList(e))));

            // return dispatch({
            //     type: types.COLLECTION_SUCCESS,
            //     data: response.data
            // })
        })
    }

}

//dashboardDeckList
export const getDashboardDeckList = () => dispatch => {

    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"))

    if (sessionData) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionData.access_token
        }

        return axios.get("https://cryptodesksapi.azurewebsites.net/api/Collection/stats", {
            headers
        }).then(response => {
            _map(_map(response.data.Decks, "Pins"), each => _map(each,
                e =>
                dispatch(getPinsData(e))));
            return dispatch({
                type: types.DASHBOARD_GETLIST_SUCCESS,
                data: response.data
            })
        })
    }

}

//getPinsData
export const getPinsData = (deckInf) => dispatch => {
    const {
        Address,
        TokenId
    } = deckInf;

    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
    if (sessionData) {
        const _HEADERS = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionData.access_token
        }
        return axios.get("https://cryptodesksapi.azurewebsites.net/api/OS/ASSET?address=" + Address + "&tokenId=" + TokenId, {
                _HEADERS
            })
            .then(response => {

                return dispatch({
                    type: types.DECK_SUCCESS,
                    data: response.data
                })
            })
    }

}

//Edit Deck
export const getEditdeckinfo = (deckInf) => dispatch => {

    const {
        Address,
        TokenId
    } = deckInf;
    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
    const _HEADERS = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + sessionData.access_token
    }
    return axios.get("https://cryptodesksapi.azurewebsites.net/api/OS/ASSET?address=" + Address + "&tokenId=" + TokenId, {
            _HEADERS
        })
        .then(response => {
            return dispatch({
                type: types.EDITDECK_SUCCESS,
                data: response.data
            })
        })
}

//getDecksList

const getDecksList = (deckInf) => dispatch => {
    const {
        Address,
        TokenId
    } = deckInf;

    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"));

    const _HEADERS = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + sessionData.access_token
    }
    return axios.get("https://cryptodesksapi.azurewebsites.net/api/OS/ASSET?address=" + Address + "&tokenId=" + TokenId, {
            _HEADERS
        })
        .then(response => {

            return dispatch({
                type: types.DECK_SUCCESS,
                data: response.data
            })
        })
}

//getSingleDeck
export const getSingleDeckInfo = (id) => dispatch => {

    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
    if (sessionData) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionData.access_token
        }
        return axios.get("https://cryptodesksapi.azurewebsites.net/api/Collection/" + id, {
                headers
            })
            .then(response => {
                return dispatch({
                    type: types.SINGLDECK_SUCCESS,
                    data: response.data
                })
            })
    }
}

//deleteDeck
export const deleteEditDeck = (id) => dispatch => {

    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + sessionData.access_token
    }
    return axios.delete("https://cryptodesksapi.azurewebsites.net/api/Collection/" + id, {
            headers
        })
        .then(response => {

            dispatch({
                type: types.DELETEDECK_SUCCESS,
                data: response.data
            })
        })
}

//searchFilter
export const searchFilterItem = (data) => dispatch => {

    return axios.post(API_BASE_URL + "/search/Search", data)
        .then(response =>

            dispatch({
                type: types.SEARCHFILTER_SUCCESS,
                data: response.data
            })
        )
}
//settings account 

export const accountSettings = (credentials) => dispatch => {
    let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));
    var headers = {
        'Authorization': "Bearer " + sessiondata.access_token,
        'Content-Type': 'application/json'
    }
    return axios.post("https://cryptodesksapi.azurewebsites.net/api/Account/ChangePassword", credentials, {
            headers
        })
        .then(response => {
            dispatch({
                type: types.ACCOUNTSETTINGS_SUCCESS,
                data: response.status
            })
        })
}

export const subscribeUser = () => dispatch => {
    let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));
    var headers = {
        'Authorization': "Bearer " + sessiondata.access_token
       
          }
   
    return axios.post(API_BASE_URL + "/user/unsubscribe" ,null ,{headers})
        .then(response => {
            dispatch({
                type: types.ACCOUNTSETTINGS_SUCCESS,
                data: response.status
            })
        })
}

export const getAccountUserInfo = () => dispatch => {
    let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));
    var headers = {
        'Authorization': "Bearer " + sessiondata.access_token,
        'Content-Type': 'application/json'
    }
    return axios.get(API_BASE_URL + "/Account/UserInfo", {
            headers
        })
        .then(response => {
            dispatch({
                type: types.GET_USER_EMAIL_SUCCESS,
                data: response.data
            })
        })
}


//submit pin

export const createPin = data => dispatch => {

    let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));

    if (sessiondata) {
        var headers = {
            'Authorization': "Bearer " + sessiondata.access_token,
            'Content-Type': 'application/json'
        }

        return axios.post(API_BASE_URL + "/Pin", data, {
            headers
        }).then(response => {
            if (response) {
                searchDiscovery();
            }
            return dispatch({
                type: types.PIN_SUCCESS,
                data: response.data
            })
        })
    }

}

//search discovery
export const searchDiscovery = data => dispatch => {

    const info = {
        contract: data,
        limit: 15,
        Offset: 0,
        orderby: "listing_date",
        order: "desc"
    }

    return axios.post(API_BASE_URL + "/search/Search", info).then(response => {
        return dispatch({
            type: types.DISCOVERYLIST_SUCCESS,
            data: response.data
        })
    })

}


//edit deck

export const editDeckDetails = data => dispatch => {

    let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));

    if (sessiondata) {
        var headers = {
            'Authorization': "Bearer " + sessiondata.access_token,
            'Content-Type': 'application/json'
        }

        return axios.post(API_BASE_URL + "/Collection", data, {
            headers
        }).then(response => {

            return dispatch({
                type: types.EDIT_DECK_DETAILS_SUCCESS,
                data: response.data
            })
        })
    }

}

//duplicate 
export const deckDuplicate = (id) => dispatch => {

    let sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + sessionData.access_token
    }
    return axios.post(API_BASE_URL + "/Collection/Duplicate?id=" + id, null,{
            headers
        })
        .then(response => {

            dispatch({
                type: types.EDIT_DECK_DUBLICATE_SUCCESS,
                deckDublicate: response.data
            })
        })
}
