import React, { Component } from 'react'

export default class BaseForm extends Component {
    componentDidMount = () => {};

    render() {
        return (
            <div className="BaseForm">
                <div className="field">
                    {this.props.children}
                    {this.props.required&&<div className="warning">{this.props.warning}</div>}
                </div>
            </div>
        );
    }
}