import { connect } from 'react-redux'
import { Navigate } from 'react-router'

export const RequireAuth = (props) => {

    if (props.user===null) {
        return <Navigate to="/" />
    }

    return props.children
}

const mapStateToProps = (state) => ({
    user: state.userState.user,
})

export default connect(mapStateToProps)(RequireAuth)