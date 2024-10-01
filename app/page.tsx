"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { LeadsSidebar, viewsType } from "@/components/LeadsSidebar";
import { arrayMove, arrayRemove, List } from "react-movable";
import Image from "next/image";
import avatarExample from "@/public/images/avatar.svg";
import movableIcon from "@/public/images/movable.svg";

interface HeaderProps {
  name: string;
}

export const crawlingOverItemInitial: { [key: string]: boolean } = {
  New: false,
  Engaged: false,
  Contacted: false,
  "Appt Scheduled": false,
  "No Show": false,
  "TX Planned": false,
  Closed: false,
  Nurture: false,
  Lost: false,
};

interface LeadProps {
  id: number;
  name: string;
  age: number;
}

const headers: HeaderProps[] = [
  { name: "ID" },
  { name: "LEAD NAME" },
  { name: "AGE" },
];

export default function Home() {
  const [news, setNews] = useState<LeadProps[]>([
    { id: 1, name: "Cangrejo Cabrera", age: 28 },
    { id: 2, name: "Leo Fernandez", age: 28 },
    { id: 3, name: "Luisa Fernandez", age: 28 },
  ]);
  const [engageds, setEngageds] = useState<LeadProps[]>([
    { id: 1, name: "Cangrejo", age: 28 },
    { id: 2, name: "Fernandez", age: 28 },
    { id: 3, name: "Luisa sad", age: 28 },
  ]);
  const [contacteds, setContacteds] = useState<LeadProps[]>([
    { id: 1, name: "Cangrejsda", age: 28 },
    { id: 2, name: "Leo gds", age: 28 },
    { id: 3, name: "Luisa asd", age: 28 },
  ]);
  const [apptScheduleds, setApptScheduleds] = useState<LeadProps[]>([
    { id: 1, name: "aaa Cabrera", age: 28 },
    { id: 2, name: "bbb Fernandez", age: 28 },
    { id: 3, name: "cc Fernandez", age: 28 },
  ]);
  const [noShows, setNoShows] = useState<LeadProps[]>([
    { id: 1, name: "ttt Cabrera", age: 28 },
    { id: 2, name: "uu Fernandez", age: 28 },
    { id: 3, name: "Lubbisa Fernandez", age: 28 },
  ]);
  const [txPlanneds, setTxPlanneds] = useState<LeadProps[]>([
    { id: 1, name: "mm Cabrera", age: 28 },
    { id: 2, name: "errt Fernandez", age: 28 },
    { id: 3, name: "ghfhg Fernandez", age: 28 },
  ]);
  const [closeds, setCloseds] = useState<LeadProps[]>([
    { id: 1, name: "Cangrejfghdfe", age: 28 },
    { id: 2, name: "Ledfg", age: 28 },
    { id: 3, name: "Luisa df", age: 28 },
  ]);
  const [nurtures, setNurtures] = useState<LeadProps[]>([
    { id: 1, name: "Cangrejofdgb", age: 28 },
    { id: 2, name: "Leocvx", age: 28 },
    { id: 3, name: "Luisa cxve44", age: 28 },
  ]);
  const [losts, setLosts] = useState<LeadProps[]>([
    { id: 1, name: "Cangrejne", age: 28 },
    { id: 2, name: "Leo4", age: 28 },
    { id: 3, name: "Darias", age: 28 },
  ]);

  const [viewSelected, setViewSelected] = useState<viewsType>("New");
  const [isOnDrag, setIsOnDrag] = useState<boolean>(false);
  const [viewDragging, setViewDragging] = useState<viewsType | null>(null);
  const [leadIdDragging, setLeadIdDragging] = useState<number | null>(null);

  const getItemsAndSetter = (
    viewSelected: string
  ): {
    items: LeadProps[];
    setter: Dispatch<SetStateAction<LeadProps[]>>;
  } | null => {
    switch (viewSelected) {
      case "New":
        return { items: news, setter: setNews };
      case "Engaged":
        return { items: engageds, setter: setEngageds };
      case "Contacted":
        return { items: contacteds, setter: setContacteds };
      case "Appt Scheduled":
        return { items: apptScheduleds, setter: setApptScheduleds };
      case "No Show":
        return { items: noShows, setter: setNoShows };
      case "TX Planned":
        return { items: txPlanneds, setter: setTxPlanneds };
      case "Closed":
        return { items: closeds, setter: setCloseds };
      case "Nurture":
        return { items: nurtures, setter: setNurtures };
      case "Lost":
        return { items: losts, setter: setLosts };
      default:
        return null;
    }
  };

  const getStateToMove = (viewDragging: string): string | null => {
    let stateToMove: string | null = null;
    console.log("viewDragging", viewDragging);
    switch (viewDragging) {
      case "New":
        stateToMove = "New";
        break;
      case "Engaged":
        stateToMove = "Engaged";
        break;
      case "Contacted":
        stateToMove = "Contacted";
        break;
      case "Appt Scheduled":
        stateToMove = "Appt Scheduled";
        break;
      case "No Show":
        stateToMove = "No Show";
        break;
      case "TX Planned":
        stateToMove = "TX Planned";
        break;
      case "Closed":
        stateToMove = "Closed";
        break;
      case "Nurture":
        stateToMove = "Nurture";
        break;
      case "Lost":
        stateToMove = "Lost";
        break;
      default:
        stateToMove = null;
    }
    return stateToMove;
  };

  const getViewCounts = (): { [key: string]: number } => {
    return {
      New: news.length,
      Engaged: engageds.length,
      Contacted: contacteds.length,
      "Appt Scheduled": apptScheduleds.length,
      "No Show": noShows.length,
      "TX Planned": txPlanneds.length,
      Closed: closeds.length,
      Nurture: nurtures.length,
      Lost: losts.length,
    };
  };

  const handleOnDragEnd = (viewDragging: string) => {
    if (!viewDragging || !viewSelected || !leadIdDragging) return;
    const stateToMove = getStateToMove(viewDragging as string);
    const itemsAndSetter = getItemsAndSetter(viewSelected);
    const itemsAndSetterToMove = getItemsAndSetter(stateToMove as string);

    console.log("stateToMove", stateToMove);
    console.log("viewSelected", viewSelected);
    console.log("itemsAndSetter", itemsAndSetter);
    console.log("itemsAndSetterToMove", itemsAndSetterToMove);
    if (
      !stateToMove ||
      viewSelected === stateToMove ||
      !itemsAndSetter ||
      !itemsAndSetterToMove
    )
      return;
    const { items, setter } = itemsAndSetter;
    const { items: itemsToMove, setter: setterToMove } = itemsAndSetterToMove;
    const itemOldIndex = items.findIndex((item) => item.id === leadIdDragging);
    setterToMove([...itemsToMove, items[itemOldIndex]]);
    const otherItems = arrayRemove(items, itemOldIndex);
    setter(otherItems);
    setViewDragging(null);
  };

  const handleMouseDown = (value?: number) => {
    if (!value) return;
    setLeadIdDragging(value);
    setIsOnDrag(true);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (isOnDrag) {
        handleOnDragEnd(viewDragging as string);
        setIsOnDrag(false);
      }
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isOnDrag, viewDragging]);

  const listValues: LeadProps[] = useMemo(() => {
    return getItemsAndSetter(viewSelected)?.items || [];
  }, [
    viewSelected,
    news,
    engageds,
    contacteds,
    apptScheduleds,
    noShows,
    txPlanneds,
    closeds,
    nurtures,
    losts,
  ]);

  return (
    <main className="min-w-full flex flex-col items-start justify-start bg-gray-50 gap-12">
      <div className="w-full flex items-start gap-4 pr-4">
        <LeadsSidebar
          viewSelected={viewSelected}
          setViewSelected={setViewSelected}
          isDragging={isOnDrag}
          getViewCounts={getViewCounts}
          setViewDraggingOverItem={setViewDragging}
        />
        <div className="flex flex-col w-full items-center justify-center gap-4">
          <div className="w-full rounded bg-white shadow shadow-table-shadow mt-4">
            <List
              onChange={({ oldIndex, newIndex }) => {}}
              values={listValues}
              renderList={({ children, props }) => (
                <table
                  className={`w-full min-w-full table-auto divide-y divide-[#F3F4F6] bg-[#0611110a]`}
                >
                  <thead className="w-full">
                    <tr>
                      {headers?.map((header, index) => (
                        <th
                          className={
                            "not-first:px-3 rounded-lg py-2 text-left text-xs font-semibold text-[#06061173] first:pl-4 first:pr-3 first:sm:pl-6"
                          }
                          key={`${header.name}_${index}`}
                        >
                          {header.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody
                    className="w-full divide-y divide-gray-200 bg-white p-[1px]"
                    {...props}
                  >
                    {children}
                  </tbody>
                </table>
              )}
              renderItem={({ value, props, index }) => {
                if (!value) return null;
                const { key, ...rest } = props;
                return (
                  <tr
                    {...rest}
                    key={`${index}_${value}`}
                    className="text-gray-500"
                  >
                    <td
                      className="whitespace-nowrap rounded-md py-4 pl-2 pr-4 text-xs"
                      onMouseDown={() => handleMouseDown(value?.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={movableIcon}
                          alt={`movable-icon-${value?.name}`}
                          width={16}
                          height={16}
                          className="cursor-pointer"
                        />
                        {value?.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap rounded-md py-4 pl-2 pr-4 text-xs">
                      {value?.id}
                    </td>
                    <td className="whitespace-nowrap rounded-md py-4 pl-2 pr-4 text-xs">
                      <Image
                        src={avatarExample}
                        alt={`owner-icon-${value?.name}`}
                        width={16}
                        height={16}
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              }}
            />
          </div>
          <div className="flex w-full items-center flex-col mt-12">
            {
              <span className="text-lg text-gray-800">
                {viewDragging
                  ? `Dragging over ${viewDragging}`
                  : "Not dragging"}
              </span>
            }
          </div>
        </div>
      </div>
    </main>
  );
}
