import React, { Component } from "react";
import { Tab } from "@material-ui/core";
import { formatMessage, PublishedComponent } from "@openimis/fe-core";
import { RIGHT_POLICYHOLDERCONTRACT_UPDATE, RIGHT_POLICYHOLDERCONTRACT_APPROVE, CONTRACTCONTRIBUTIONDETAILS_TAB_VALUE } from "../constants"
import ContractContributionDetailsSearcher from "./ContractContributionDetailsSearcher";

class ContractContributionDetailsTabLabel extends Component {
    render() {
        const { intl, rights, onChange, disabled, tabStyle, isSelected, isUpdatable, isApprovable } = this.props;
        return (
            (rights.includes(RIGHT_POLICYHOLDERCONTRACT_UPDATE) || rights.includes(RIGHT_POLICYHOLDERCONTRACT_APPROVE)) &&
            !isUpdatable &&
            !isApprovable &&
            !disabled && (
                <Tab
                    onChange={onChange}
                    className={tabStyle(CONTRACTCONTRIBUTIONDETAILS_TAB_VALUE)}
                    selected={isSelected(CONTRACTCONTRIBUTIONDETAILS_TAB_VALUE)}
                    value={CONTRACTCONTRIBUTIONDETAILS_TAB_VALUE}
                    label={formatMessage(intl, "contract", "contractContributionDetails.label")}
                    wrapped
                />
            )
        );
    }
}

class ContractContributionDetailsTabPanel extends Component {
    render() {
        const { rights, value, isTabsEnabled, contract, isUpdatable, isApprovable } = this.props;
        return (
            (rights.includes(RIGHT_POLICYHOLDERCONTRACT_UPDATE) || rights.includes(RIGHT_POLICYHOLDERCONTRACT_APPROVE)) &&
            !isUpdatable &&
            !isApprovable && (
                <PublishedComponent
                    pubRef="policyHolder.TabPanel"
                    module="contract"
                    index={CONTRACTCONTRIBUTIONDETAILS_TAB_VALUE}
                    value={value}
                >
                    {isTabsEnabled && (
                        <ContractContributionDetailsSearcher
                            contract={contract}
                            rights={rights}
                        />
                    )}
                </PublishedComponent>
            )
        );
    }
}

export {
    ContractContributionDetailsTabLabel,
    ContractContributionDetailsTabPanel
}