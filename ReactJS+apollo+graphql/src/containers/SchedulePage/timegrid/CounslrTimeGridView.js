import { TimeGridView } from "@fullcalendar/timegrid";
import { createElement } from "@fullcalendar/core";
import { CONSTANT } from "Constants";

export class CounslrTimeGridView extends TimeGridView {
    _currentProps;
    _emptyView;
    render(props, context) {
        this._currentProps = props;
        super.render(props, context);
        if (!this.hasEvents()) {
            this.el.classList.add("fc-empty-view");
        } else {
            this.el.classList.remove("fc-empty-view");
        }
    }
    hasEvents() {
        return !!Object.keys(this._currentProps.eventStore.instances).length;
    }
    _renderSkeleton(context) {
        super._renderSkeleton(context);
        this._emptyView = createElement(
            "div",
            {
                className: "fc-time-grid-empty-view",
            },
            `<img src="${CONSTANT.SEARCH_IMAGE}" alt="Search" />No shifts scheduled. You\'ll recieve an email when shifts <br /> become available.`
        );
        this.el.appendChild(this._emptyView);
    }

    /* renderSkeletonHtml() {
     let html = super.renderSkeletonHtml();

   }*/
    _unrenderSkeleton() {
        super._unrenderSkeleton();

        if (this._emptyView) {
            this.el.removeChild(this._emptyView);
            this._emptyView = null;
        }
    }
}
