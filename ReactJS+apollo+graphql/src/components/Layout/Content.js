import React from "react";
import MainLayout from "./MainLayout";

export default class Content extends React.Component {
    render() {
        return (
            <MainLayout>
                <section className="content">{this.props.children}</section>
            </MainLayout>
        );
    }
}
