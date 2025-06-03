import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Content from './Content';

const TabContainer: React.FC = () => {
	return (
		<div className="yui3-widget yui3-tabview">
			<div data-label="Tabs" className="noFouc tabHolder yui3-tabview-content" style={{ opacity: 1 }}>
				<Tabs>
					<TabList className="yui3-tabview-list" role="tablist">
						<Tab className="yui3-tab yui3-widget">
						</Tab>
						<Tab className="yui3-tab yui3-widget">
							<h3>Recently Added Titles</h3>
						</Tab>
					</TabList>

					<div className="tabContentHolder yui3-tabview-panel">
						<TabPanel>
							<div id="awdlAtlas" className="yui3-tab-panel"></div>
						</TabPanel>

						<TabPanel>
							<div id="recently-added-titles" className="yui3-tab-panel yui3-tab-panel-selected" role="tabpanel">
								<h3>Recently Added Titles</h3>
								<Content />
							</div>
						</TabPanel>
					</div>
				</Tabs>
			</div>
		</div>
	);
};

export default TabContainer;
