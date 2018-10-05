import * as types from './actionTypes';
import initialState from './initialState';
import {
    unionWith as _unionWith,
    uniqBy as _uniqBy
} from 'lodash'

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.LIST_SUCCESS:
            return Object.assign({}, state, {

                credentials: action.data,
            });
        case types.REGISTER_SUCCESS:
            return Object.assign({}, state, {
                credentials: action.data,
            });
        case types.GET_USER_EMAIL_SUCCESS:
            return Object.assign({}, state, {
                emailInfo: action.data,
            });
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {

                credentials: action.data,
            })
        case types.OSLIST_SUCCESS:
            return Object.assign({}, state, {
                osListInfo: action.data,
            })
        case types.FAVLIST_SUCCESS:
            return Object.assign({}, state, {

                credentials: action.data,
            })

        case types.FORGOTPASSWORD_SUCCESS:
            return Object.assign({}, state, {
                email: action.data
            })

        case types.RECOVERYUSERNAME_SUCCESS:
            return Object.assign({}, state, {
                email: action.data
            })

        case types.RESETPASSWORD_SUCCESS:
            return Object.assign({}, state, {
                credentials: action.data
            })

        case types.CREATENEWDESK_SUCCESS:
            return Object.assign({}, state, {
                createDeckList: action.data
            });

        case types.CARTOONCOLORPICK_SUCCESS:
            return Object.assign({}, state, {
                credentials: action.data
            });

        case types.FAVPICKLIST_SUCCESS:
            return Object.assign({}, state, {
                favDappsListInfo: action.data.data
            });

        case types.COLLECTION_SUCCESS:
            return Object.assign({}, state, {
                collectionListInfo: action.data
            });
        case types.DASHBOARD_GETLIST_SUCCESS:
            const Viewsdata = state.Viewsdata;
            if (action.data && action.data.Views.length > 0) {
                action.data.Views.map((each, i) => {
                    let key = each.Key.split('T');
                    let obj = {
                        x: key[0],
                        y: each.Value
                    }
                    Viewsdata.push(obj)

                })


            }
            var uniqueData = _uniqBy(Viewsdata, function (e) {
                return e.x;
            });
            return Object.assign({}, state, {
                DecksDahboardList: action.data
            }, {
                Viewsdata: uniqueData
            });



        case types.ACCOUNTSETTINGS_SUCCESS:
            return Object.assign({}, state, {
                credentials: action.data
            });
        case types.SEARCHFILTER_SUCCESS:
            return Object.assign({}, state, {
                searchFilterListInfo: action.data
            })
        case types.DELETEDECK_SUCCESS:
            return Object.assign({}, state, {
                credentials: action.data
            });

        case types.DECK_SUCCESS:

            return {
                ...state,
                decksList: action.data,
                imageList: _unionWith(state.imageList, [action.data])
            };

        case types.EDITDECK_SUCCESS:

            return {
                ...state,
                editDeckListData: _unionWith(state.editDeckListData, [action.data])
            };
        case types.SINGLDECK_SUCCESS:
            return Object.assign({}, state, {
                singleDeckdata: action.data
            });

        case types.PIN_SUCCESS:
            return Object.assign({}, state, {
                createPinList: action.data
            });

        case types.DISCOVERYLIST_SUCCESS:
            return Object.assign({}, state, {
                discoveryListInfo: action.data
            }, {
                loading: false
            });

        case types.EDIT_DECK_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                deckEditInfo: action.data
            }, {
                loading: false
            });

        case types.EDIT_DECK_DUBLICATE_SUCCESS:
            return Object.assign({}, state, {
                deckDublicate: action.data
            });

        default:
            return state;
    }
};
export default sessionReducer;
