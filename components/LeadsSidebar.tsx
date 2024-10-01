import React, { LegacyRef } from "react";
import Badge from "./Badge";

interface SidebarItemProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  type?: "default" | "internal";
  viewSelected?: viewsType;
  setViewSelected?: (view: viewsType) => void; //eslint-disable-line no-unused-vars
  isDragging: boolean;
  itemValue: string;
  getViewCounts: () => { [key: string]: number };
  setViewDraggingOverItem?: (view: viewsType | null) => void;
}

const SidebarItem = ({
  children,
  type = "default",
  viewSelected = "New",
  setViewSelected,
  isDragging = false,
  itemValue,
  getViewCounts,
  setViewDraggingOverItem,
}: SidebarItemProps): React.ReactNode => {
  const handleMouseLeave = () => {
    if (isDragging && setViewDraggingOverItem) {
      setViewDraggingOverItem(null);
    }
  };

  const handleMouseEnter = () => {
    if (isDragging && setViewDraggingOverItem) {
      setViewDraggingOverItem(itemValue as viewsType);
    }
  };

  const handleOnClick = () => {
    if (setViewSelected) {
      setViewSelected(itemValue as viewsType);
    }
  };

  return (
    <div
      key={itemValue}
      className={`flex cursor-pointer items-center justify-between py-1.5 text-sm font-medium leading-[21px] text-gray-700 z-20
        ${type === "default" ? "gap-2 px-3" : "gap-3 ml-3 pl-3 pr-3"}
        ${isDragging && "border-dotted border-2 border-gray-400"}
        ${viewSelected === itemValue && "rounded !bg-gray-300 !border-none"}
        hover:border-solid hover:border-gray-400 hover:bg-gray-100 rounded`}
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="presentation"
    >
      {children}

      <Badge>{getViewCounts()[itemValue]}</Badge>
    </div>
  );
};

export type viewsType =
  | "New"
  | "Engaged"
  | "Contacted"
  | "Appt Scheduled"
  | "No Show"
  | "TX Planned"
  | "Closed"
  | "Nurture"
  | "Lost";

interface LeadsSidebarProps {
  viewSelected: viewsType;
  setViewSelected: (view: viewsType) => void; //eslint-disable-line no-unused-vars
  isDragging: boolean; //eslint-disable-line no-unused-vars
  getViewCounts: () => { [key: string]: number };
  setViewDraggingOverItem: (view: viewsType | null) => void;
}

export const LeadsSidebar = ({
  viewSelected,
  setViewSelected,
  isDragging = false,
  getViewCounts,
  setViewDraggingOverItem,
}: LeadsSidebarProps): React.ReactNode => {
  return (
    <div className="flex min-h-screen min-w-[210px] max-w-[210px] flex-col gap-3 border-r border-gray-200 bg-gray-50 px-3 pb-6 pt-12">
      <div className="px-3 py-1.5 text-sm font-medium leading-[21px] text-gray-400">
        Views
      </div>
      <SidebarItem
        isDragging={isDragging}
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="New"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        New
      </SidebarItem>
      <SidebarItem
        isDragging={isDragging}
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="Engaged"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        Engaged
      </SidebarItem>
      <SidebarItem
        isDragging={isDragging}
        type="internal"
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="Contacted"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        Contacted
      </SidebarItem>
      <SidebarItem
        isDragging={isDragging}
        type="internal"
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="Appt Scheduled"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        Appt Scheduled
      </SidebarItem>
      <SidebarItem
        isDragging={isDragging}
        type="internal"
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="No Show"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        No Show
      </SidebarItem>
      <SidebarItem
        isDragging={isDragging}
        type="internal"
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="TX Planned"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        TX Planned
      </SidebarItem>
      <div className={`m-0 h-[1px] w-full bg-slate-200`} />
      <SidebarItem
        isDragging={isDragging}
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="Closed"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        Closed
      </SidebarItem>
      <SidebarItem
        isDragging={isDragging}
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="Nurture"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        Nurture
      </SidebarItem>
      <SidebarItem
        isDragging={isDragging}
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        itemValue="Lost"
        getViewCounts={getViewCounts}
        setViewDraggingOverItem={setViewDraggingOverItem}
      >
        Lost
      </SidebarItem>
    </div>
  );
};
