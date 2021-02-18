import React, { Component } from "react";
import {
    AutoSizer,
    CellMeasurerCache,
    InfiniteLoader,
    List,
    WindowScroller,
} from "react-virtualized";
import CellMeasurer from "./CellMeasurer";

import PropTypes from "prop-types";

export default class PaginationLoader extends Component {
    state = {
        items: [],
        total: 0,
        loadedRowsMap: [],
    };
    static getDerivedStateFromProps({ items, total }, state) {
        if (items && items.length > state.items.length) {
            return {
                ...state,
                total,
                items,
            };
        }
        return state;
    }
    constructor(props) {
        super(props);
        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            fixedHeight: props.cellFixedHeight,
            defaultHeight: props.defaultCellHeight,
        });
    }
    isRowLoaded = ({ index }) => {
        const { items } = this.state;
        return index < items.length;
    };
    loadMoreRows = ({ startIndex, stopIndex }) => {
        return this.props.onLoadMoreRows(startIndex, stopIndex);
    };

    renderAutoSize = ({ onRowsRendered, registerChild }) => {
        return (
            <>
                {this.props.type ? (
                    this.props.earningType === "account-view" ? (
                        <WindowScroller>
                            {({ height }) => (
                                <AutoSizer disableHeight>
                                    {({ width }) =>
                                        this.renderVirtualList({
                                            height,
                                            registerChild,
                                            onRowsRendered,
                                            width,
                                        })
                                    }
                                </AutoSizer>
                            )}
                        </WindowScroller>
                    ) : (
                        <AutoSizer>
                            {({ width, height }) =>
                                this.renderVirtualList({
                                    height,
                                    registerChild,
                                    onRowsRendered,
                                    width,
                                })
                            }
                        </AutoSizer>
                    )
                ) : (
                    <AutoSizer>
                        {({ width, height }) =>
                            this.renderVirtualList({
                                height,
                                registerChild,
                                onRowsRendered,
                                width,
                            })
                        }
                    </AutoSizer>
                )}
            </>
        );
    };

    renderRow = ({ index, parent, key, style }) => {
        const { items } = this.state;
        let renderedItem;
        if (index < items.length) {
            renderedItem = this.props.onRenderRow(
                items[index],
                { ...style },
                index
            );
        } else {
            renderedItem = this.props.onRenderEmptyRow(style, index);
        }

        return (
            <CellMeasurer
                key={key}
                extraHeight={this.props.cellMeasurerExtraHeight}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                {renderedItem}
            </CellMeasurer>
        );
    };
    renderVirtualList = ({ registerChild, height, onRowsRendered, width }) => {
        const { total } = this.state;
        const { type, earningType } = this.props;
        return (
            <List
                autoHeight={
                    type && earningType === "account-view" ? true : false
                }
                height={height}
                rowCount={total}
                ref={registerChild}
                rowHeight={this.cache.rowHeight}
                rowRenderer={this.renderRow}
                onRowsRendered={onRowsRendered}
                width={width}
            />
        );
    };
    render() {
        const { total } = this.state;
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={total}
            >
                {({ onRowsRendered, registerChild }) =>
                    this.renderAutoSize({
                        onRowsRendered,
                        registerChild,
                    })
                }
            </InfiniteLoader>
        );
    }
}
PaginationLoader.propTypes = {
    onRenderRow: PropTypes.func,
    onLoadMoreRows: PropTypes.func,
};
PaginationLoader.defaultProps = {
    defaultCellHeight: 50,
    cellMeasurerExtraHeight: 24,
    onRenderEmptyRow: (style, index) => (
        <div style={style} className="empty-div">
            <div
                style={{
                    width: "100%",
                    display: "inline-block",
                    height: "1em",
                    backgroundColor: "#DDD",
                }}
            />
        </div>
    ),
    onLoadMoreRows: () => Promise.resolve(),
};
