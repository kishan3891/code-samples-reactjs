import React from "react";
import moment from "moment";
import upperFirst from "lodash/upperFirst";
import { formatMoney } from "../../helpers";
import { CONSTANT } from "../../constants";
import PaginationLoader from "../../containers/PaginationLoader";

const format = (date, template) => moment(date).format(template);

class EarningHistory extends React.Component {
    static defaultProps = {
        history: {
            items: [],
            total: 0,
        },
    };

    constructor(props) {
        super(props);
        this.state = { earnings: true };
    }

    renderItem = ({ date, total, breakdown }, style) => {
        return (
            <li key={date} className="nested" style={style}>
                <b>
                    {format(date, CONSTANT.EARNING_DATE_FORMAT)}
                    <span> ${formatMoney(total)}</span>
                </b>
                {breakdown.map(this.renderBreakdown)}
            </li>
        );
    };

    /**
     *
     * @param {CounselorEarningHistoryEntry} breakdown
     * @param index
     * @return {*}
     */
    renderBreakdown = (breakdown, index) => {
        const { type, start, end, amount } = breakdown;
        return (
            <span className="line" key={`breakdown-${index}`}>
                {" "}
                {format(start, CONSTANT.TIME_FORMAT)} -{" "}
                {format(end, CONSTANT.TIME_FORMAT)} | {upperFirst(type)}
                <span> ${formatMoney(amount)} </span>
            </span>
        );
    };

    render() {
        const {
            history: {
                /**
                 * @type {CounselorEarningHistory[]} items
                 */
                items,
                total,
            },
            type,
        } = this.props;
        const { earnings } = this.state;
        return (
            <ul
                style={{
                    display: "flex",
                    height: "50vh",
                    float: "none",
                    flexDirection: "column",
                }}
                className={
                    items && !items.length
                        ? "list__data"
                        : type === "account-view"
                        ? "account-earning-view"
                        : undefined
                }
            >
                <li>
                    <h3> Earnings history </h3>
                </li>
                {/*<li className="nested">
                    <ul className="nested">{items.map(this.renderItem)}</ul>
                </li>*/}
                <li
                    className="nested"
                    style={{ flex: "1 1 auto", display: "flex" }}
                >
                    <ul
                        className={
                            type === "account-view"
                                ? "nested account-earning-view"
                                : "nested"
                        }
                        style={{ flex: "1 1 auto" }}
                    >
                        <PaginationLoader
                            total={total}
                            items={items}
                            onRenderRow={this.renderItem}
                            type={earnings}
                            earningType={type}
                        />
                    </ul>
                </li>
            </ul>
        );
    }
}

export default EarningHistory;
