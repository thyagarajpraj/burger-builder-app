import reducer from './auth';
// import actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            userId: null,
            token: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('should return the updated state', () => {
        expect(reducer({
            userId: null,
            token: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: 'AUTH_SUCCESS',
            token: 'some-token',
            userId: 'some-user-id'
        }
        )).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
});
