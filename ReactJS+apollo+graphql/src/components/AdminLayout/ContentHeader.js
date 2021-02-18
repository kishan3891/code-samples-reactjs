import React from "react";

export default class ContentHeader extends React.Component {
    render() {
        return (
            <section className="content-header">
                <h1>
                    {this.props.title}
                    <small>{this.props.subtitle}</small>
                </h1>
            </section>
        );
    }
}
