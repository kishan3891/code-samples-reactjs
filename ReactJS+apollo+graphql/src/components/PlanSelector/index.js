import React from "react";

class PlanSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectPlan: this.props.selectedPlan,
            planItems: this.props.planItems,
        };
    }

    handlePlanChange = (planType) => {
        this.setState({
            selectPlan: planType,
        });
        this.props.onChangePlan(planType);
    };

    render() {
        const { planItems } = this.state;
        let planDetails = "";
        if (planItems.length) {
            planDetails = planItems.map((plan) => {
                return (
                    <div className="col-sm-12 col-md-6" key={`plan-${plan.id}`}>
                        <div
                            className={
                                `payment-top-left ${this.props.extraClass} ` +
                                (this.state.selectPlan === plan.id
                                    ? "active-plan"
                                    : "")
                            }
                            onClick={(e) => this.handlePlanChange(plan.id)}
                        >
                            <ul>
                                <li key={plan.id}>
                                    <span>{plan.name}</span>
                                    <font>
                                        {`${plan.sessions_count} scheduled
                                        session per ${plan.frequency}`}
                                    </font>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            });
        }
        return <div className="row">{planDetails}</div>;
    }
}

export default PlanSelector;
