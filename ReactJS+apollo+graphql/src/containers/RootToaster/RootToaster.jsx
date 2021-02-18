import React from "react";

class RootToaster extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.alert && this.props.alert !== prevProps.alert) {
            this.refs.toast.show(this.props.alert.message);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Toast ref="toast" />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert,
    };
}

const connectedRootToaster = connect(mapStateToProps)(RootToaster);
export { connectedRootToaster as RootToaster };
