import { CellMeasurer as BaseCellMeasurer } from "react-virtualized";

//https://codedaily.io/tutorials/124/Create-a-Virtualized-List-with-Auto-Sizing-Cells-using-react-virtualized-and-CellMeasurer
export default class CellMeasurer extends BaseCellMeasurer {
    constructor(props) {
        super(props);
    }

    _getCellMeasurements() {
        const results = super._getCellMeasurements();

        results.height += this.props.extraHeight;
        return results;
    }
}
CellMeasurer.defaultProps = {
    extraHeight: 24,
};
