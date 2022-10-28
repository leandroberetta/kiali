import { ChartDonutUtilization } from '@patternfly/react-charts';
import * as React from 'react';

type Props = {
    migratedNamespaces: string[]
    pendingNamespaces: string[]
};

class CanaryUpgradeProgress extends React.Component<Props> {
    render() {
        const total = this.props.migratedNamespaces.length + this.props.pendingNamespaces.length;
        const migrated = this.props.migratedNamespaces.length;

        return (
            <div style={{ textAlign: 'left' }}>
                {this.props.pendingNamespaces &&
                    <div>
                        <div style={{ display: 'inline-block', width: '125px', whiteSpace: 'nowrap' }}>Upgrade Status</div>
                        <div style={{ height: 130, width: 200, textAlign: 'right' }}>
                            <ChartDonutUtilization
                                ariaDesc="Canary upgrade status"
                                ariaTitle="Canary upgrade status"
                                constrainToVisibleArea
                                data={{ x: 'Migrated namespaces', y: migrated * 100 / total }}
                                labels={({ datum }) => datum.x ? `${datum.x}: ${datum.y}%` : null}
                                legendData={[{ name: `Migrated namespaces: ${(migrated * 100 / total).toFixed(2)}%` }, { name: 'Pending namespaces' }]}
                                legendOrientation="vertical"
                                name="chart2"
                                invert
                                padding={{
                                    bottom: 0,
                                    left: 0,
                                    right: 0, // Adjusted to accommodate legend
                                    top: 0
                                }}
                                title={`${(migrated * 100 / total).toFixed(2)}%`}
                                width={240}
                                height={120}
                            />
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default CanaryUpgradeProgress;
