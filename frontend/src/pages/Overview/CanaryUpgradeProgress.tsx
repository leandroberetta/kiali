import { ChartDonutUtilization, ChartThemeColor } from '@patternfly/react-charts';
import * as React from 'react';

type Props = {
    migratedNamespaces: string[]
    pendingNamespaces: string[]
};

class CanaryUpgradeProgress extends React.Component<Props> {
    render() {
        const total = this.props.migratedNamespaces.length + this.props.pendingNamespaces.length;
        const migrated = (total > 0) ? this.props.migratedNamespaces.length * 100 / total : 0;

        return (
            <div style={{ textAlign: 'center' }}>
                <div>
                    <div style={{ display: 'inline-block', width: '125px', whiteSpace: 'nowrap' }}>Canary Upgrade Status</div>
                    <div style={{ height: 180}}>
                        <ChartDonutUtilization
                            ariaDesc="Canary upgrade status"
                            ariaTitle="Canary upgrade status"
                            constrainToVisibleArea
                            data={{ x: 'Migrated namespaces', y: migrated }}
                            labels={({ datum }) => datum.x ? `${datum.x}: ${datum.y.toFixed(2)}%` : null}
                            invert
                            title={`${migrated.toFixed(2)}%`}
                            height={170}
                            themeColor={ChartThemeColor.green}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CanaryUpgradeProgress;
