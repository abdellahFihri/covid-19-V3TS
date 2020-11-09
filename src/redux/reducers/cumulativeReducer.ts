const INITIAL_STATE = {
    cumulative:false
}

const getCumulative = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'SET_CUMULATIVE':
            return {
                ...state,
                cumulative:!state.cumulative
            }
        default:
            return state;
    }
}
export default getCumulative;