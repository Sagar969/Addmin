import { Tabs } from "antd";

export default function TabsWithStickyBar(props) {
  return (
    <div className="flex-1 flex flex-col scrollbar">
      <Tabs
        {...props}
        renderTabBar={(tabProps, DefaultTabBar) => (
          <div className="tabsWithStickyBar sticky top-0 backdrop-blur z-[1] bg-gradient-to-b from-[hsl(var(--background))] to-transparent">
            <DefaultTabBar
              {...tabProps}
              style={{
                marginBottom: 0,
              }}
            />
          </div>
        )}
      />
    </div>
  );
}
