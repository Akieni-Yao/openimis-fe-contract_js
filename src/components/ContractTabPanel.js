import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { withModulesManager, FormPanel, Contributions } from "@openimis/fe-core";
import { injectIntl } from "react-intl";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
    RIGHT_POLICYHOLDERCONTRACT_UPDATE,
    RIGHT_POLICYHOLDERCONTRACT_APPROVE,
    CONTRACTDETAILS_TAB_VALUE,
    RIGHT_PORTALPOLICYHOLDERCONTRACT_UPDATE,
    RIGHT_PORTALPOLICYHOLDERCONTRACT_SUBMIT,
    RIGHT_PORTALPOLICYHOLDERCONTRACT_AMEND
} from "../constants";

const styles = theme => ({
    paper: theme.paper.paper,
    tableTitle: theme.table.title,
    tabs: {
        padding: 0
    },
    selectedTab: {
        borderBottom: "4px solid white"
    },
    unselectedTab: {
        borderBottom: "4px solid transparent"
    }
});

const CONTRACT_TABS_PANEL_CONTRIBUTION_KEY = "contract.TabPanel.panel";
const CONTRACT_TABS_LABEL_CONTRIBUTION_KEY = "contract.TabPanel.label";

class ContractTabPanel extends FormPanel {
    state = {
        value: [
            RIGHT_POLICYHOLDERCONTRACT_UPDATE,
            RIGHT_POLICYHOLDERCONTRACT_APPROVE,
            RIGHT_PORTALPOLICYHOLDERCONTRACT_UPDATE,
            RIGHT_PORTALPOLICYHOLDERCONTRACT_SUBMIT,
            RIGHT_PORTALPOLICYHOLDERCONTRACT_AMEND
        ].some(right => this.props.rights.includes(right))
            ? CONTRACTDETAILS_TAB_VALUE
            : undefined
    }

    isSelected = value => value === this.state.value;

    tabStyle = value => this.isSelected(value) ? this.props.classes.selectedTab : this.props.classes.unselectedTab;

    handleChange = (_, value) => this.setState({ value });

    render() {
        const { intl, rights, classes, edited, mandatoryFieldsEmpty, setConfirmedAction, isUpdatable, isApprovable } = this.props;
        const { value } = this.state;
        const isTabsEnabled = !!edited && !!edited.id && !mandatoryFieldsEmpty;
        return (
            <Paper className={classes.paper}>
                <Grid container className={`${classes.tableTitle} ${classes.tabs}`}>
                    <Contributions
                        contributionKey={CONTRACT_TABS_LABEL_CONTRIBUTION_KEY}
                        intl={intl}
                        rights={rights}
                        value={value}
                        onChange={this.handleChange}
                        isSelected={this.isSelected}
                        tabStyle={this.tabStyle}
                        disabled={!isTabsEnabled}
                        isUpdatable={isUpdatable}
                        isApprovable={isApprovable}
                    />
                </Grid>
                <Contributions
                    contributionKey={CONTRACT_TABS_PANEL_CONTRIBUTION_KEY}
                    rights={rights}
                    value={value}
                    isTabsEnabled={isTabsEnabled}
                    contract={edited}
                    setConfirmedAction={setConfirmedAction}
                    isUpdatable={isUpdatable}
                    isApprovable={isApprovable}
                />
            </Paper>
        )
    }
}

export default withModulesManager(injectIntl(withTheme(withStyles(styles)(ContractTabPanel))));
